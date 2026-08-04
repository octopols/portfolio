/**
 * AETHER ANIMATION LIBRARY - MAIN SCRIPTS
 * Created: December 2025
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  /* ===================================
       SMOOTH SCROLL FOR WHEEL EVENTS
    =================================== */
  let currentScroll = window.scrollY;
  let targetScroll = window.scrollY;
  let isScrolling = false;
  let wheelEventCount = 0;
  let lastWheelTime = 0;
  let isTrackpad = null; // null = unknown, true = trackpad, false = mouse wheel

  // Smooth scroll animation (only for mouse wheel)
  function smoothScrollAnimation() {
    if (Math.abs(targetScroll - currentScroll) < 0.5) {
      currentScroll = targetScroll;
      isScrolling = false;
      return;
    }

    currentScroll += (targetScroll - currentScroll) * 0.1;
    window.scrollTo(0, currentScroll);

    if (isScrolling) {
      requestAnimationFrame(smoothScrollAnimation);
    }
  }

  // Detect trackpad vs mouse wheel more reliably
  window.addEventListener(
    "wheel",
    (e) => {
      const now = Date.now();
      const timeDelta = now - lastWheelTime;
      lastWheelTime = now;

      // Enhanced trackpad detection
      // Trackpads: frequent events, smaller deltaY, often have decimal values
      // Mouse wheels: infrequent events, larger deltaY, usually integer values
      if (isTrackpad === null) {
        // Initial detection based on multiple signals
        const hasDecimals = e.deltaY % 1 !== 0;
        const isSmallDelta = Math.abs(e.deltaY) < 50;
        const isFrequent = timeDelta < 50;

        if ((hasDecimals || isSmallDelta) && isFrequent) {
          isTrackpad = true;
          console.log("Detected: Trackpad - using native scrolling");
        } else if (Math.abs(e.deltaY) > 100) {
          isTrackpad = false;
          console.log("Detected: Mouse wheel - using smooth scrolling");
        }
      }

      // For trackpad: allow native scrolling (don't preventDefault)
      if (isTrackpad === true) {
        // Let the browser handle trackpad scrolling naturally
        return;
      }

      // For mouse wheel: use custom smooth scrolling
      if (isTrackpad === false) {
        e.preventDefault();
        targetScroll += e.deltaY * 0.8;
        targetScroll = Math.max(
          0,
          Math.min(
            targetScroll,
            document.documentElement.scrollHeight - window.innerHeight,
          ),
        );

        if (!isScrolling) {
          isScrolling = true;
          requestAnimationFrame(smoothScrollAnimation);
        }
      }
    },
    { passive: false },
  );

  /* ===================================
       DEBUG: CHECK MARQUEE ANIMATION
    =================================== */
  console.log("=== MARQUEE DEBUG ===");
  const marqueeTrack = document.querySelector(".marquee-track");
  const marqueeContainer = document.querySelector(".marquee-container");
  const marqueeItems = document.querySelectorAll(".marquee-item");

  console.log("Marquee track found:", marqueeTrack);
  console.log("Marquee container found:", marqueeContainer);
  console.log("Marquee items count:", marqueeItems.length);

  if (marqueeTrack) {
    const computedStyle = window.getComputedStyle(marqueeTrack);
    console.log("\n--- COMPUTED STYLES (what browser actually sees) ---");
    console.log("Display:", computedStyle.display);
    console.log("Gap:", computedStyle.gap);
    console.log("Animation:", computedStyle.animation);
    console.log("Animation-name:", computedStyle.animationName);
    console.log("Animation-duration:", computedStyle.animationDuration);
    console.log("Animation-play-state:", computedStyle.animationPlayState);
    console.log("Transform:", computedStyle.transform);
    console.log("Will-change:", computedStyle.willChange);

    console.log("\n--- TAILWIND OVERRIDE CHECK ---");
    console.log(
      "Is display being overridden?",
      computedStyle.display !== "flex" ? "YES - PROBLEM!" : "No",
    );
    console.log(
      "Is animation missing?",
      computedStyle.animationName === "none" ? "YES - PROBLEM!" : "No",
    );
  }

  if (marqueeContainer) {
    const containerStyle = window.getComputedStyle(marqueeContainer);
    console.log("\n--- CONTAINER STYLES ---");
    console.log("Overflow:", containerStyle.overflow);
    console.log("Overflow-x:", containerStyle.overflowX);
    console.log("Width:", containerStyle.width);
  }

  console.log("\n--- MARQUEE ITEMS ---");
  marqueeItems.forEach((item, i) => {
    const itemStyle = window.getComputedStyle(item);
    console.log(`Item ${i}: "${item.textContent.trim()}"`);
    console.log(`  Font-size: ${itemStyle.fontSize}`);
    console.log(`  Width: ${item.offsetWidth}px`);
    console.log(`  Color: ${itemStyle.color}`);
  });
  console.log("=== END DEBUG ===");

  /* ===================================
       REPOSITORY DATA (OPEN SOURCE PROJECTS)
    =================================== */
  const libraryData = [
    {
      id: "github-desktop",
      name: "GitHub Desktop",
      logo: "assets/logos/github_desktop.png",
      url: "https://github.com/desktop/desktop",
    },
    {
      id: "vscode",
      name: "VS Code",
      logo: "assets/logos/vscode.svg",
      url: "https://github.com/microsoft/vscode",
    },
    {
      id: "vlc",
      name: "VLC Media Player",
      logo: "assets/logos/vlc.svg",
      url: "https://code.videolan.org/videolan/vlc",
    },
    {
      id: "musescore",
      name: "MuseScore",
      logo: "assets/logos/musescore_studio.svg",
      url: "https://github.com/musescore/MuseScore",
    },
    {
      id: "organic-maps",
      name: "Organic Maps",
      logo: "assets/logos/organic_maps.png",
      url: "https://github.com/organicmaps/organicmaps",
    },
    {
      id: "bitwarden",
      name: "Bitwarden",
      logo: "assets/logos/bitwarden.png",
      url: "https://github.com/bitwarden",
    },
  ];

  // Populate Repository Grid
  const repoGrid = document.getElementById("repo-grid");
  if (repoGrid) {
    libraryData.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className =
        "p-6 border border-white/10 bg-white/5 rounded-lg hover:bg-white/10 transition-all group flex items-center justify-between";
      link.innerHTML = `
                <div class="flex items-center gap-4">
                    <img src="${item.logo}" alt="${item.name}" class="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity">
                    <span class="font-mono text-sm text-white">${item.name}</span>
                </div>
                <i data-lucide="external-link" class="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"></i>
            `;
      repoGrid.appendChild(link);
    });

    // Re-initialize icons for dynamically added content
    lucide.createIcons();
  }

  /* ===================================
       LOCAL TIME DISPLAY
    =================================== */
  // This is labelled as *my* local time under a Bengaluru address, so it has to
  // be pinned to IST — reading the visitor's clock showed a recruiter in
  // San Francisco their own time and called it Bengaluru.
  function updateLocalTime() {
    const timeEl = document.getElementById("local-time");
    if (!timeEl) return;
    try {
      timeEl.textContent = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (e) {
      // No tz database in this engine — drop the row rather than show a stub.
      const wrapper = timeEl.closest("[data-local-time-block]");
      if (wrapper) wrapper.remove();
      else timeEl.remove();
    }
  }
  updateLocalTime();
  setInterval(updateLocalTime, 1000);

  /* ===================================
       FOOTER COPYRIGHT YEAR
    =================================== */
  const footerYear = document.getElementById("footer-year");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  /* ===================================
       PRELOADER ANIMATION
    =================================== */
  const preloader = document.getElementById("preloader");
  const progress = document.getElementById("loader-progress");
  const text = document.getElementById("loader-text");

  // Preload trail images
  const trailImagesData = [
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=200",
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=200",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200",
  ];
  trailImagesData.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  let loadVal = 0;
  const loadInterval = setInterval(() => {
    loadVal += Math.floor(Math.random() * 10) + 1;
    if (loadVal > 100) loadVal = 100;
    progress.style.width = loadVal + "%";
    text.innerText = loadVal + "%";
    if (loadVal === 100) {
      clearInterval(loadInterval);
      setTimeout(() => preloader.classList.add("loaded"), 500);
    }
  }, 30);

  /* ===================================
       CUSTOM CURSOR
    =================================== */
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorCircle = document.querySelector(".cursor-circle");
  let mouseX = 0,
    mouseY = 0,
    cursorX = 0,
    cursorY = 0;

  // Check if mobile device
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (!isMobile && cursorDot && cursorCircle) {
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + "px";
      cursorDot.style.top = mouseY + "px";
    });

    // Smooth Cursor Follow Animation
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursorCircle.style.left = cursorX + "px";
      cursorCircle.style.top = cursorY + "px";
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor Hover Effects
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
       MENU TOGGLE
    =================================== */
  const menuOverlay = document.getElementById("menu-overlay");
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");

  function openMenu() {
    menuOverlay.classList.add("active");

    // Prevent body scroll and compensate for scrollbar
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // Also apply to fixed elements to prevent shift
      const fixedElements = document.querySelectorAll(
        ".section-label, .noise-overlay, header",
      );
      fixedElements.forEach((el) => {
        el.style.paddingRight = `${scrollbarWidth}px`;
      });
    } else {
      document.body.style.overflow = "hidden";
    }

    // Animate menu sliding in from left to right (pushing from left)
    gsap.fromTo(
      menuOverlay,
      {
        x: "100%",
      },
      {
        x: "0%",
        duration: 0.8,
        ease: "power3.inOut",
      },
    );

    // Stagger animate menu items
    gsap.fromTo(
      ".menu-item",
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.3,
        ease: "power2.out",
      },
    );
  }

  function closeMenu() {
    // Remove padding and restore scroll immediately to prevent jank
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    // Remove padding from fixed elements
    const fixedElements = document.querySelectorAll(
      ".section-label, .noise-overlay, header",
    );
    fixedElements.forEach((el) => {
      el.style.paddingRight = "";
    });

    // Animate menu sliding out from right to left
    gsap.to(menuOverlay, {
      x: "100%",
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => {
        menuOverlay.classList.remove("active");
      },
    });
  }

  if (menuToggle) menuToggle.addEventListener("click", openMenu);
  if (menuClose) menuClose.addEventListener("click", closeMenu);

  // Animate menu close button on hover
  if (menuClose) {
    let beforeRotation = { value: 45 };
    let afterRotation = { value: -45 };

    menuClose.addEventListener("mouseenter", () => {
      // Animate ::before counterclockwise 90 degrees (45deg -> -45deg)
      gsap.to(beforeRotation, {
        value: -45,
        duration: 0.5,
        ease: "power2.inOut",
        onUpdate: function () {
          menuClose.style.setProperty(
            "--before-rotation",
            beforeRotation.value,
          );
        },
      });

      // Animate ::after clockwise 90 degrees (-45deg -> 45deg)
      gsap.to(afterRotation, {
        value: 45,
        duration: 0.5,
        ease: "power2.inOut",
        onUpdate: function () {
          menuClose.style.setProperty("--after-rotation", afterRotation.value);
        },
      });
    });

    menuClose.addEventListener("mouseleave", () => {
      // Animate back to original X position
      gsap.to(beforeRotation, {
        value: 45,
        duration: 0.5,
        ease: "power2.inOut",
        onUpdate: function () {
          menuClose.style.setProperty(
            "--before-rotation",
            beforeRotation.value,
          );
        },
      });

      gsap.to(afterRotation, {
        value: -45,
        duration: 0.5,
        ease: "power2.inOut",
        onUpdate: function () {
          menuClose.style.setProperty("--after-rotation", afterRotation.value);
        },
      });
    });
  }

  // Close menu when clicking menu items
  // Track currently hovered menu link
  let currentHoveredLink = null;

  document.querySelectorAll("#menu-overlay .menu-item a").forEach((link) => {
    link.addEventListener("click", (e) => {
      closeMenu();
    });

    link.addEventListener("mouseenter", (e) => {
      // Remove active class and kill animation on previously hovered link
      if (currentHoveredLink && currentHoveredLink !== link) {
        gsap.killTweensOf(currentHoveredLink);
        currentHoveredLink.classList.remove("active-hover");
        gsap.set(currentHoveredLink, { "--circle-size": "0px" });
      }

      currentHoveredLink = link;

      // Set entry point position
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      link.style.setProperty("--x", x + "px");
      link.style.setProperty("--y", y + "px");

      // Calculate size needed to cover entire text
      const maxSize = Math.max(rect.width, rect.height) * 2;

      // Add class and animate circle expansion
      link.classList.add("active-hover");
      gsap.fromTo(
        link,
        { "--circle-size": "0px" },
        {
          "--circle-size": `${maxSize}px`,
          duration: 0.6,
          ease: "power2.out",
        },
      );
    });

    link.addEventListener("mouseleave", (e) => {
      if (currentHoveredLink === link) {
        currentHoveredLink = null;
      }

      // Get current mouse position for exit animation
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      link.style.setProperty("--x", x + "px");
      link.style.setProperty("--y", y + "px");

      // Animate circle contraction from exit point
      gsap.to(link, {
        "--circle-size": "0px",
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          link.classList.remove("active-hover");
        },
      });
    });
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      menuOverlay &&
      menuOverlay.classList.contains("active")
    ) {
      closeMenu();
    }
  });

  /* ===================================
       SCROLL-TRIGGERED REVEALS
    =================================== */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          if (entry.target.classList.contains("counter")) {
            startCounter(entry.target);
          }
          // These reveals are one-shot; releasing them keeps counters from
          // being re-triggered and drops the observer's work to zero once the
          // whole page has been seen.
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(".reveal-item, .split-line, .draw-path, .counter")
    .forEach((el) => {
      observer.observe(el);
    });

  // Word-by-Word Reveal for Paragraph
  const p = document.querySelector(".reveal-paragraph");
  if (p) {
    const words = p.innerText.split(" ");
    p.innerHTML = words
      .map(
        (word, i) =>
          `<span style="display:inline-block; opacity:0; transform:translateY(20px); transition:all 0.5s ease-out ${
            i * 0.05
          }s">${word}</span> `,
      )
      .join("");

    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        entries[0].target.querySelectorAll("span").forEach((s) => {
          s.style.opacity = 1;
          s.style.transform = "translateY(0)";
        });
      }
    }).observe(p);
  }

  /* ===================================
       SCROLL-BASED ANIMATIONS
    =================================== */
  const horizontalSection = document.getElementById("process");
  const horizontalTrack = document.getElementById("horizontal-track");
  const progressBar = document.getElementById("progress-bar");
  const videoSection = document.getElementById("video-expand");
  const beyondCodeSection = document.getElementById("beyond-code-expand");

  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Progress Bar
      if (progressBar) {
        progressBar.style.width = (scrollTop / docHeight) * 100 + "%";
      }

      // Parallax Background
      document.querySelectorAll(".parallax-bg").forEach((bg) => {
        const speed = bg.getAttribute("data-speed");
        if (bg.querySelector("img")) {
          bg.querySelector("img").style.transform = `translateY(${
            scrollTop * speed
          }px) scale(1.1)`;
        }
      });

      // Horizontal Scroll Section
      if (horizontalSection && horizontalTrack && !isMobile) {
        const offset = horizontalSection.offsetTop;
        const height = horizontalSection.offsetHeight;
        const winH = window.innerHeight;

        if (scrollTop >= offset && scrollTop <= offset + height - winH) {
          const pct = (scrollTop - offset) / (height - winH);
          const move = (horizontalTrack.scrollWidth - window.innerWidth) * pct;
          horizontalTrack.style.transform = `translateX(-${move}px)`;
        }
      }

      // Video Expand Effect - with smooth transition
      if (videoSection) {
        const rect = videoSection.getBoundingClientRect();
        const centerDist = Math.abs(
          rect.top + rect.height / 2 - window.innerHeight / 2,
        );

        if (centerDist < window.innerHeight * 0.6) {
          const expand = 1 - centerDist / (window.innerHeight * 0.6);
          const targetWidth = Math.min(70 + expand * 30, 100);
          const targetRadius = 20 * (1 - expand);

          // Use CSS transitions by only updating when values change significantly
          const currentWidth = parseFloat(videoSection.style.width) || 70;
          if (Math.abs(currentWidth - targetWidth) > 0.5) {
            videoSection.style.setProperty(
              "width",
              targetWidth + "%",
              "important",
            );
            videoSection.style.setProperty(
              "border-radius",
              targetRadius + "px",
              "important",
            );
          }
        }
      }

      // Beyond Code Expand Effect - with smooth transition
      if (beyondCodeSection) {
        const rect = beyondCodeSection.getBoundingClientRect();
        const centerDist = Math.abs(
          rect.top + rect.height / 2 - window.innerHeight / 2,
        );

        if (centerDist < window.innerHeight * 0.6) {
          const expand = 1 - centerDist / (window.innerHeight * 0.6);
          const targetWidth = Math.min(70 + expand * 30, 100);
          const targetRadius = 20 * (1 - expand);

          // Use CSS transitions by only updating when values change significantly
          const currentWidth = parseFloat(beyondCodeSection.style.width) || 70;
          if (Math.abs(currentWidth - targetWidth) > 0.5) {
            beyondCodeSection.style.width = targetWidth + "%";
            beyondCodeSection.style.borderRadius = targetRadius + "px";
          }
        }
      }
    },
    { passive: true },
  );

  /* ===================================
       INTERACTIVE ELEMENTS
    =================================== */

  // Magnetic Effect
  document.querySelectorAll(".magnetic-wrap").forEach((wrap) => {
    let magneticAnimationFrame;

    wrap.addEventListener("mousemove", (e) => {
      if (magneticAnimationFrame) {
        cancelAnimationFrame(magneticAnimationFrame);
      }

      magneticAnimationFrame = requestAnimationFrame(() => {
        const rect = wrap.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.8;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.8;
        const content = wrap.querySelector(".magnetic-content");
        if (content) {
          content.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
        }
      });
    });

    wrap.addEventListener("mouseleave", () => {
      if (magneticAnimationFrame) {
        cancelAnimationFrame(magneticAnimationFrame);
      }
      const content = wrap.querySelector(".magnetic-content");
      if (content) {
        content.style.transform = "translate(0,0) scale(1)";
      }
    });
  });

  // 3D Tilt Card
  const tiltWrap = document.querySelector(".tilt-card-wrapper");
  const tiltCard = document.querySelector(".tilt-card");

  if (tiltWrap && tiltCard) {
    let tiltWrapAnimationFrame;

    tiltWrap.addEventListener("mousemove", (e) => {
      if (tiltWrapAnimationFrame) {
        cancelAnimationFrame(tiltWrapAnimationFrame);
      }

      tiltWrapAnimationFrame = requestAnimationFrame(() => {
        const rect = tiltWrap.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
        tiltCard.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
      });
    });

    tiltWrap.addEventListener("mouseleave", () => {
      if (tiltWrapAnimationFrame) {
        cancelAnimationFrame(tiltWrapAnimationFrame);
      }
      tiltCard.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
    });
  }

  /* ===================================
       CANVAS PARTICLE NETWORK
    =================================== */
  const canvas = document.getElementById("network-canvas");

  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width,
      height,
      particles = [];

    // Track mouse position for particle connections
    let mouseX = 0,
      mouseY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function resize() {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      initParticles();
    }

    function initParticles() {
      particles = [];
      const count = window.innerWidth < 768 ? 30 : 60;

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "rgba(255,255,255,0.1)";

      particles.forEach((p) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect to mouse
        const rect = canvas.getBoundingClientRect();
        const dx = mouseX - rect.left - p.x;
        const dy = mouseY - rect.top - p.y;

        if (Math.sqrt(dx * dx + dy * dy) < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX - rect.left, mouseY - rect.top);
          ctx.stroke();
        }
      });

      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    draw();
  }

  /* ===================================
       COUNTER ANIMATION
    =================================== */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  function startCounter(el) {
    // Guard against double-starts: the reveal observer can re-fire when an
    // element scrolls back into view, and a second interval on the same node
    // makes the two animations fight over innerText.
    if (el.dataset.counted === "true") return;
    el.dataset.counted = "true";

    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || "";

    if (!Number.isFinite(target) || target <= 0 || prefersReducedMotion) {
      el.innerText = (Number.isFinite(target) ? target : 0) + suffix;
      return;
    }

    let count = 0;
    const inc = target / 50;

    const timer = setInterval(() => {
      count += inc;
      if (count >= target) {
        el.innerText = target + suffix;
        clearInterval(timer);
      } else {
        el.innerText = Math.ceil(count) + suffix;
      }
    }, 30);
  }

  /* ===================================
       GITHUB STATS FETCHER
    =================================== */
  /*
   * The unauthenticated GitHub API allows 60 requests/hour per IP and this
   * costs 2 of them per page view, so a busy hour (or a visitor behind a shared
   * corporate NAT) used to blow the quota and fall through to four "--"
   * placeholders. Two changes fix that: results are cached in localStorage for
   * a day, and a failed fetch leaves the block hidden instead of rendering
   * empty dashes.
   *
   * "Contributions" is deliberately gone: it isn't available from the REST API,
   * and the old code shipped a hardcoded 1200 as if it were measured.
   */
  const GH_CACHE_KEY = "gh-stats-v1";
  const GH_CACHE_TTL = 24 * 60 * 60 * 1000;

  function renderGitHubStats(stats) {
    const statsBlock = document.getElementById("gh-stats");
    if (!statsBlock) return;

    const fields = [
      ["gh-repos", stats.repos],
      ["gh-stars", stats.stars],
      ["gh-followers", stats.followers],
    ];

    statsBlock.classList.remove("hidden");

    // The reveal observer can't have fired for these while the block was
    // display:none, and it releases elements after their first hit — so activate
    // them directly rather than relying on a second intersection.
    statsBlock.querySelectorAll(".reveal-item").forEach((el) => {
      el.classList.add("active");
    });

    fields.forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.dataset.target = value;
      el.innerText = "0";
      startCounter(el);
    });
  }

  function readGitHubCache() {
    try {
      const raw = localStorage.getItem(GH_CACHE_KEY);
      if (!raw) return null;
      const cached = JSON.parse(raw);
      if (!cached || Date.now() - cached.at > GH_CACHE_TTL) return null;
      return cached.stats;
    } catch (e) {
      return null;
    }
  }

  async function fetchGitHubStats() {
    const username = "octopols";

    const cached = readGitHubCache();
    if (cached) {
      renderGitHubStats(cached);
      return;
    }

    try {
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
      ]);

      // Rate-limited responses are 403/429 with a JSON *object*, so checking ok
      // matters: the old code called .reduce() on that object and threw.
      if (!userResponse.ok || !reposResponse.ok) {
        throw new Error(
          `GitHub API returned ${userResponse.status}/${reposResponse.status}`,
        );
      }

      const userData = await userResponse.json();
      const reposData = await reposResponse.json();

      if (!Array.isArray(reposData)) {
        throw new Error("Unexpected repos payload");
      }

      const stats = {
        repos: userData.public_repos ?? 0,
        stars: reposData.reduce(
          (acc, repo) => acc + (repo.stargazers_count || 0),
          0,
        ),
        followers: userData.followers ?? 0,
      };

      try {
        localStorage.setItem(
          GH_CACHE_KEY,
          JSON.stringify({ at: Date.now(), stats }),
        );
      } catch (e) {
        /* private mode / quota — caching is best-effort */
      }

      renderGitHubStats(stats);
    } catch (error) {
      // Leave #gh-stats hidden. Empty stats read worse than no stats.
      console.warn("GitHub stats unavailable, hiding the block:", error.message);
    }
  }

  // Fetch GitHub stats when repository section is visible
  const repositorySection = document.querySelector("#repository");
  if (repositorySection) {
    const ghObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchGitHubStats();
            ghObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    ghObserver.observe(repositorySection);
  }

  /* ===================================
       TILT CARD EFFECT
    =================================== */
  const tiltCards = document.querySelectorAll(".tilt-card");

  // Disable tilt on mobile
  if (!isMobile) {
    let globalMouseX = 0;
    let globalMouseY = 0;

    // Track global mouse position
    document.addEventListener("mousemove", (e) => {
      globalMouseX = e.clientX;
      globalMouseY = e.clientY;
    });

    tiltCards.forEach((card) => {
      let tiltAnimationFrame;

      const updateTilt = () => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        // Calculate distance from mouse to card center
        const distanceX = globalMouseX - cardCenterX;
        const distanceY = globalMouseY - cardCenterY;
        const distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY,
        );

        // Maximum effective distance (in pixels)
        const maxDistance = 500;

        // Calculate influence (1 at card center, 0 at maxDistance)
        const influence = Math.max(0, 1 - distance / maxDistance);

        // Calculate tilt angles based on mouse position relative to card
        const tiltX = (distanceY / rect.height) * 20 * influence;
        const tiltY = (distanceX / rect.width) * 20 * influence;

        // Apply transform
        card.style.transform = `perspective(1000px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg) scale(${1 + influence * 0.02})`;
      };

      // Continuously update tilt based on mouse position
      const animate = () => {
        updateTilt();
        tiltAnimationFrame = requestAnimationFrame(animate);
      };

      // Start animation when card is in viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
          } else {
            if (tiltAnimationFrame) {
              cancelAnimationFrame(tiltAnimationFrame);
            }
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
          }
        });
      });

      observer.observe(card);
    });
  }

  /* ===================================
       SKILL POPUP SYSTEM
    =================================== */

  // Only select skill cards (ones with data-skill attribute)
  const skillCards = document.querySelectorAll(".tilt-card[data-skill]");

  const skillEvidence = {
    nodejs: {
      title: "Node.js / Express",
      evidence: [
        "Built all BSP APIs and webhooks for data storage and report generation",
        "Implemented the Node.js microservices behind provider-agnostic campaign execution",
        "Developed scheduled jobs for phone number quality monitoring across all stores",
        "Implemented IP/domain reputation fetching with automated Slack alerts for ESP blocks",
      ],
    },
    events: {
      title: "Event-Driven Architecture / Message Queues",
      evidence: [
        "Rebuilt Pub/Sub consumer flow control, ack-deadline handling and backpressure — delivery delay 2.4 hours to 94 seconds",
        "Cut steady-state backlog from 236K messages to ~100, retiring a 38-node scale-out",
        "Built the webhook-driven status update pipeline behind RCS broadcast delivery",
        "Designed a generic channel abstraction for provider-agnostic campaign execution",
      ],
    },
    devops: {
      title: "State Machines / Orchestration",
      evidence: [
        "Rearchitected Shopify segment sync as a two-machine state machine (orchestrator + sync executor)",
        "Added run-scoped checkpointing, idempotent retries and paced execution under GraphQL rate limits",
        "Sustains reliable sync across 250+ Shopify stores and customer lists exceeding 2M+ records",
        "Built Cancel/Retry Broadcast, aborting in-flight state machines and Cloud Tasks",
      ],
    },
    apis: {
      title: "Microservices / REST APIs",
      evidence: [
        "Developed all BSP APIs and webhooks for data storage and report generation",
        "Built complete RCS APIs: single send, template send, template sync, webhooks, broadcasts",
        "Implemented WhatsApp cost calculation APIs with country-based pricing",
        "Created MM Lite onboarding APIs and generic channel for 3rd party API testing",
      ],
    },
    cloud: {
      title: "GCP / Pub/Sub",
      evidence: [
        "Rebuilt Pub/Sub flow control and backpressure, cutting steady-state backlog from 236K messages to ~100",
        "Implemented Cloud Tasks for broadcast orchestration with abort logic",
        "Company-wide GCP administration with org-level IAM ownership",
        "Built territory app on Firestore for BSP data storage and report generation",
      ],
    },
    cloudtasks: {
      title: "Cloud Tasks / Cloud Functions",
      evidence: [
        "Hardened external webhook delivery into per-store Cloud Tasks isolation with bounded retries",
        "Built a rolling health evaluator that auto-blocks endpoints past a 50% failure rate",
        "Eliminated duplicate deliveries caused by ack-deadline overruns",
        "Implemented Cloud Tasks for broadcast orchestration with abort logic",
      ],
    },
    aws: {
      title: "AWS / Step Functions",
      evidence: [
        "Architected the shared Step Functions orchestration behind all WhatsApp, email, RCS and SMS broadcasts",
        "Replaced per-channel delivery paths with one provider-agnostic path",
        "Company-wide AWS administration with org-level IAM ownership",
        "Drove SOC 2 Type 2 and ISO 27001 to certification alongside the CTO",
      ],
    },
    postgres: {
      title: "PostgreSQL / SQL",
      evidence: [
        "Redesigned campaign analytics on a two-tier PostgreSQL cache + Elasticsearch data stream pipeline",
        "Took analytics page load from 20s to 200ms while doubling page size",
        "Own billing across every revenue channel, including per-client rate card management",
        "Implemented a full billing audit trail after closing a 3-hour daily event tracking gap",
      ],
    },
    elasticsearch: {
      title: "Elasticsearch",
      evidence: [
        "Built the Elasticsearch data stream pipeline behind campaign analytics",
        "Implemented segment sorting with A/B testing to prioritize active customers first",
        "Built broadcast trajectory analysis for campaign frequency capping",
        "Created 'never engage' and bounce segment detection for frequency capping cases",
      ],
    },
    redis: {
      title: "Redis",
      evidence: [
        "Implemented Redis-backed segment delivery for RCS broadcast execution",
        "Serves 2.5M messages/month across 50+ enterprise clients",
        "Part of the Node.js microservices behind provider-agnostic campaign execution",
      ],
    },
    database: {
      title: "Firestore",
      evidence: [
        "Architected Firestore schema for territory app with real-time report generation",
        "Built BSP data storage system with automated data migrations",
        "Implemented Campaign Frequency Capping with broadcast trajectory analysis",
        "Developed template analytics backend and phone number quality tracking system",
      ],
    },
    javascript: {
      title: "TypeScript / JavaScript",
      evidence: [
        "Built complete RCS implementation: single send, templates, webhooks, broadcasts, bot management",
        "Implemented campaign APIs with health checks, frequency capping, and trajectory analysis",
        "Built all BSP APIs and webhooks for data storage and report generation",
        "Created popup widget infrastructure with element targeting and progression tracking",
      ],
    },
    python: {
      title: "Python",
      evidence: [
        "Reverse-engineered Google Trends into a Python wrapper with REST API, CLI tools and web dashboard",
        "Published as an open-source toolkit for programmatic Trends data access",
      ],
    },
    cpp: {
      title: "C++ / Qt / QML",
      evidence: [
        "Designed multi-file metadata editing subsystem for VLC's 3 billion users (GSoC 2024)",
        "Built reusable popup and inline text editing system for MuseScore 4.6 (GSoC 2023)",
        "Refactored VLC legacy internal APIs, mentored directly by VideoLAN founder JB Kempf",
        "Created popup widget infrastructure reused by next year's GSoC developers",
      ],
    },
    tools: {
      title: "Docker / CI/CD / Git",
      evidence: [
        "Published a walkthrough on developing VLC for Windows with Docker",
        "Managed complex Git workflows across distributed open source teams",
        "Created a 2-hour educational video on rebasing feature branches with MuseScore's lead dev",
        "Ships this site through a GitHub Actions build and deploy pipeline",
      ],
    },
  };

  const skillPopupOverlay = document.getElementById("skill-popup-overlay");
  const skillPopup = document.getElementById("skill-popup");
  const skillPopupContent = document.getElementById("skill-popup-content");
  const connectorLine = document.getElementById("connector-line");
  const connectorDotStart = document.getElementById("connector-dot-start");
  const connectorDotEnd = document.getElementById("connector-dot-end");
  const skillConnector = document.getElementById("skill-connector");
  let currentSkillCard = null;
  let isRightColumn = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let popupStartX = 0;
  let popupStartY = 0;

  // Open skill popup
  skillCards.forEach((card, index) => {
    if (card.dataset.skill) {
      card.addEventListener("click", (e) => {
        // Disable popup on mobile
        if (isMobile) {
          return;
        }

        // Prevent reopening if already open
        if (
          skillPopupOverlay.style.display === "flex" &&
          currentSkillCard === card
        ) {
          return;
        }

        e.stopPropagation();
        const skillKey = card.dataset.skill;
        const skillData = skillEvidence[skillKey];

        if (skillData) {
          currentSkillCard = card;

          // Store card position before it becomes fixed
          const cardRect = card.getBoundingClientRect();

          // Create placeholder to maintain grid space
          const placeholder = document.createElement("div");
          placeholder.className = "tilt-card-placeholder";
          placeholder.style.width = `${cardRect.width}px`;
          placeholder.style.height = `${cardRect.height}px`;
          card.parentNode.insertBefore(placeholder, card);
          card.placeholder = placeholder;

          // Determine popup position based on card's position in viewport (industry standard)
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const cardCenterY = cardRect.top + cardRect.height / 2;
          const viewportCenterX = window.innerWidth / 2;

          // If card is on left half of screen, popup opens on RIGHT
          // If card is on right half of screen, popup opens on LEFT
          isRightColumn = cardCenterX > viewportCenterX;

          // Add/remove left-side class based on position
          if (isRightColumn) {
            skillPopupOverlay.classList.add("left-side");
          } else {
            skillPopupOverlay.classList.remove("left-side");
          }

          // Move card to body level to escape section stacking context
          document.body.appendChild(card);

          // Add active class to keep card sharp (this makes it fixed position)
          card.classList.add("active");

          // Reposition the fixed card to its original location
          card.style.top = `${cardRect.top}px`;
          card.style.left = `${cardRect.left}px`;
          card.style.width = `${cardRect.width}px`;
          card.style.height = `${cardRect.height}px`;

          // Populate popup content
          skillPopupContent.innerHTML = `
                        <h3 class="text-2xl font-bold mb-6 tracking-tight">${
                          skillData.title
                        }</h3>
                        <div class="space-y-4">
                            ${skillData.evidence
                              .map(
                                (item) => `
                                <div class="flex gap-3 items-start">
                                    <div class="w-2 h-2 rounded-full bg-white/60 mt-2 flex-shrink-0"></div>
                                    <p class="text-white/80 leading-relaxed">${item}</p>
                                </div>
                            `,
                              )
                              .join("")}
                        </div>
                    `;

          // Show overlay and connector
          skillPopupOverlay.style.display = "flex";
          skillConnector.style.display = "block";

          // Animate overlay fade in
          gsap.to(skillPopupOverlay, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });

          // Get popup position after it's displayed
          const popupRect = skillPopup.getBoundingClientRect();

          // Calculate the direction and distance from card to popup
          const deltaX = cardCenterX - (popupRect.left + popupRect.width / 2);
          const deltaY = cardCenterY - (popupRect.top + popupRect.height / 2);

          // Initialize line at card center (collapsed)
          connectorLine.setAttribute("x1", cardCenterX);
          connectorLine.setAttribute("y1", cardCenterY);
          connectorLine.setAttribute("x2", cardCenterX);
          connectorLine.setAttribute("y2", cardCenterY);

          // Show line and dots immediately
          connectorLine.classList.add("visible");
          connectorDotStart.classList.add("visible");
          connectorDotEnd.classList.add("visible");

          // Animate popup expanding from the card position
          gsap.fromTo(
            skillPopup,
            {
              x: deltaX,
              y: deltaY,
              scale: 0.1,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              onUpdate: updateConnectorLine,
            },
          );

          // Prevent body scroll and fix cursor dot
          const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;
          if (scrollbarWidth > 0) {
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollbarWidth}px`;

            // Also apply to fixed elements to prevent shift
            const fixedElements = document.querySelectorAll(
              ".section-label, .noise-overlay",
            );
            fixedElements.forEach((el) => {
              el.style.paddingRight = `${scrollbarWidth}px`;
            });
          } else {
            document.body.style.overflow = "hidden";
          }
        }
      });
    }
  });

  // Close popup
  function closeSkillPopup() {
    skillPopupOverlay.style.opacity = "0";
    connectorLine.classList.remove("visible");
    connectorDotStart.classList.remove("visible");
    connectorDotEnd.classList.remove("visible");

    skillPopup.style.transform = "scale(0.9)";

    // Remove active class from card and clear inline styles
    if (currentSkillCard) {
      currentSkillCard.classList.remove("active");
      currentSkillCard.style.top = "";
      currentSkillCard.style.left = "";
      currentSkillCard.style.width = "";
      currentSkillCard.style.height = "";

      // Move card back to its original position in the grid
      if (currentSkillCard.placeholder) {
        currentSkillCard.placeholder.parentNode.insertBefore(
          currentSkillCard,
          currentSkillCard.placeholder,
        );
        currentSkillCard.placeholder.remove();
        currentSkillCard.placeholder = null;
      }
    }

    setTimeout(() => {
      skillPopupOverlay.style.display = "none";
      skillConnector.style.display = "none";
      skillPopupOverlay.classList.remove("left-side");

      // Reset popup position and transform
      skillPopup.style.left = "";
      skillPopup.style.top = "";
      skillPopup.style.transform = "";

      currentSkillCard = null;
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

      // Remove padding from fixed elements
      const fixedElements = document.querySelectorAll(
        ".section-label, .cursor-dot, .cursor-circle, .noise-overlay",
      );
      fixedElements.forEach((el) => {
        el.style.paddingRight = "";
      });
    }, 300);
  }

  document
    .querySelector(".popup-close")
    ?.addEventListener("click", closeSkillPopup);
  skillPopupOverlay?.addEventListener("click", (e) => {
    if (e.target === skillPopupOverlay) {
      closeSkillPopup();
    }
  });

  // ESC key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && skillPopupOverlay?.style.display === "flex") {
      closeSkillPopup();
    }
  });

  // Update connector line position
  function updateConnectorLine() {
    if (!currentSkillCard || !skillPopup) return;

    const cardRect = currentSkillCard.getBoundingClientRect();
    const popupRect = skillPopup.getBoundingClientRect();

    let startX, startY, endX, endY;

    // Line always connects from center of card
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;

    if (isRightColumn) {
      // Popup on LEFT: line from card center to right edge of popup
      startX = cardCenterX;
      startY = cardCenterY;
      endX = popupRect.right;
      endY = popupRect.top + popupRect.height / 2;
    } else {
      // Popup on RIGHT: line from card center to left edge of popup
      startX = cardCenterX;
      startY = cardCenterY;
      endX = popupRect.left;
      endY = popupRect.top + popupRect.height / 2;
    }

    // Update line
    connectorLine.setAttribute("x1", startX);
    connectorLine.setAttribute("y1", startY);
    connectorLine.setAttribute("x2", endX);
    connectorLine.setAttribute("y2", endY);

    // Update dots
    connectorDotStart.setAttribute("cx", startX);
    connectorDotStart.setAttribute("cy", startY);
    connectorDotEnd.setAttribute("cx", endX);
    connectorDotEnd.setAttribute("cy", endY);
  }

  // Update on scroll/resize
  window.addEventListener("scroll", () => {
    if (currentSkillCard) updateConnectorLine();
  });

  window.addEventListener("resize", () => {
    if (currentSkillCard) updateConnectorLine();
  });

  /* ===================================
       POPUP DRAG FUNCTIONALITY
    =================================== */
  if (skillPopup) {
    skillPopup.addEventListener("mousedown", (e) => {
      // Don't drag if clicking on close button or content
      if (
        e.target.closest(".popup-close") ||
        e.target.closest("#skill-popup-content")
      ) {
        return;
      }

      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;

      const rect = skillPopup.getBoundingClientRect();
      popupStartX = rect.left;
      popupStartY = rect.top;

      skillPopup.style.cursor = "grabbing";
      skillPopup.style.userSelect = "none";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - dragStartX;
      const deltaY = e.clientY - dragStartY;

      const newX = popupStartX + deltaX;
      const newY = popupStartY + deltaY;

      skillPopup.style.position = "fixed";
      skillPopup.style.left = `${newX}px`;
      skillPopup.style.top = `${newY}px`;
      skillPopup.style.transform = "scale(1)";

      // Update connector line during drag
      updateConnectorLine();
    });

    document.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
        skillPopup.style.cursor = "";
        skillPopup.style.userSelect = "";
      }
    });
  }

  /* ===================================
       CONTACT BUTTON FLUID EXPANSION (GSAP Flip)
    =================================== */
  const contactTrigger = document.getElementById("contact-trigger");
  const contactButtons = document.getElementById("contact-buttons");
  const socialButtons = document.querySelectorAll(".contact-social-btn");

  if (contactTrigger && contactButtons && socialButtons.length > 0) {
    let isExpanded = false;

    // Register Flip plugin
    gsap.registerPlugin(Flip);

    // Initially hide social buttons properly
    gsap.set(socialButtons, { opacity: 0, scale: 0 });

    contactTrigger.addEventListener("click", (e) => {
      e.preventDefault();

      if (!isExpanded) {
        isExpanded = true;

        // Animate main button shrinking
        gsap.to(contactTrigger, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            contactTrigger.style.display = "none";
          },
        });

        // Animate social buttons appearing with stagger
        gsap.to(socialButtons, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: "back.out(1.7)",
        });
      }
    });

    // Click outside to collapse
    document.addEventListener("click", (e) => {
      if (
        isExpanded &&
        !contactButtons.contains(e.target) &&
        !contactTrigger.contains(e.target)
      ) {
        isExpanded = false;

        // Animate social buttons disappearing
        gsap.to(socialButtons, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });

        // Animate main button appearing
        gsap.to(contactTrigger, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          delay: 0.3,
          ease: "back.out(1.4)",
          onStart: () => {
            contactTrigger.style.display = "inline-block";
          },
        });
      }
    });
  }
});
