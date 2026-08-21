(function () {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- NAV ----------
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

  // ---------- REVEAL ON SCROLL ----------
  var revealEls = document.querySelectorAll('.reveal');

  revealEls.forEach(function (el, i) {
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
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translate(0,0)';
      });
    });
  }

  // ---------- STAMP SVGs ----------
  var NS = 'http://www.w3.org/2000/svg';

  function circularStamp(id, text, color, rotation) {
    var el = document.getElementById(id);
    if (!el) return;
    var pathId = id + '-path';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');

    var g = document.createElementNS(NS, 'g');
    g.setAttribute('transform', 'rotate(' + rotation + ' 50 50)');

    var outer = document.createElementNS(NS, 'circle');
    outer.setAttribute('cx', '50'); outer.setAttribute('cy', '50'); outer.setAttribute('r', '46');
    outer.setAttribute('fill', 'none');
    outer.setAttribute('stroke', color);
    outer.setAttribute('stroke-width', '1.4');
    g.appendChild(outer);

    var inner = document.createElementNS(NS, 'circle');
    inner.setAttribute('cx', '50'); inner.setAttribute('cy', '50'); inner.setAttribute('r', '38');
    inner.setAttribute('fill', 'none');
    inner.setAttribute('stroke', color);
    inner.setAttribute('stroke-width', '0.6');
    g.appendChild(inner);

    var defs = document.createElementNS(NS, 'defs');
    var path = document.createElementNS(NS, 'path');
    path.setAttribute('id', pathId);
    path.setAttribute('d', 'M 50 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0');
    path.setAttribute('fill', 'none');
    defs.appendChild(path);
    g.appendChild(defs);

    var textEl = document.createElementNS(NS, 'text');
    textEl.setAttribute('font-family', 'JetBrains Mono, monospace');
    textEl.setAttribute('font-size', '10.5');
    textEl.setAttribute('font-weight', '600');
    textEl.setAttribute('letter-spacing', '1.6');
    textEl.setAttribute('fill', color);
    var textPath = document.createElementNS(NS, 'textPath');
    textPath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#' + pathId);
    textPath.setAttribute('href', '#' + pathId);
    textPath.setAttribute('startOffset', '0%');
    textPath.textContent = text;
    textEl.appendChild(textPath);
    g.appendChild(textEl);

    var star = document.createElementNS(NS, 'text');
    star.setAttribute('x', '50'); star.setAttribute('y', '56');
    star.setAttribute('text-anchor', 'middle');
    star.setAttribute('font-size', '13');
    star.setAttribute('fill', color);
    star.textContent = '\u2713';
    g.appendChild(star);

    svg.appendChild(g);
    el.appendChild(svg);
  }

  circularStamp('stamp1', 'DELIVERED \u2022 SJ-01 \u2022 ', '#4A7A5E', -8);
  circularStamp('stamp2', 'IN TRANSIT \u2022 SJ-02 \u2022 ', '#B8823D', 6);
  circularStamp('stamp3', 'DELIVERED \u2022 SJ-03 \u2022 ', '#4A7A5E', 10);
  circularStamp('stamp4', 'DELIVERED \u2022 SJ-04 \u2022 ', '#4A7A5E', -5);
})();
