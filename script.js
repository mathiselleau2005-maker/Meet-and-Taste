/* =============================================
   MEET and TASTE — script.js — FINAL
============================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    highlightActiveDaisy();
  }, { passive: true });

  /* ── Burger mobile ── */
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  burger?.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => { burger.classList.remove('open'); mobileMenu.classList.remove('open'); })
  );

  /* ── Slideshow façade ── */
  const slides = document.querySelectorAll('.facade-img');
  const dots   = document.querySelectorAll('.dot');
  let current = 0, slideTimer;

  function goTo(i) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }
  function startSlider() { clearInterval(slideTimer); slideTimer = setInterval(() => goTo(current + 1), 4500); }

  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startSlider(); }));
  const ss = document.querySelector('.facade-slideshow');
  ss?.addEventListener('mouseenter', () => clearInterval(slideTimer));
  ss?.addEventListener('mouseleave', startSlider);
  if (slides.length > 1) startSlider();

  /* ── Marguerite active ── */
  const sectionMap = {
    accueil: 'ndaisy-accueil', valeurs: 'ndaisy-accueil',
    concept: 'ndaisy-concept', events: 'ndaisy-events',
    tarifs: 'ndaisy-tarifs', reservation: 'ndaisy-reserver',
    about: 'ndaisy-about', eco: 'ndaisy-eco',
  };
  function highlightActiveDaisy() {
    let active = '';
    document.querySelectorAll('section[id]').forEach(s => {
      if (window.scrollY >= s.offsetTop - 130) active = s.id;
    });
    document.querySelectorAll('.nav-daisy').forEach(d => d.classList.remove('active'));
    const id = sectionMap[active];
    if (id) document.getElementById(id)?.classList.add('active');
  }
  highlightActiveDaisy();

  /* ── Smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 10, behavior: 'smooth' });
    });
  });

  /* ── Scroll reveal ── */
  const targets = [
    ...document.querySelectorAll('.val-card'),
    ...document.querySelectorAll('.event-card'),
    document.querySelector('.concept-inner'),
    document.querySelector('.about-inner'),
    document.querySelector('.tarifs-card'),
    document.querySelector('.tarifs-header'),
    document.querySelector('.eco-logos'),
    document.querySelector('.resa-card'),
    document.querySelector('.footer-inner'),
  ].filter(Boolean);

  targets.forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.val-card').forEach((c, i)   => c.style.transitionDelay = `${i*0.1}s`);
  document.querySelectorAll('.event-card').forEach((c, i)  => c.style.transitionDelay = `${i*0.12}s`);

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.10 });
  targets.forEach(el => obs.observe(el));

  /* ── Animation sway marguerites ── */
  document.querySelectorAll('.nav-daisy-svg').forEach((svg, i) => {
    svg.style.animation = `sway ${2.3 + i*0.25}s ease-in-out infinite`;
    svg.style.animationDelay = `${i * 0.15}s`;
  });

  /* ── Parallax hero ── */
  const heroL = document.querySelector('.hero-left');
  const heroR = document.querySelector('.hero-right');
  window.addEventListener('scroll', () => {
    if (window.innerWidth < 900) return;
    const y = window.scrollY;
    if (heroL) heroL.style.transform = `translateY(${y*0.04}px)`;
    if (heroR) heroR.style.transform = `translateY(${y*0.02}px)`;
  }, { passive: true });

  /* ── Formulaire réservation ── */
  const btnResa = document.querySelector('.btn-resa');
  btnResa?.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.resa-form input, .resa-form select');
    let ok = true;
    inputs.forEach(inp => { inp.style.borderColor = ''; if (!inp.value.trim()) { inp.style.borderColor = '#ef4444'; ok = false; } });
    if (ok) {
      const orig = btnResa.textContent;
      btnResa.textContent = '✓ Réservation envoyée !';
      btnResa.style.cssText += 'background:#4ade80;color:#071F49;';
      setTimeout(() => { btnResa.textContent = orig; btnResa.style.background=''; btnResa.style.color=''; inputs.forEach(i=>i.value=''); }, 3500);
    } else {
      btnResa.style.animation = 'shake 0.4s ease';
      setTimeout(() => btnResa.style.animation = '', 400);
    }
  });

  /* ── Keyframe shake dynamique ── */
  const s = document.createElement('style');
  s.textContent = `@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}`;
  document.head.appendChild(s);
});
