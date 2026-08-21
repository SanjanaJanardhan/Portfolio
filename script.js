(function () {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

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

  var revealEls = document.querySelectorAll('.reveal');

  revealEls.forEach(function (el) {
    var group = el.closest('.reveal-group');
    if (group) {
      var siblings = Array.prototype.slice.call(group.querySelectorAll('.reveal'));
      el.style.setProperty('--d', siblings.indexOf(el));
    }
  });

  if (reducedMotion) {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  if (!reducedMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.magnetic').forEach(function (btn) {
      var strength = 10;
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + (x / r.width) * strength + 'px,' + (y / r.height) * strength + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translate(0,0)';
      });
    });
  }
})();
