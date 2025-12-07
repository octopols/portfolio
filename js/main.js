/**
 * AETHER ANIMATION LIBRARY - MAIN SCRIPTS
 * Created: December 2025
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    /* ===================================
       REPOSITORY DATA (OPEN SOURCE PROJECTS)
    =================================== */
    const libraryData = [
        { 
            id: 'github-desktop', 
            name: 'GitHub Desktop', 
            logo: 'assets/logos/github_desktop.png',
            url: 'https://github.com/desktop/desktop'
        },
        { 
            id: 'vscode', 
            name: 'VS Code', 
            logo: 'assets/logos/vscode.svg',
            url: 'https://github.com/microsoft/vscode'
        },
        { 
            id: 'vlc', 
            name: 'VLC Media Player', 
            logo: 'assets/logos/vlc.svg',
            url: 'https://code.videolan.org/videolan/vlc'
        },
        { 
            id: 'musescore', 
            name: 'MuseScore', 
            logo: 'assets/logos/musescore_studio.svg',
            url: 'https://github.com/musescore/MuseScore'
        },
        { 
            id: 'organic-maps', 
            name: 'Organic Maps', 
            logo: 'assets/logos/organic_maps.png',
            url: 'https://github.com/organicmaps/organicmaps'
        },
        { 
            id: 'bitwarden', 
            name: 'Bitwarden', 
            logo: 'assets/logos/bitwarden.png',
            url: 'https://github.com/bitwarden'
        }
    ];

    // Populate Repository Grid
    const repoGrid = document.getElementById('repo-grid');
    if (repoGrid) {
        libraryData.forEach(item => {
            const link = document.createElement('a');
            link.href = item.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'p-6 border border-white/10 bg-white/5 rounded-lg hover:bg-white/10 transition-all group flex items-center justify-between';
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
        const timeEl = document.getElementById('local-time');
        if (timeEl) {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            timeEl.textContent = `${displayHours}:${minutes} ${ampm}`;
        }
    }
    updateLocalTime();
    setInterval(updateLocalTime, 1000);

    /* ===================================
       PRELOADER ANIMATION
    =================================== */
    const preloader = document.getElementById('preloader');
    const progress = document.getElementById('loader-progress');
    const text = document.getElementById('loader-text');
    
    // Preload trail images
    const trailImagesData = [
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=200',
        'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=200',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200'
    ];
    trailImagesData.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    let loadVal = 0;
    const loadInterval = setInterval(() => {
        loadVal += Math.floor(Math.random() * 10) + 1;
        if(loadVal > 100) loadVal = 100;
        progress.style.width = loadVal + '%';
        text.innerText = loadVal + '%';
        if(loadVal === 100) {
            clearInterval(loadInterval);
            setTimeout(() => preloader.classList.add('loaded'), 500);
        }
    }, 30);

    /* ===================================
       CUSTOM CURSOR & IMAGE TRAIL
    =================================== */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    const trailContainer = document.getElementById('trail-container');
    const magneticSection = document.getElementById('magnetic-section');
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';

        // Image Trail Effect in Magnetic Section
        if (magneticSection && trailContainer) {
            const rect = magneticSection.getBoundingClientRect();
            if (mouseY >= rect.top && mouseY <= rect.bottom) {
                if(Math.random() < 0.15) {
                    const img = document.createElement('img');
                    img.src = trailImagesData[Math.floor(Math.random() * trailImagesData.length)];
                    img.className = 'trail-img';
                    img.style.left = mouseX + 'px';
                    img.style.top = mouseY + 'px';
                    img.style.setProperty('--r', (Math.random() * 30 - 15) + 'deg');
                    document.body.appendChild(img);
                    setTimeout(() => img.remove(), 600);
                }
            }
        }
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
    const menuOverlay = document.getElementById('menu-overlay');
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    
    function openMenu() {
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (menuToggle) menuToggle.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    
    // Close menu when clicking menu items
    document.querySelectorAll('#menu-overlay .menu-item a').forEach(link => {
        link.addEventListener('click', (e) => {
            closeMenu();
        });

        // Track cursor position for shine effect with smooth animation
        let animationFrame;
        link.addEventListener('mousemove', (e) => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
            
            animationFrame = requestAnimationFrame(() => {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                link.style.setProperty('--x', x + 'px');
                link.style.setProperty('--y', y + 'px');
            });
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) {
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
    const p = document.querySelector('.reveal-paragraph');
    if(p) {
        const words = p.innerText.split(' ');
        p.innerHTML = words.map((word, i) => 
            `<span style="display:inline-block; opacity:0; transform:translateY(20px); transition:all 0.5s ease-out ${i*0.05}s">${word}</span> `
        ).join('');
        
        new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                entries[0].target.querySelectorAll('span').forEach(s => {
                    s.style.opacity = 1;
                    s.style.transform = 'translateY(0)';
                });
            }
        }).observe(p);
    }

    /* ===================================
       SCROLL-BASED ANIMATIONS
    =================================== */
    const horizontalSection = document.getElementById('process');
    const horizontalTrack = document.getElementById('horizontal-track');
    const progressBar = document.getElementById('progress-bar');
    const videoSection = document.getElementById('video-expand');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Progress Bar
        if (progressBar) {
            progressBar.style.width = (scrollTop / docHeight * 100) + '%';
        }

        // Parallax Background
        document.querySelectorAll('.parallax-bg').forEach(bg => {
            const speed = bg.getAttribute('data-speed');
            if(bg.querySelector('img')) {
                bg.querySelector('img').style.transform = `translateY(${scrollTop * speed}px) scale(1.1)`;
            }
        });

        // Horizontal Scroll Section
        if(horizontalSection && horizontalTrack) {
            const offset = horizontalSection.offsetTop;
            const height = horizontalSection.offsetHeight;
            const winH = window.innerHeight;
            
            if(scrollTop >= offset && scrollTop <= (offset + height - winH)) {
                const pct = (scrollTop - offset) / (height - winH);
                const move = (horizontalTrack.scrollWidth - window.innerWidth) * pct;
                horizontalTrack.style.transform = `translateX(-${move}px)`;
            }
        }

        // Video Expand Effect
        if(videoSection) {
            const rect = videoSection.getBoundingClientRect();
            const centerDist = Math.abs(rect.top + rect.height/2 - window.innerHeight/2);
            
            if(centerDist < window.innerHeight * 0.6) {
                const expand = 1 - (centerDist / (window.innerHeight*0.6));
                videoSection.style.width = Math.min(70 + (expand * 30), 100) + '%';
                videoSection.style.borderRadius = (20 * (1-expand)) + 'px';
            }
        }
    });

    /* ===================================
       INTERACTIVE ELEMENTS
    =================================== */
    
    // Magnetic Effect
    document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
        wrap.addEventListener('mousemove', (e) => {
            const rect = wrap.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width/2) * 0.8;
            const y = (e.clientY - rect.top - rect.height/2) * 0.8;
            const content = wrap.querySelector('.magnetic-content');
            if (content) {
                content.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
            }
        });
        
        wrap.addEventListener('mouseleave', () => {
            const content = wrap.querySelector('.magnetic-content');
            if (content) {
                content.style.transform = 'translate(0,0) scale(1)';
            }
        });
    });

    // 3D Tilt Card
    const tiltWrap = document.querySelector('.tilt-card-wrapper');
    const tiltCard = document.querySelector('.tilt-card');
    
    if(tiltWrap && tiltCard) {
        tiltWrap.addEventListener('mousemove', (e) => {
            const rect = tiltWrap.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
            tiltCard.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
        });
        
        tiltWrap.addEventListener('mouseleave', () => {
            tiltCard.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
        });
    }

    /* ===================================
       CANVAS PARTICLE NETWORK
    =================================== */
    const canvas = document.getElementById('network-canvas');
    
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles = [];

        function resize() {
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
            initParticles();
        }

        function initParticles() {
            particles = [];
            const count = window.innerWidth < 768 ? 30 : 60;
            
            for(let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#fff';
            ctx.strokeStyle = 'rgba(255,255,255,0.1)';

            particles.forEach(p => {
                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off walls
                if(p.x < 0 || p.x > width) p.vx *= -1;
                if(p.y < 0 || p.y > height) p.vy *= -1;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Connect to mouse
                const rect = canvas.getBoundingClientRect();
                const dx = (mouseX - rect.left) - p.x;
                const dy = (mouseY - rect.top) - p.y;
                
                if(Math.sqrt(dx*dx + dy*dy) < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouseX - rect.left, mouseY - rect.top);
                    ctx.stroke();
                }
            });

            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', resize);
        resize();
        draw();
    }

    /* ===================================
       COUNTER ANIMATION
    =================================== */
    function startCounter(el) {
        const target = +el.dataset.target;
        const suffix = el.dataset.suffix || '';
        let count = 0;
        const inc = target / 50;
        
        const timer = setInterval(() => {
            count += inc;
            if(count >= target) {
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
        const username = 'octopols';
        
        try {
            // Fetch user data
            const userResponse = await fetch(`https://api.github.com/users/${username}`);
            const userData = await userResponse.json();
            
            // Fetch repos to calculate total stars
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
            const reposData = await reposResponse.json();
            
            const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
            
            // Update the DOM
            const reposEl = document.getElementById('gh-repos');
            const starsEl = document.getElementById('gh-stars');
            const followersEl = document.getElementById('gh-followers');
            const contributionsEl = document.getElementById('gh-contributions');
            
            if (reposEl) {
                reposEl.dataset.target = userData.public_repos;
                reposEl.innerText = '0';
                startCounter(reposEl);
            }
            
            if (starsEl) {
                starsEl.dataset.target = totalStars;
                starsEl.innerText = '0';
                startCounter(starsEl);
            }
            
            if (followersEl) {
                followersEl.dataset.target = userData.followers;
                followersEl.innerText = '0';
                startCounter(followersEl);
            }
            
            // Estimate contributions (GitHub API doesn't provide this easily without GraphQL)
            // Using a placeholder for now
            if (contributionsEl) {
                contributionsEl.dataset.target = 1200; // Placeholder
                contributionsEl.innerText = '0';
                startCounter(contributionsEl);
            }
            
        } catch (error) {
            console.error('Error fetching GitHub stats:', error);
            // Set fallback values
            document.getElementById('gh-repos').innerText = '--';
            document.getElementById('gh-stars').innerText = '--';
            document.getElementById('gh-followers').innerText = '--';
            document.getElementById('gh-contributions').innerText = '--';
        }
    }
    
    // Fetch GitHub stats when repository section is visible
    const repositorySection = document.querySelector('#repository');
    if (repositorySection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fetchGitHubStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(repositorySection);
    }

    /* ===================================
       TILT CARD EFFECT
    =================================== */
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
            card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
        });
    });

    /* ===================================
       SKILL POPUP SYSTEM
    =================================== */
    const skillEvidence = {
        javascript: {
            title: 'JavaScript / TypeScript',
            evidence: [
                'Architected full-stack RCS messaging integration serving 3B+ users at BIK',
                'Built interactive billing dashboard with React, Redux state management',
                'Developed real-time popup widget infrastructure for MuseScore desktop app',
                'Implemented type-safe APIs with TypeScript for campaign management platform'
            ]
        },
        nodejs: {
            title: 'Node.js / Express',
            evidence: [
                'Built Express REST APIs for RCS messaging platform handling millions of messages',
                'Developed Shopify sync engine reducing integration time from 2 weeks to 2 days',
                'Created campaign management backend with Firebase Firestore integration',
                'Implemented JWT authentication and role-based access control for internal tools'
            ]
        },
        react: {
            title: 'React / Redux',
            evidence: [
                'Built responsive billing dashboard with Redux for state management at BIK',
                'Developed popup configuration UI with real-time preview and A/B testing',
                'Created territory management app with drag-and-drop interface',
                'Implemented reusable component library following atomic design principles'
            ]
        },
        cpp: {
            title: 'C++ / Qt',
            evidence: [
                'Contributed to VLC Media Player: multi-file metadata editing with C++/Qt',
                'Built popup widget system for MuseScore with Qt framework and QML',
                'Refactored VLC metadata API improving code maintainability by 40%',
                'Implemented cross-platform UI components for desktop applications'
            ]
        },
        cloud: {
            title: 'GCP / Firebase',
            evidence: [
                'Deployed microservices on Google Cloud Platform for RCS infrastructure',
                'Integrated Firebase Cloud Functions for serverless campaign triggers',
                'Configured Cloud Storage for media assets serving 1M+ daily requests',
                'Implemented Firebase Authentication with custom claims for role management'
            ]
        },
        database: {
            title: 'Firestore / PostgreSQL',
            evidence: [
                'Designed Firestore schema for real-time campaign tracking and analytics',
                'Optimized PostgreSQL queries reducing dashboard load time by 60%',
                'Implemented database migrations for BSP merchant data with zero downtime',
                'Built indexing strategy for Firestore collections handling 10K+ writes/sec'
            ]
        },
        elasticsearch: {
            title: 'Elasticsearch',
            evidence: [
                'Implemented segment sorting with Elasticsearch for targeted campaigns',
                'Built full-text search across merchant catalogs with fuzzy matching',
                'Optimized query performance handling 5M+ documents with sub-second response',
                'Created aggregation pipelines for real-time analytics dashboards'
            ]
        },
        devops: {
            title: 'Docker / Kubernetes',
            evidence: [
                'Containerized Node.js microservices with Docker multi-stage builds',
                'Deployed Kubernetes clusters for auto-scaling RCS messaging platform',
                'Configured CI/CD pipelines with GitHub Actions for automated deployments',
                'Implemented health checks and monitoring for production workloads'
            ]
        }
    };

    const skillPopupOverlay = document.getElementById('skill-popup-overlay');
    const skillPopup = document.getElementById('skill-popup');
    const skillPopupContent = document.getElementById('skill-popup-content');
    const connectorLine = document.getElementById('connector-line');
    const connectorDotStart = document.getElementById('connector-dot-start');
    const connectorDotEnd = document.getElementById('connector-dot-end');
    const skillConnector = document.getElementById('skill-connector');
    let currentSkillCard = null;
    let isRightColumn = false;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let popupStartX = 0;
    let popupStartY = 0;

    // Open skill popup
    tiltCards.forEach((card, index) => {
        if (card.dataset.skill) {
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                const skillKey = card.dataset.skill;
                const skillData = skillEvidence[skillKey];
                
                if (skillData) {
                    currentSkillCard = card;
                    
                    // Store card position before it becomes fixed
                    const cardRect = card.getBoundingClientRect();
                    
                    // Create placeholder to maintain grid space
                    const placeholder = document.createElement('div');
                    placeholder.className = 'tilt-card-placeholder';
                    placeholder.style.width = `${cardRect.width}px`;
                    placeholder.style.height = `${cardRect.height}px`;
                    card.parentNode.insertBefore(placeholder, card);
                    card.placeholder = placeholder;
                    
                    // Determine if card is in right columns (index 2,3,6,7 in grid)
                    const gridColumn = index % 4;
                    isRightColumn = gridColumn >= 2;
                    
                    // Add/remove left-side class for right columns
                    if (isRightColumn) {
                        skillPopupOverlay.classList.add('left-side');
                    } else {
                        skillPopupOverlay.classList.remove('left-side');
                    }
                    
                    // Move card to body level to escape section stacking context
                    document.body.appendChild(card);
                    
                    // Add active class to keep card sharp (this makes it fixed position)
                    card.classList.add('active');
                    
                    // Reposition the fixed card to its original location
                    card.style.top = `${cardRect.top}px`;
                    card.style.left = `${cardRect.left}px`;
                    card.style.width = `${cardRect.width}px`;
                    card.style.height = `${cardRect.height}px`;
                    
                    // Populate popup content
                    skillPopupContent.innerHTML = `
                        <h3 class="text-2xl font-bold mb-6 tracking-tight">${skillData.title}</h3>
                        <div class="space-y-4">
                            ${skillData.evidence.map(item => `
                                <div class="flex gap-3 items-start">
                                    <div class="w-2 h-2 rounded-full bg-white/60 mt-2 flex-shrink-0"></div>
                                    <p class="text-white/80 leading-relaxed">${item}</p>
                                </div>
                            `).join('')}
                        </div>
                    `;
                    
                    // Show overlay and connector
                    skillPopupOverlay.style.display = 'flex';
                    skillConnector.style.display = 'block';
                    
                    // Hide line and dots initially
                    connectorLine.classList.remove('visible');
                    connectorDotStart.classList.remove('visible');
                    connectorDotEnd.classList.remove('visible');
                    
                    // Fade in overlay
                    requestAnimationFrame(() => {
                        skillPopupOverlay.style.opacity = '1';
                        
                        // Open popup immediately
                        skillPopup.style.transform = 'scale(1)';
                    });
                    
                    // Wait for popup to fully render, then calculate line
                    setTimeout(() => {
                        updateConnectorLine();
                        
                        // Show line and dots (animation starts automatically via CSS)
                        connectorLine.classList.add('visible');
                        connectorDotStart.classList.add('visible');
                        connectorDotEnd.classList.add('visible');
                    }, 350);
                    
                    // Prevent body scroll with padding to avoid layout shift
                    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                    if (scrollbarWidth > 0) {
                        document.body.style.overflow = 'hidden';
                        document.body.style.paddingRight = `${scrollbarWidth}px`;
                        
                        // Also apply to fixed elements to prevent shift
                        const fixedElements = document.querySelectorAll('.section-label, .cursor-dot, .cursor-circle, .noise-overlay');
                        fixedElements.forEach(el => {
                            el.style.paddingRight = `${scrollbarWidth}px`;
                        });
                    } else {
                        document.body.style.overflow = 'hidden';
                    }
                }
            });
        }
    });

    // Close popup
    function closeSkillPopup() {
        skillPopupOverlay.style.opacity = '0';
        connectorLine.classList.remove('visible');
        connectorDotStart.classList.remove('visible');
        connectorDotEnd.classList.remove('visible');
        
        skillPopup.style.transform = 'scale(0.9)';
        
        // Remove active class from card and clear inline styles
        if (currentSkillCard) {
            currentSkillCard.classList.remove('active');
            currentSkillCard.style.top = '';
            currentSkillCard.style.left = '';
            currentSkillCard.style.width = '';
            currentSkillCard.style.height = '';
            
            // Move card back to its original position in the grid
            if (currentSkillCard.placeholder) {
                currentSkillCard.placeholder.parentNode.insertBefore(currentSkillCard, currentSkillCard.placeholder);
                currentSkillCard.placeholder.remove();
                currentSkillCard.placeholder = null;
            }
        }
        
        setTimeout(() => {
            skillPopupOverlay.style.display = 'none';
            skillConnector.style.display = 'none';
            skillPopupOverlay.classList.remove('left-side');
            
            // Reset popup position and transform
            skillPopup.style.left = '';
            skillPopup.style.top = '';
            skillPopup.style.transform = '';
            
            currentSkillCard = null;
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            
            // Remove padding from fixed elements
            const fixedElements = document.querySelectorAll('.section-label, .cursor-dot, .cursor-circle, .noise-overlay');
            fixedElements.forEach(el => {
                el.style.paddingRight = '';
            });
        }, 300);
    }

    document.querySelector('.popup-close')?.addEventListener('click', closeSkillPopup);
    skillPopupOverlay?.addEventListener('click', (e) => {
        if (e.target === skillPopupOverlay) {
            closeSkillPopup();
        }
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && skillPopupOverlay?.style.display === 'flex') {
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
            // Right columns: line from left edge of card to right edge of popup
            startX = cardRect.left;
            startY = cardRect.top + cardRect.height / 2;
            endX = popupRect.right;
            endY = popupRect.top + popupRect.height / 2;
        } else {
            // Left columns: line from right edge of card to left edge of popup
            startX = cardRect.right;
            startY = cardRect.top + cardRect.height / 2;
            endX = popupRect.left;
            endY = popupRect.top + popupRect.height / 2;
        }
        
        // Update line
        connectorLine.setAttribute('x1', startX);
        connectorLine.setAttribute('y1', startY);
        connectorLine.setAttribute('x2', endX);
        connectorLine.setAttribute('y2', endY);
        
        // Update dots
        connectorDotStart.setAttribute('cx', startX);
        connectorDotStart.setAttribute('cy', startY);
        connectorDotEnd.setAttribute('cx', endX);
        connectorDotEnd.setAttribute('cy', endY);
    }

    // Update on scroll/resize
    window.addEventListener('scroll', () => {
        if (currentSkillCard) updateConnectorLine();
    });
    
    window.addEventListener('resize', () => {
        if (currentSkillCard) updateConnectorLine();
    });

    /* ===================================
       POPUP DRAG FUNCTIONALITY
    =================================== */
    if (skillPopup) {
        skillPopup.addEventListener('mousedown', (e) => {
            // Don't drag if clicking on close button or content
            if (e.target.closest('.popup-close') || e.target.closest('#skill-popup-content')) {
                return;
            }
            
            isDragging = true;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            
            const rect = skillPopup.getBoundingClientRect();
            popupStartX = rect.left;
            popupStartY = rect.top;
            
            skillPopup.style.cursor = 'grabbing';
            skillPopup.style.userSelect = 'none';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - dragStartX;
            const deltaY = e.clientY - dragStartY;
            
            const newX = popupStartX + deltaX;
            const newY = popupStartY + deltaY;
            
            skillPopup.style.position = 'fixed';
            skillPopup.style.left = `${newX}px`;
            skillPopup.style.top = `${newY}px`;
            skillPopup.style.transform = 'scale(1)';
            
            // Update connector line during drag
            updateConnectorLine();
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                skillPopup.style.cursor = '';
                skillPopup.style.userSelect = '';
            }
        });
    }

    /* ===================================
       CONTACT BUTTON SPLIT ANIMATION
    =================================== */
    const contactTrigger = document.getElementById('contact-trigger');
    const contactButtons = document.getElementById('contact-buttons');
    
    if (contactTrigger && contactButtons) {
        let isExpanded = false;
        
        contactTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (!isExpanded) {
                // Add splitting class for tear effect
                contactTrigger.classList.add('splitting');
                
                // Show contact buttons with tear animation
                setTimeout(() => {
                    contactButtons.classList.add('active');
                }, 100);
                
                isExpanded = true;
            }
        });
        
        // Click outside to collapse
        document.addEventListener('click', (e) => {
            if (isExpanded && 
                !contactButtons.contains(e.target) && 
                !contactTrigger.contains(e.target)) {
                
                // Hide contact buttons
                contactButtons.classList.remove('active');
                
                // Show trigger button again
                setTimeout(() => {
                    contactTrigger.classList.remove('splitting');
                }, 300);
                
                isExpanded = false;
            }
        });
    }
});
