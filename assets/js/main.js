/* ============================================================
   GQ Analytics — Main JS v2
   ============================================================ */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar ── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile nav ── */
  const mobileNav   = document.querySelector('.mobile-nav');
  const hamburger   = document.querySelector('.nav-hamburger');
  const mobileClose = document.querySelector('.mobile-nav-close');
  hamburger?.addEventListener('click', () => { mobileNav.classList.add('open'); document.body.style.overflow = 'hidden'; });
  mobileClose?.addEventListener('click', closeMobileNav);
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));
  function closeMobileNav() { mobileNav.classList.remove('open'); document.body.style.overflow = ''; }

  /* ── Cinematic Slideshow ── */
  const slides   = Array.from(document.querySelectorAll('.slide'));
  const tabs     = Array.from(document.querySelectorAll('.slide-tab'));
  const DURATION = 8000;
  let current    = 0;
  let timer      = null;
  let isPaused   = false;

  function goToSlide(idx) {
    // Deactivate old
    slides[current]?.classList.remove('is-active');
    tabs[current]?.classList.remove('is-active');

    current = (idx + slides.length) % slides.length;

    // Activate new
    slides[current]?.classList.add('is-active');

    // Reset & re-trigger tab progress animation
    const newTab = tabs[current];
    if (newTab) {
      // Force reflow to restart CSS animation
      const prog = newTab.querySelector('.slide-tab-progress');
      if (prog) {
        prog.style.animation = 'none';
        prog.offsetHeight; // reflow
        prog.style.animation = '';
      }
      newTab.classList.add('is-active');
    }

    // Animate metric bars in data card
    animateHdcBars();
  }

  function next() { goToSlide(current + 1); }

  function startTimer() {
    clearInterval(timer);
    if (!isPaused) timer = setInterval(next, DURATION);
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      goToSlide(i);
      startTimer();
    });
    // Pause on hover
    tab.addEventListener('mouseenter', () => { isPaused = true; clearInterval(timer); });
    tab.addEventListener('mouseleave', () => { isPaused = false; startTimer(); });
  });

  // Init
  if (slides.length) {
    goToSlide(0);
    startTimer();
  }

  /* ── Hero data card bar animation ── */
  function animateHdcBars() {
    document.querySelectorAll('.hdc-fill').forEach(bar => {
      const target = bar.dataset.w || '0%';
      bar.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { bar.style.width = target; });
      });
    });
  }
  // Trigger once on load
  setTimeout(animateHdcBars, 600);

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.10 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ── Mockup bar animation on scroll ── */
  const mockupBars = document.querySelectorAll('.mbar');
  const barHeights = ['45%','65%','80%','55%','90%','70%','40%','85%','60%','75%'];
  mockupBars.forEach((bar, i) => {
    bar.style.height = '0%';
    bar.style.transition = `height 1.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`;
  });
  const mockupObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        mockupBars.forEach((bar, i) => {
          bar.style.height = barHeights[i] || '60%';
        });
        mockupObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  const mockupEl = document.querySelector('.about-mockup');
  if (mockupEl) mockupObserver.observe(mockupEl);

  /* ── Counter animation ── */
  function animateCount(el, to, suffix, duration = 1800) {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * to) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el     = e.target;
        const to     = parseInt(el.dataset.to, 10);
        const suffix = el.dataset.suffix || '';
        animateCount(el, to, suffix);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-to]').forEach(el => counterObserver.observe(el));

  /* ── Active nav link on scroll ── */
  const sections  = Array.from(document.querySelectorAll('section[id]'));
  const navAnchors = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 160) current = s.id; });
    navAnchors.forEach(a => {
      const isActive = a.getAttribute('href') === '#' + current;
      a.style.fontWeight = isActive ? '700' : '500';
    });
  }, { passive: true });

  /* ── Contact form — Netlify Forms ── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn      = form.querySelector('.form-submit');
      const alertEl  = document.getElementById('form-alert');
      const origHTML = btn.innerHTML;

      // Spinner style (injected once)
      if (!document.getElementById('spin-style')) {
        const s = document.createElement('style');
        s.id = 'spin-style';
        s.textContent = `.spin-ring{display:inline-block;width:16px;height:16px;border:2px solid rgba(255,255,255,0.35);border-top-color:#fff;border-radius:50%;animation:formSpin .7s linear infinite;margin-right:8px;vertical-align:middle;}@keyframes formSpin{to{transform:rotate(360deg)}}`;
        document.head.appendChild(s);
      }

      btn.disabled = true;
      btn.innerHTML = '<span class="spin-ring"></span> Sending…';
      alertEl.className = 'form-alert';
      alertEl.textContent = '';

      try {
        // Netlify Forms expects application/x-www-form-urlencoded
        const data = new URLSearchParams(new FormData(form)).toString();
        const res  = await fetch('/', {
          method:  'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body:    data,
        });

        if (res.ok) {
          alertEl.className   = 'form-alert success';
          alertEl.textContent = '✓ Message sent! Stella will be in touch within 24 hours.';
          form.reset();
        } else {
          throw new Error('Network response not ok');
        }
      } catch {
        alertEl.className   = 'form-alert error';
        alertEl.textContent = 'Unable to send right now. Please email gqconsulting.ke@gmail.com or call 0113 751 900.';
      }

      alertEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      btn.disabled  = false;
      btn.innerHTML = origHTML;
    });
  }

  /* ── Subtle parallax on hero headline ── */
  const heroHeadline = document.querySelector('.hero-headline');
  if (heroHeadline && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroHeadline.style.transform = `translateY(${y * 0.18}px)`;
      heroHeadline.style.opacity = Math.max(0, 1 - y / 500);
    }, { passive: true });
  }

});
