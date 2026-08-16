/**
 * hirnaymay.com — homepage behaviour.
 *
 * Deliberately dependency-free. Everything here is progressive enhancement:
 * the page is fully readable and navigable if this file never loads, because
 * the reveal styles are gated behind the .js class set in <head>.
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ---------------------------------------------------------------
     Scroll progress bar
  --------------------------------------------------------------- */
  var progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    var ticking = false;
    var updateProgress = function () {
      var max =
        document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progressBar.style.width = pct + "%";
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(updateProgress);
        }
      },
      { passive: true },
    );
    updateProgress();
  }

  /* ---------------------------------------------------------------
     Reveal on scroll

     If IntersectionObserver is unavailable, everything is activated
     immediately rather than left hidden.
  --------------------------------------------------------------- */
  // .reveal is the homepage convention; .reveal-item/.split-line remain on
  // photography.html, which also loads this file.
  var revealTargets = document.querySelectorAll(
    ".reveal, .reveal-item, .split-line",
  );

  var activateAll = function () {
    for (var i = 0; i < revealTargets.length; i++) {
      revealTargets[i].classList.add("active");
    }
  };

  if (reduceMotion || !("IntersectionObserver" in window)) {
    activateAll();
  } else {
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

    for (var j = 0; j < revealTargets.length; j++) {
      observer.observe(revealTargets[j]);
    }

    // Anything already on screen at load should not wait for a scroll event.
    window.requestAnimationFrame(function () {
      for (var k = 0; k < revealTargets.length; k++) {
        var rect = revealTargets[k].getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          revealTargets[k].classList.add("active");
        }
      }
    });
  }

  /* ---------------------------------------------------------------
     Footer year
  --------------------------------------------------------------- */
  var yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------------------------------------------------------------
     Local time (IST)

     The wrapper starts hidden so a failure here leaves no empty label.
  --------------------------------------------------------------- */
  var timeEl = document.getElementById("local-time");
  var timeBlock = document.querySelector("[data-local-time-block]");
  if (timeEl && timeBlock) {
    var renderTime = function () {
      try {
        timeEl.textContent = new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        timeBlock.classList.remove("hidden");
      } catch (err) {
        timeBlock.remove();
      }
    };
    renderTime();
    setInterval(renderTime, 30000);
  }

})();
