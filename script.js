(function () {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ---------- HERO SHAPES: scroll-linked fade/drift ----------
  var shapes = document.querySelectorAll('.shape');
  var hero = document.getElementById('hero');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    if (!reducedMotion && shapes.length) {
      var heroHeight = hero.offsetHeight;
      var progress = Math.min(Math.max(window.scrollY / (heroHeight * 0.35), 0), 1);
      shapes.forEach(function (shape, i) {
        var speed = 1 + (i % 3) * 0.5;
        var drift = progress * 130 * speed;
        var rotate = progress * 25 * (i % 2 === 0 ? 1 : -1);
        shape.style.transform = 'translateY(' + (-drift) + 'px) scale(' + (1 - progress * 0.55) + ') rotate(' + rotate + 'deg)';
        shape.style.opacity = 1 - progress;
      });
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- SCROLL REVEALS ----------
  var pops = document.querySelectorAll('.pop');
  if (reducedMotion) {
    pops.forEach(function (p) { p.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -12% 0px' });
    pops.forEach(function (p) { io.observe(p); });
  }

  // ---------- MAGNETIC BUTTONS ----------
  if (!reducedMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.magnetic').forEach(function (btn) {
      var strength = 10;
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + (x / r.width) * strength + 'px,' + (y / r.height) * strength + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = 'translate(0,0)'; });
    });
  }

  // ---------- PROJECT CAROUSELS ----------
  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var dots = carousel.querySelectorAll('.dots span');
    var curEl = carousel.querySelector('.count-chip .cur');
    var prevBtn = carousel.querySelector('.arrow-prev');
    var nextBtn = carousel.querySelector('.arrow-next');
    var count = dots.length;

    function updateActive() {
      var idx = Math.round(track.scrollLeft / track.clientWidth);
      idx = Math.max(0, Math.min(count - 1, idx));
      dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
      if (curEl) curEl.textContent = idx + 1;
    }

    track.addEventListener('scroll', function () {
      window.requestAnimationFrame(updateActive);
    }, { passive: true });

    dots.forEach(function (dot, i) {
      dot.style.cursor = 'pointer';
      dot.addEventListener('click', function () {
        track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
      });
    }

    updateActive();
  });
})();
