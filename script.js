
/* =============================================
   MEET and TASTE — script.js
============================================= */
document.addEventListener('DOMContentLoaded', () => {
 
  /* ── NAVBAR scroll ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    highlightActiveDaisy();
  }, { passive: true });
 
  /* ── BURGER mobile ── */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  burger?.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
 
  /* ── SLIDESHOW façade ── */
  const slides = document.querySelectorAll('.facade-img');
  const dots   = document.querySelectorAll('.dot');
  let current  = 0;
  let timer;
 
  function goTo(i) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }
 
  function startSlider() {
    timer = setInterval(() => goTo(current + 1), 4500);
  }
 
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goTo(i);
      startSlider();
    });
  });
 
  if (slides.length > 1) startSlider();
 
  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll(
    '.val-card, .event-card, .concept-inner, .about-inner, .tarifs-card, .eco-logos, .footer-inner'
  );
  revealEls.forEach(el => el.classList.add('reveal'));
 
  // Stagger val-cards
  document.querySelectorAll('.val-card').forEach((c, i) => { c.style.transitionDelay = `${i * 0.1}s`; });
  document.querySelectorAll('.event-card').forEach((c, i) => { c.style.transitionDelay = `${i * 0.12}s`; });
 
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
  }, { threshold: 0.12 });
 
  revealEls.forEach(el => revealObserver.observe(el));
 
  /* ── ACTIVE DAISY selon section visible ── */
  const sections = document.querySelectorAll('section[id], footer');
  const daisy = {
    'accueil':    document.getElementById('ndaisy-accueil'),
    'valeurs':    document.getElementById('ndaisy-accueil'),
    'concept':    document.getElementById('ndaisy-concept'),
    'events':     document.getElementById('ndaisy-events'),
    'tarifs':     document.getElementById('ndaisy-tarifs'),
    'reservation':document.getElementById('ndaisy-contact'),
    'about':      document.getElementById('ndaisy-about'),
    'eco':        document.getElementById('ndaisy-eco'),
  };
 
  function highlightActiveDaisy() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    document.querySelectorAll('.nav-daisy').forEach(d => d.classList.remove('active'));
    if (daisy[current]) daisy[current].classList.add('active');
  }
 
  highlightActiveDaisy();
 
  /* ── SMOOTH SCROLL avec offset navbar ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 8;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });
 
  /* ── FORMULAIRE RÉSERVATION ── */
  const btnResa = document.querySelector('.btn-resa');
  btnResa?.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.resa-form input, .resa-form select');
    let valid = true;
    inputs.forEach(inp => {
      inp.style.borderColor = '';
      if (!inp.value.trim()) { inp.style.borderColor = '#ef4444'; valid = false; }
    });
    if (valid) {
      btnResa.textContent = '✓ Réservation envoyée !';
      btnResa.style.background = '#4ade80';
      btnResa.style.color = '#071F49';
      setTimeout(() => {
        btnResa.textContent = 'Réserver maintenant →';
        btnResa.style.background = '';
        btnResa.style.color = '';
        inputs.forEach(inp => (inp.value = ''));
      }, 3000);
    } else {
      btnResa.style.animation = 'shake 0.4s ease';
      setTimeout(() => (btnResa.style.animation = ''), 400);
    }
  });
 
  /* ── PARALLAX léger hero ── */
  const heroLeft  = document.querySelector('.hero-left');
  const heroRight = document.querySelector('.hero-right');
  window.addEventListener('scroll', () => {
    if (window.innerWidth < 900) return;
    const y = window.scrollY;
    if (heroLeft)  heroLeft.style.transform  = `translateY(${y * 0.04}px)`;
    if (heroRight) heroRight.style.transform = `translateY(${y * 0.02}px)`;
  }, { passive: true });
 
  /* ── SWAY animation marguerites ── */
  document.querySelectorAll('.nav-daisy-svg').forEach((svg, i) => {
    svg.style.animation = `sway ${2.5 + i * 0.3}s ease-in-out infinite`;
    svg.style.animationDelay = `${i * 0.2}s`;
  });
 
});
