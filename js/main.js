/**
 * AETHER ANIMATION LIBRARY - MAIN SCRIPTS
 * Created: December 2025
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  lucide.createIcons();

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
    console.log("Is display being overridden?", computedStyle.display !== 'flex' ? 'YES - PROBLEM!' : 'No');
    console.log("Is animation missing?", computedStyle.animationName === 'none' ? 'YES - PROBLEM!' : 'No');
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
  function updateLocalTime() {
    const timeEl = document.getElementById("local-time");
    if (timeEl) {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      timeEl.textContent = `${displayHours}:${minutes} ${ampm}`;
    }
  }
  updateLocalTime();
  setInterval(updateLocalTime, 1000);

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
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorCircle = document.querySelector('.cursor-circle');
  let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Smooth Cursor Follow Animation
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursorCircle.style.left = cursorX + 'px';
    cursorCircle.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor Hover Effects
  document.querySelectorAll('.hoverable').forEach(el => {
    el.addEventListener('mouseenter', () => cursorCircle.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorCircle.classList.remove('hovered'));
  });

  /* ===================================
       MENU TOGGLE
    =================================== */
  const menuOverlay = document.getElementById("menu-overlay");
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");

  function openMenu() {
    menuOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    menuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (menuToggle) menuToggle.addEventListener("click", openMenu);
  if (menuClose) menuClose.addEventListener("click", closeMenu);

  // Close menu when clicking menu items
  document.querySelectorAll("#menu-overlay .menu-item a").forEach((link) => {
    link.addEventListener("click", (e) => {
      closeMenu();
    });

    // Track cursor position for shine effect with smooth animation
    let animationFrame;
    link.addEventListener("mousemove", (e) => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(() => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        link.style.setProperty("--x", x + "px");
        link.style.setProperty("--y", y + "px");
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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (entry.target.classList.contains('counter')) {
          startCounter(entry.target);
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-item, .split-line, .draw-path, .counter').forEach(el => {
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
          }s">${word}</span> `
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

  window.addEventListener("scroll", () => {
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
    if (horizontalSection && horizontalTrack) {
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
        rect.top + rect.height / 2 - window.innerHeight / 2
      );

      if (centerDist < window.innerHeight * 0.6) {
        const expand = 1 - centerDist / (window.innerHeight * 0.6);
        const targetWidth = Math.min(70 + expand * 30, 100);
        const targetRadius = 20 * (1 - expand);
        
        // Use CSS transitions by only updating when values change significantly
        const currentWidth = parseFloat(videoSection.style.width) || 70;
        if (Math.abs(currentWidth - targetWidth) > 0.5) {
          videoSection.style.setProperty('width', targetWidth + '%', 'important');
          videoSection.style.setProperty('border-radius', targetRadius + 'px', 'important');
        }
      }
    }

    // Beyond Code Expand Effect - with smooth transition
    if (beyondCodeSection) {
      const rect = beyondCodeSection.getBoundingClientRect();
      const centerDist = Math.abs(
        rect.top + rect.height / 2 - window.innerHeight / 2
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
  }, { passive: true });

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
    let mouseX = 0, mouseY = 0;
    
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
  function startCounter(el) {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || "";
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
  async function fetchGitHubStats() {
    const username = "octopols";

    try {
      // Fetch user data
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      const userData = await userResponse.json();

      // Fetch repos to calculate total stars
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );
      const reposData = await reposResponse.json();

      const totalStars = reposData.reduce(
        (acc, repo) => acc + repo.stargazers_count,
        0
      );

      // Update the DOM
      const reposEl = document.getElementById("gh-repos");
      const starsEl = document.getElementById("gh-stars");
      const followersEl = document.getElementById("gh-followers");
      const contributionsEl = document.getElementById("gh-contributions");

      if (reposEl) {
        reposEl.dataset.target = userData.public_repos;
        reposEl.innerText = "0";
        startCounter(reposEl);
      }

      if (starsEl) {
        starsEl.dataset.target = totalStars;
        starsEl.innerText = "0";
        startCounter(starsEl);
      }

      if (followersEl) {
        followersEl.dataset.target = userData.followers;
        followersEl.innerText = "0";
        startCounter(followersEl);
      }

      // Estimate contributions (GitHub API doesn't provide this easily without GraphQL)
      // Using a placeholder for now
      if (contributionsEl) {
        contributionsEl.dataset.target = 1200; // Placeholder
        contributionsEl.innerText = "0";
        startCounter(contributionsEl);
      }
    } catch (error) {
      console.error("Error fetching GitHub stats:", error);
      // Set fallback values
      document.getElementById("gh-repos").innerText = "--";
      document.getElementById("gh-stars").innerText = "--";
      document.getElementById("gh-followers").innerText = "--";
      document.getElementById("gh-contributions").innerText = "--";
    }
  }

  // Fetch GitHub stats when repository section is visible
  const repositorySection = document.querySelector("#repository");
  if (repositorySection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchGitHubStats();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(repositorySection);
  }

  /* ===================================
       TILT CARD EFFECT
    =================================== */
  const tiltCards = document.querySelectorAll(".tilt-card");

  tiltCards.forEach((card) => {
    let tiltAnimationFrame;
    
    card.addEventListener("mousemove", (e) => {
      if (tiltAnimationFrame) {
        cancelAnimationFrame(tiltAnimationFrame);
      }
      
      tiltAnimationFrame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
        card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
      });
    });

    card.addEventListener("mouseleave", () => {
      if (tiltAnimationFrame) {
        cancelAnimationFrame(tiltAnimationFrame);
      }
      card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
    });
  });

  /* ===================================
       SKILL POPUP SYSTEM
    =================================== */

  // Only select skill cards (ones with data-skill attribute)
  const skillCards = document.querySelectorAll(".tilt-card[data-skill]");

  const skillEvidence = {
    javascript: {
      title: "JavaScript / TypeScript",
      evidence: [
        "Built complete RCS implementation: single send, templates, webhooks, broadcasts, bot management",
        "Developed billing dashboard with React + Redux for AI model usage tracking and rate cards",
        "Created popup widget infrastructure with element targeting and progression tracking",
        "Implemented campaign APIs with health checks, frequency capping, and trajectory analysis",
      ],
    },
    nodejs: {
      title: "Node.js / Express",
      evidence: [
        "Built all BSP APIs and webhooks for data storage and report generation",
        "Revamped Shopify sync flow removing multiple state machines and reducing errors",
        "Developed scheduled jobs for phone number quality monitoring across all stores",
        "Implemented IP/domain reputation fetching with automated Slack alerts for ESP blocks",
      ],
    },
    react: {
      title: "React / Redux",
      evidence: [
        "Built secure billing dashboard with role-based rate card management (Redux)",
        "Created popup configuration UI with element targeting & A/B test tracking",
        "Developed territory management app with Firestore real-time sync",
        "Implemented common component library shared across BIK & Manifest platforms",
      ],
    },
    cpp: {
      title: "C++ / Qt",
      evidence: [
        "Designed multi-file metadata editing subsystem for VLC's 3 billion users (GSoC 2024)",
        "Built reusable popup and inline text editing system for MuseScore 4.6 (GSoC 2023)",
        "Refactored VLC legacy internal APIs, mentored directly by VideoLAN founder JB Kempf",
        "Created popup widget infrastructure reused by next year's GSoC developers",
      ],
    },
    cloud: {
      title: "GCP / Firebase",
      evidence: [
        "Built territory app on Firestore for BSP data storage and report generation",
        "Implemented Cloud Tasks for broadcast orchestration with abort logic",
        "Developed full-stack Cancel/Retry Broadcast feature aborting state machines and Cloud Tasks",
        "Created generic channel infrastructure for testing 3rd party APIs and broadcasts",
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
    elasticsearch: {
      title: "Elasticsearch",
      evidence: [
        "Implemented segment sorting with A/B testing to prioritize active customers first",
        "Built broadcast trajectory analysis for campaign frequency capping",
        "Created 'never engage' and bounce segment detection for frequency capping cases",
        "Developed comprehensive logic using Elastic data for seamless customer targeting",
      ],
    },
    devops: {
      title: "State Machines / Cloud Tasks",
      evidence: [
        "Designed state machine workflows for Shopify sync and broadcast management",
        "Implemented broadcast abortion logic for state machines and Cloud Tasks",
        "Removed multiple state machines in Shopify sync optimization",
        "Built Cancel/Retry Broadcast feature with state machine orchestration",
      ],
    },
    python: {
      title: "QML",
      evidence: [
        "Developed Qt/QML popup and inline text editing system for MuseScore (GSoC 2023)",
        "Implemented QML-based popup widgets with keyboard navigation support",
        "Created reusable QML components for text style and frame editing interfaces",
        "Built popup widget infrastructure later reused by other MuseScore developers",
      ],
    },
    apis: {
      title: "REST APIs / Webhooks",
      evidence: [
        "Developed all BSP APIs, webhooks for data storage and report generation",
        "Built complete RCS APIs: single send, template send, template sync, webhooks, broadcasts",
        "Implemented WhatsApp cost calculation APIs with country-based pricing",
        "Created MM Lite onboarding APIs and generic channel for 3rd party API testing",
      ],
    },
    tools: {
      title: "Git / Open Source",
      evidence: [
        "Contributed to VLC Media Player (GSoC 2024) and MuseScore (GSoC 2023)",
        "Contributing to GitHub Desktop as open source contributor",
        "Managed complex Git workflows across distributed open source teams",
        "Created 2-hour educational video on rebasing feature branches with MuseScore lead dev",
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

          // Determine if card is in right columns (index 2,3,6,7 in grid)
          const gridColumn = index % 4;
          // Column 0 should open popup on RIGHT (no left-side class)
          // Columns 1,2,3 should open popup on LEFT (with left-side class)
          isRightColumn = gridColumn >= 1;

          console.log("Card clicked:", {
            index,
            gridColumn,
            isRightColumn,
            skillKey,
          });

          // Add/remove left-side class for right columns
          if (isRightColumn) {
            skillPopupOverlay.classList.add("left-side");
            console.log("Added left-side class - popup will be on LEFT");
          } else {
            skillPopupOverlay.classList.remove("left-side");
            console.log("Removed left-side class - popup will be on RIGHT");
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
                            `
                              )
                              .join("")}
                        </div>
                    `;

          // Show overlay and connector
          skillPopupOverlay.style.display = "flex";
          skillConnector.style.display = "block";

          // Hide line and dots initially
          connectorLine.classList.remove("visible");
          connectorDotStart.classList.remove("visible");
          connectorDotEnd.classList.remove("visible");

          // Fade in overlay
          requestAnimationFrame(() => {
            skillPopupOverlay.style.opacity = "1";

            // Open popup immediately
            skillPopup.style.transform = "scale(1)";
          });

          // Wait for popup to fully render, then calculate line
          setTimeout(() => {
            updateConnectorLine();

            // Show line and dots (animation starts automatically via CSS)
            connectorLine.classList.add("visible");
            connectorDotStart.classList.add("visible");
            connectorDotEnd.classList.add("visible");
          }, 350);

          // Prevent body scroll with padding to avoid layout shift
          const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;
          if (scrollbarWidth > 0) {
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollbarWidth}px`;

            // Also apply to fixed elements to prevent shift
            const fixedElements = document.querySelectorAll(
              ".section-label, .cursor-dot, .cursor-circle, .noise-overlay"
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
          currentSkillCard.placeholder
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
        ".section-label, .cursor-dot, .cursor-circle, .noise-overlay"
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

    if (isRightColumn) {
      // Columns 1,2,3: popup on LEFT, line from left edge of card to right edge of popup
      startX = cardRect.left;
      startY = cardRect.top + cardRect.height / 2;
      endX = popupRect.right;
      endY = popupRect.top + popupRect.height / 2;
    } else {
      // Column 0: popup on RIGHT, line from right edge of card to left edge of popup
      startX = cardRect.right;
      startY = cardRect.top + cardRect.height / 2;
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
       CONTACT BUTTON SPLIT ANIMATION
    =================================== */
  const contactTrigger = document.getElementById("contact-trigger");
  const contactButtons = document.getElementById("contact-buttons");

  if (contactTrigger && contactButtons) {
    let isExpanded = false;

    contactTrigger.addEventListener("click", (e) => {
      e.preventDefault();

      if (!isExpanded) {
        // Add splitting class for tear effect
        contactTrigger.classList.add("splitting");

        // Show contact buttons with tear animation
        setTimeout(() => {
          contactButtons.classList.add("active");
        }, 100);

        isExpanded = true;
      }
    });

    // Click outside to collapse
    document.addEventListener("click", (e) => {
      if (
        isExpanded &&
        !contactButtons.contains(e.target) &&
        !contactTrigger.contains(e.target)
      ) {
        // Hide contact buttons
        contactButtons.classList.remove("active");

        // Show trigger button again
        setTimeout(() => {
          contactTrigger.classList.remove("splitting");
        }, 300);

        isExpanded = false;
      }
    });
  }
});
