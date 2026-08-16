/**
 * Writing pages — reveal animations and reading progress.
 *
 * Progressive enhancement only. Reveal styles are gated behind the .js class
 * set in <head>, so if this file never loads the page is simply visible.
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* Reading progress bar (article pages) */
  var bar = document.getElementById("reading-progress");
  if (bar) {
    var ticking = false;
    var update = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      },
      { passive: true },
    );
    update();
  }

  /* Reveals */
  var targets = document.querySelectorAll(".reveal-item, .split-line, .stagger");
  if (!targets.length) return;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    for (var i = 0; i < targets.length; i++) {
      targets[i].classList.add("active");
    }
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
  );

  for (var j = 0; j < targets.length; j++) {
    observer.observe(targets[j]);
  }

  window.requestAnimationFrame(function () {
    for (var k = 0; k < targets.length; k++) {
      if (targets[k].getBoundingClientRect().top < window.innerHeight) {
        targets[k].classList.add("active");
      }
    }
  });

  /* Footer year */
  var year = document.getElementById("footer-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
