const tabs = [...document.querySelectorAll('.profile-tabs [role="tab"]')];
const panels = [...document.querySelectorAll('.profile-panel')];

function showPanel(key, focus = false) {
  const selected = tabs.find(tab => tab.dataset.panel === key);
  if (!selected) return;
  tabs.forEach(tab => {
    const active = tab === selected;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  panels.forEach(panel => { panel.hidden = panel.id !== selected.getAttribute('aria-controls'); });
  if (focus) selected.focus();
}

function syncPanelWithHash() {
  const key = location.hash.slice(1);
  if (tabs.some(tab => tab.dataset.panel === key)) {
    showPanel(key);
    return;
  }
  const target = document.getElementById(key);
  const panel = target?.closest('.profile-panel');
  if (panel) {
    showPanel(panel.id.replace('panel-', ''));
    target.scrollIntoView({ block: 'start' });
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    showPanel(tab.dataset.panel);
    history.replaceState(null, '', '#' + tab.dataset.panel);
  });
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    tabs[next].click();
    tabs[next].focus();
  });
});
window.addEventListener('hashchange', syncPanelWithHash);
syncPanelWithHash();
