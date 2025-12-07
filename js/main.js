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
        let count = 0;
        const inc = target / 50;
        
        const timer = setInterval(() => {
            count += inc;
            if(count >= target) {
                el.innerText = target;
                clearInterval(timer);
            } else {
                el.innerText = Math.ceil(count);
            }
        }, 30);
    }
});
