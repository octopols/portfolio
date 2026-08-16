/**
 * Site nav — mobile panel toggle.
 *
 * Loaded by every page, because every page now carries the same nav block.
 * The panel markup is identical everywhere and the links are absolute, so an
 * article reached from search can get back to Work, Writing or the résumé
 * without going home first.
 *
 * Progressive enhancement: the panel starts with the `hidden` attribute, and
 * `.js .nav-panel[hidden]` is what actually hides it. With scripting off the
 * attribute is inert and the links render as a plain list under the bar.
 */
(function () {
  "use strict";

  var toggle = document.getElementById("nav-toggle");
  var panel = document.getElementById("nav-panel");
  if (!toggle || !panel) return;

  var setOpen = function (open) {
    toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      panel.removeAttribute("hidden");
    } else {
      panel.setAttribute("hidden", "");
    }
  };

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Following a link inside the panel navigates or jumps to an anchor on this
  // page. In the anchor case nothing unmounts, so close it by hand.
  panel.addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  // A resize past the md breakpoint reveals the desktop links; leaving the
  // panel open would stack a second copy underneath them.
  window.matchMedia("(min-width: 768px)").addEventListener("change", function (event) {
    if (event.matches) setOpen(false);
  });
})();
