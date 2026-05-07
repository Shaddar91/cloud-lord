export const flushEmotionStyles = () => {
  if (typeof document === 'undefined') return;
  const styleEls = document.querySelectorAll('style[data-emotion]');
  styleEls.forEach((el) => {
    if (el.textContent && el.textContent.length > 0) return;
    const sheet = el.sheet;
    if (!sheet) return;
    try {
      const rules = sheet.cssRules || sheet.rules;
      if (!rules || rules.length === 0) return;
      const text = Array.from(rules).map((r) => r.cssText).join('');
      if (text) el.textContent = text;
    } catch (_e) { /* cross-origin or empty sheet */ }
  });
};
