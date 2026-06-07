/* ============================================================
   KRENGEL MARKETING — Interactivity
   Scroll reveals · counters · animated charts · FAQ · live growth calc
   ============================================================ */

(() => {
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Scroll-triggered reveals ---------- */
  // Add .reveal class to elements that should fade up on scroll
  const revealTargets = [
    '.hero-grid', '.hero-chart',
    '.stats-grid', '.stat',
    '.ed-grid',
    '.service',
    '.process-list', '.step',
    '.case-head', '.case-chart-wrap', '.case-results',
    '.tests-grid',
    '.faq-list',
    '.cta-grid',
    '.section-h'
  ];
  revealTargets.forEach(sel => $$(sel).forEach(el => el.classList.add('reveal')));

  // Animate sparklines / case chart paths on entry
  $$('.sparkline path, .hero-line, .hero-area, .case-after, .case-before, .case-area, .svc-line').forEach(el => {
    el.classList.add('draw-line');
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        if (entry.target.classList.contains('stat')) startCounter(entry.target);
        if (entry.target.classList.contains('case-results')) {
          $$('.counter', entry.target).forEach(c => animateCounter(c));
        }
        if (entry.target.classList.contains('step')) {
          // step line fill triggers via CSS .in
        }
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  $$('.reveal, .stat, .step, .case-results, .draw-line').forEach(el => io.observe(el));

  /* ---------- Counter animation ---------- */
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCounter(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const dur = reduceMotion ? 0 : 1600;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / dur);
      const v = target * easeOutCubic(t);
      el.textContent = prefix + v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
    }
    requestAnimationFrame(tick);
  }

  function startCounter(statEl) {
    const counter = $('.counter', statEl);
    if (counter) animateCounter(counter);
  }

  /* ---------- FAQ accordion ---------- */
  $$('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ---------- Smooth scroll for nav links ---------- */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const tgt = document.querySelector(id);
      if (!tgt) return;
      e.preventDefault();
      tgt.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  /* ---------- Subtle parallax on hero stamp ---------- */
  const stamp = $('.hero-stamp');
  if (stamp && !reduceMotion) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < 700) stamp.style.transform = `translateY(${y * 0.15}px)`;
    }, { passive: true });
  }

})();
