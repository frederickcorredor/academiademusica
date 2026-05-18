 // ─── NAV scroll effect ───
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ─── Hamburger ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  hamburger.classList.toggle('active', isOpen);
});

function closeMenu() {
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.classList.remove('active');
}

    // ─── Scroll Reveal ───
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(el => revealObserver.observe(el));

    // ─── Form submit ───
    function handleSubmit() {
      const btn = document.querySelector('.form-submit');
      btn.textContent = '✓ Enviado — Te contactaremos pronto';
      btn.style.background = '#1a8c4e';
      btn.disabled = true;
    }

    // ─── Smooth scroll ───
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
          const el = document.querySelector(id);
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // ─── CAROUSEL ───
    (function () {
      const track = document.getElementById('carouselTrack');
      const slides = track.querySelectorAll('.maestro-slide');
      const dotsContainer = document.getElementById('carouselDots');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      const total = slides.length;
      let current = 0;
      let autoTimer = null;

      // Build dots
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Ir al maestro ' + (i + 1));
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      });

      function updateDots() {
        dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
          d.classList.toggle('active', i === current);
        });
      }

      function goTo(index) {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        updateDots();
      }

      prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
      nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

      // Auto-play every 5 seconds
      function startAuto() {
        autoTimer = setInterval(() => goTo(current + 1), 5000);
      }
      function resetAuto() {
        clearInterval(autoTimer);
        startAuto();
      }
      startAuto();

      // Touch/swipe support
      let startX = 0;
      const container = track.parentElement;
      container.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
      container.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          diff > 0 ? goTo(current + 1) : goTo(current - 1);
          resetAuto();
        }
      });

      // Pause on hover
      container.addEventListener('mouseenter', () => clearInterval(autoTimer));
      container.addEventListener('mouseleave', () => startAuto());
    })();