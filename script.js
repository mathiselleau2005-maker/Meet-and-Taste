/* =============================================
   MEET and TASTE — script.js
============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR scroll effect ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ── BURGER MENU (mobile) ──
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Fermer au clic sur un lien
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ── SLIDESHOW FAÇADE ──
  const slides = document.querySelectorAll('.facade-img');
  const dots   = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function startAutoSlide() {
    slideInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 4000);
  }

  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      goToSlide(i);
      startAutoSlide();
    });
  });

  if (slides.length > 1) startAutoSlide();

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll(
    '.val-card, .event-card, .concept-inner, .about-inner, .tarifs-card, .eco-logos, .footer-inner'
  );

  reveals.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach(el => observer.observe(el));

  // ── STAGGER pour les cards valeurs ──
  const valCards = document.querySelectorAll('.val-card');
  valCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  const eventCards = document.querySelectorAll('.event-card');
  eventCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.12}s`;
  });

  // ── SMOOTH ANCHOR avec offset navbar ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ── FORMULAIRE RÉSERVATION ──
  const btnResa = document.querySelector('.btn-resa');
  if (btnResa) {
    btnResa.addEventListener('click', () => {
      const inputs = document.querySelectorAll('.resa-form input, .resa-form select');
      let valid = true;

      inputs.forEach(input => {
        input.style.borderColor = '';
        if (!input.value.trim()) {
          input.style.borderColor = '#ef4444';
          valid = false;
        }
      });

      if (valid) {
        btnResa.textContent = '✓ Réservation envoyée !';
        btnResa.style.background = '#4ade80';
        btnResa.style.color = '#071F49';
        setTimeout(() => {
          btnResa.textContent = 'Réserver maintenant →';
          btnResa.style.background = '';
          btnResa.style.color = '';
          inputs.forEach(input => (input.value = ''));
        }, 3000);
      } else {
        btnResa.style.animation = 'shake 0.4s ease';
        setTimeout(() => (btnResa.style.animation = ''), 400);
      }
    });
  }

  // ── DAISY HOVER sur mobile (tap) ──
  const daisyItems = document.querySelectorAll('.daisy-item');
  daisyItems.forEach(item => {
    item.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      const popup = item.querySelector('.daisy-popup');
      const isVisible = popup.style.opacity === '1';

      // Fermer tous
      document.querySelectorAll('.daisy-popup').forEach(p => {
        p.style.opacity = '0';
        p.style.pointerEvents = 'none';
      });

      if (!isVisible) {
        popup.style.opacity = '1';
        popup.style.pointerEvents = 'auto';
      }
    }, { passive: true });
  });

  document.addEventListener('touchstart', () => {
    document.querySelectorAll('.daisy-popup').forEach(p => {
      p.style.opacity = '0';
      p.style.pointerEvents = 'none';
    });
  }, { passive: true });

  // ── CSS keyframe shake (injection dynamique) ──
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
  `;
  document.head.appendChild(style);

  // ── PARALLAX léger sur le hero ──
  const heroLeft = document.querySelector('.hero-left');
  const heroRight = document.querySelector('.hero-right');
  window.addEventListener('scroll', () => {
    if (window.innerWidth < 768) return;
    const y = window.scrollY;
    if (heroLeft) heroLeft.style.transform = `translateY(${y * 0.04}px)`;
    if (heroRight) heroRight.style.transform = `translateY(${y * 0.02}px)`;
  }, { passive: true });

});
