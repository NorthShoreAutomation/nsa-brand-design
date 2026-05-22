// Shared sidebar for NSA Design System
// Version label is rewritten by build.sh from the VERSION file at the repo root.
const NSA_DS_VERSION = 'v1.1.0';
document.addEventListener('DOMContentLoaded', () => {
  const side = document.querySelector('[data-ds-side]');
  if (!side) return;
  const current = side.getAttribute('data-current') || '';
  side.innerHTML = `
    <div class="ds-logo">
      <img src="../assets/nsa-logo-white.png" alt="NSA"/>
      <span class="tag">Design System · ${NSA_DS_VERSION}</span>
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
