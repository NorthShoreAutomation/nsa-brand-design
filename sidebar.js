// Shared sidebar for NSA Design System.
// The release workflow substitutes __NSA_VERSION__ in the deployed copy
// (Pages artifact) — locally and on `main`, this stays as a placeholder
// so source diffs aren't churned by release commits.
const NSA_DS_VERSION = '__NSA_VERSION__';
const NSA_DS_VERSION_DISPLAY = NSA_DS_VERSION.startsWith('__') ? 'dev' : NSA_DS_VERSION;
document.addEventListener('DOMContentLoaded', () => {
  const side = document.querySelector('[data-ds-side]');
  if (!side) return;
  const current = side.getAttribute('data-current') || '';
  side.innerHTML = `
    <div class="ds-logo">
      <img src="../assets/nsa-logo-white.png" alt="NSA"/>
      <span class="tag">Design System · ${NSA_DS_VERSION_DISPLAY}</span>
    </div>
    <div class="ds-nav-section">Foundations</div>
    <nav class="ds-nav">
      <a data-k="index" href="index.html">Overview</a>
      <a data-k="brand" href="brand.html">Brand &amp; Logo</a>
      <a data-k="color" href="color.html">Color</a>
      <a data-k="typography" href="typography.html">Typography</a>
      <a data-k="space" href="space.html">Space &amp; Radius</a>
    </nav>
    <div class="ds-nav-section">Components</div>
    <nav class="ds-nav">
      <a data-k="components" href="components.html">UI Elements</a>
      <a data-k="patterns" href="patterns.html">Patterns</a>
    </nav>
    <div class="ds-nav-section">Products</div>
    <nav class="ds-nav">
      <a data-k="akomi" href="product-akomi.html">Akomi</a>
      <a data-k="tsunami" href="product-tsunami.html">Tsunami</a>
      <a data-k="watcher" href="product-watcher.html">The Watcher</a>
    </nav>`;
  const a = side.querySelector(`a[data-k="${current}"]`);
  if (a) a.classList.add('active');
});
