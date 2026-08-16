/**
 * Custom cursor — the dot-and-ring from the pre-August site, restored.
 *
 * Self-contained on purpose. It builds its own elements and injects its own
 * styles, for two reasons:
 *
 *   1. The article and project pages carry their own CSS and never load
 *      css/styles.css, so a stylesheet rule would only reach three of the ten
 *      pages.
 *   2. `cursor: none` is only ever applied once the replacement is running.
 *      The original set it in CSS, which meant a failed script left the page
 *      with no pointer at all. Here, nothing is hidden until there is
 *      something to hide it behind.
 *
 * Skipped entirely on coarse pointers (phones, TVs) and when the visitor has
 * asked for reduced motion — a ring that lags the pointer is exactly the kind
 * of movement that setting is for.
 */
(function () {
  "use strict";

  if (!window.matchMedia) return;
  if (!window.matchMedia("(pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var CSS =
    "html.cursor-live, html.cursor-live * { cursor: none; }" +
    ".cursor-dot, .cursor-ring {" +
    "  position: fixed; top: 0; left: 0; pointer-events: none;" +
    "  border-radius: 50%; opacity: 0;" +
    "  transition: opacity .25s ease; will-change: transform;" +
    "}" +
    ".cursor-dot { width: 6px; height: 6px; background: #fff; z-index: 9999; }" +
    ".cursor-ring {" +
    "  width: 40px; height: 40px; z-index: 9998;" +
    "  border: 1px solid rgba(255,255,255,.3);" +
    "  transition: width .3s ease, height .3s ease, background-color .3s ease," +
    "              border-color .3s ease, opacity .25s ease;" +
    "}" +
    ".cursor-ring.is-over {" +
    "  width: 80px; height: 80px;" +
    "  background-color: rgba(255,255,255,.05); border-color: transparent;" +
    "  backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px);" +
    "}";

  var style = document.createElement("style");
  style.appendChild(document.createTextNode(CSS));
  document.head.appendChild(style);

  var make = function (cls) {
    var el = document.createElement("div");
    el.className = cls;
    el.setAttribute("aria-hidden", "true");
    document.body.appendChild(el);
    return el;
  };

  var dot = make("cursor-dot");
  var ring = make("cursor-ring");
  document.documentElement.classList.add("cursor-live");

  var mx = 0, my = 0, rx = 0, ry = 0, placed = false;

  // translate3d keeps this on the compositor. The original animated `left`
  // and `top`, which lays out the page on every frame the mouse moves.
  var put = function (el, x, y) {
    el.style.transform =
      "translate3d(" + x + "px," + y + "px,0) translate(-50%,-50%)";
  };

  document.addEventListener(
    "mousemove",
    function (e) {
      mx = e.clientX;
      my = e.clientY;
      if (!placed) {
        // Start the ring where the pointer already is, so it doesn't sail in
        // from the top-left corner on the first move.
        placed = true;
        rx = mx;
        ry = my;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      put(dot, mx, my);
    },
    { passive: true },
  );

  (function frame() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    put(ring, rx, ry);
    window.requestAnimationFrame(frame);
  })();

  // Delegated, so anything scripted into the page later still gets the effect.
  var INTERACTIVE = "a, button, [role='button'], input, textarea, select, summary";
  document.addEventListener("mouseover", function (e) {
    if (e.target.closest && e.target.closest(INTERACTIVE)) {
      ring.classList.add("is-over");
    }
  });
  document.addEventListener("mouseout", function (e) {
    if (e.target.closest && e.target.closest(INTERACTIVE)) {
      ring.classList.remove("is-over");
    }
  });

  // Fade out when the pointer leaves the window, so neither element is left
  // stranded at the edge of the viewport.
  document.addEventListener("mouseleave", function () {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });
  document.addEventListener("mouseenter", function () {
    if (placed) {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    }
  });
})();
