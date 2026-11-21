// Keep type and images stable when a window is resized on the same display.
(() => {
  let previousWidth;
  function updateDisplayScale() {
    const width = Number(window.screen?.availWidth) || Number(window.screen?.width) || 1512;
    if (width === previousWidth) return;
    previousWidth = width;
    const scale = 1 + Math.min(1, Math.max(0, (width - 1512) / (2560 - 1512))) * 0.32;
    document.documentElement.style.setProperty('--display-scale', String(scale));
  }
  updateDisplayScale();
  window.addEventListener('resize', updateDisplayScale, { passive: true });
  window.addEventListener('focus', updateDisplayScale);
  window.addEventListener('pageshow', updateDisplayScale);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) updateDisplayScale();
  });
})();
