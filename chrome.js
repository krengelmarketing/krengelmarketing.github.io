/* ============================================================
   KRENGEL MARKETING — shared chrome
   Single source of truth for the ticker, nav, and footer.
   Each page has empty mount points (#site-ticker / #site-nav /
   #site-footer); this script replaces them with the real markup,
   so the navigation only has to be maintained in one place.
   ============================================================ */
(function () {

  const TICKER = `
<div class="ticker" aria-hidden="true">
  <div class="ticker-track">
    <span class="t-item">King Painting LLC · <b>$18M+</b> tracked revenue in 12 months</span>
    <span class="t-dot">●</span>
    <span class="t-item">Review generation · <b>7 to 15%+</b> lift every 90 days</span>
    <span class="t-dot">●</span>
    <span class="t-item">Google Ads built for <b>real leads</b>, not vanity metrics</span>
    <span class="t-dot">●</span>
    <span class="t-item">Websites <b>designed to convert</b></span>
    <span class="t-dot">●</span>
    <span class="t-item">Free <b>strategy meeting</b> · custom plan &amp; quote</span>
    <span class="t-dot">●</span>
    <span class="t-item">Organic visibility · <b>+28 to 60%</b> over 12 months</span>
    <span class="t-dot">●</span>
    <span class="t-item"><b>Dallas, TX</b> · est. 2026</span>
    <span class="t-dot">●</span>
    <span class="t-item">King Painting LLC · <b>$18M+</b> tracked revenue in 12 months</span>
    <span class="t-dot">●</span>
    <span class="t-item">Review generation · <b>7 to 15%+</b> lift every 90 days</span>
    <span class="t-dot">●</span>
    <span class="t-item">Google Ads built for <b>real leads</b>, not vanity metrics</span>
    <span class="t-dot">●</span>
    <span class="t-item">Websites <b>designed to convert</b></span>
    <span class="t-dot">●</span>
    <span class="t-item">Free <b>strategy meeting</b> · custom plan &amp; quote</span>
    <span class="t-dot">●</span>
    <span class="t-item">Organic visibility · <b>+28 to 60%</b> over 12 months</span>
    <span class="t-dot">●</span>
    <span class="t-item"><b>Dallas, TX</b> · est. 2026</span>
    <span class="t-dot">●</span>
  </div>
</div>`;

  /* The Mark — bold, filled K. Drawn as a single closed path so it stays
     pixel-sharp in nav, footer, favicon, and social previews. */
  const LOGO = `
      <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M5 4 L13 4 L13 13 L22 4 L28 4 L18 16 L28 28 L22 28 L13 19 L13 28 L5 28 Z"/>
      </svg>`;

  const NAV = `
<header class="nav" id="nav">
  <a href="index.html" class="brand">
    <span class="brand-mark" aria-hidden="true">${LOGO}</span>
    <span class="brand-text">Krengel Marketing</span>
    <span class="brand-trade">®</span>
  </a>
  <nav class="nav-links" aria-label="Primary">
    <a href="proof.html" data-nav="proof">Proof</a>
    <a href="services.html" data-nav="services">Services</a>
    <a href="process.html" data-nav="process">Process</a>
    <a href="results.html" data-nav="results">Results</a>
    <a href="clients.html" data-nav="clients">Clients</a>
    <a href="faq.html" data-nav="faq">FAQ</a>
  </nav>
  <a href="contact.html" class="nav-cta">
    <span>Book a free meeting</span>
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </a>
</header>`;

  const FOOTER = `
<footer class="foot">
  <div class="foot-grid">
    <div class="foot-brand">
      <div class="brand brand-foot">
        <span class="brand-mark" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
            <path d="M5 4 L13 4 L13 13 L22 4 L28 4 L18 16 L28 28 L22 28 L13 19 L13 28 L5 28 Z"/>
          </svg>
        </span>
        <span class="brand-text">Krengel Marketing</span>
      </div>
      <p>A Dallas growth studio for local businesses. More reviews, smarter Google Ads, and websites built to convert, with honest, measurable results.</p>
      <ul class="foot-contact">
        <li><a href="tel:+12146837946">(214) 683 7946</a></li>
        <li><a href="mailto:krengelmarkets@gmail.com">krengelmarkets@gmail.com</a></li>
      </ul>
      <span class="mono foot-est">EST. 2026 · DALLAS, TX</span>
    </div>

    <div class="foot-col">
      <h4>Services</h4>
      <ul>
        <li><a href="services.html">Reviews</a></li>
        <li><a href="services.html">Google Ads</a></li>
        <li><a href="services.html">Websites</a></li>
        <li><a href="contact.html">Free Meeting</a></li>
      </ul>
    </div>
    <div class="foot-col">
      <h4>Studio</h4>
      <ul>
        <li><a href="process.html">Process</a></li>
        <li><a href="results.html">Results</a></li>
        <li><a href="faq.html">FAQ</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div class="foot-col">
      <h4>Elsewhere</h4>
      <ul>
        <li><a href="#">Instagram ↗</a></li>
        <li><a href="#">LinkedIn ↗</a></li>
        <li><a href="#">Facebook ↗</a></li>
        <li><a href="mailto:krengelmarkets@gmail.com">Email us ↗</a></li>
      </ul>
    </div>
  </div>

  <div class="foot-mega" aria-hidden="true">
    <span>Krengel</span>
    <span class="foot-mega-sub">Marketing</span>
  </div>

  <div class="foot-bottom">
    <span>© 2026 Krengel Marketing LLC · Dallas, TX. All rights reserved.</span>
  </div>
</footer>`;

  function replaceMount(id, html) {
    const el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }

  replaceMount('site-ticker', TICKER);
  replaceMount('site-nav', NAV);
  replaceMount('site-footer', FOOTER);

  /* Highlight the nav link for the current page */
  const page = (document.body.getAttribute('data-page') || '').toLowerCase();
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(a => {
    if (a.getAttribute('data-nav') === page) a.classList.add('active');
  });

  /* On mobile, scroll the active link into view within the strip */
  if (window.matchMedia('(max-width: 980px)').matches) {
    const active = document.querySelector('.nav-links a.active');
    if (active) {
      try { active.scrollIntoView({ inline: 'center', block: 'nearest' }); } catch (e) {}
    }
  }
})();
