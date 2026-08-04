/**
 * WRITING PAGES - SCRIPTS
 *
 * main.js is built around the homepage (preloader, GSAP timelines, horizontal
 * scroll, skill popups) and assumes those elements exist. The writing pages need
 * only four things, so they get their own small script instead.
 *
 * The custom cursor is not optional: styles.css sets `body { cursor: none }`
 * site-wide, so a page without the cursor elements has no visible pointer.
 */
document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  /* ===================================
       CUSTOM CURSOR
    =================================== */
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorCircle = document.querySelector(".cursor-circle");

  if (!isMobile && cursorDot && cursorCircle) {
    let mouseX = 0,
      mouseY = 0,
      cursorX = 0,
      cursorY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + "px";
      cursorDot.style.top = mouseY + "px";
    });

    (function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursorCircle.style.left = cursorX + "px";
      cursorCircle.style.top = cursorY + "px";
      requestAnimationFrame(animateCursor);
    })();

    document.querySelectorAll(".hoverable").forEach((el) => {
      el.addEventListener("mouseenter", () =>
        cursorCircle.classList.add("hovered"),
      );
      el.addEventListener("mouseleave", () =>
        cursorCircle.classList.remove("hovered"),
      );
    });
  }

  /* ===================================
       SCROLL-TRIGGERED REVEALS
    =================================== */
  const revealTargets = document.querySelectorAll(".reveal-item, .split-line");

  if (revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    revealTargets.forEach((el) => observer.observe(el));
  }

  /* ===================================
       READING PROGRESS BAR (article pages)
    =================================== */
  const progressBar = document.getElementById("reading-progress");
  if (progressBar) {
    const updateProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progressBar.style.width = Math.min(100, Math.max(0, pct)) + "%";
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  /* ===================================
       FOOTER COPYRIGHT YEAR
    =================================== */
  const footerYear = document.getElementById("footer-year");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
});
