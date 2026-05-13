/* ==============================================
   NETHMI VIHANGA GAJAWEERA · Portfolio Script
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==============================
       1. PARTICLE BACKGROUND
    ============================== */
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x  = Math.random() * canvas.width;
            this.y  = Math.random() * canvas.height;
            this.r  = Math.random() * 1.5 + 0.3;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.a  = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99,102,241,${this.a})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle());

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(99,102,241,${0.06 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();


    /* ==============================
       2. NAV: SCROLL EFFECT & ACTIVE
    ============================== */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');

        // Scroll to top button
        if (window.scrollY > 400) scrollTopBtn.classList.add('show');
        else scrollTopBtn.classList.remove('show');

        // Active link highlight
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) link.classList.add('active');
        });
    });


    /* ==============================
       3. HAMBURGER MENU
    ============================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });


    /* ==============================
       4. TYPEWRITER
    ============================== */
    const roles = [
        'BIT (Hons) Undergraduate',
        'Network & Mobile Computing',
        'Aspiring Software Developer',
        'QA & Testing Enthusiast',
    ];
    const typeEl = document.getElementById('type-text');
    let roleIdx = 0, charIdx = 0, deleting = false;

    function typeWriter() {
        const current = roles[roleIdx];
        if (!deleting) {
            typeEl.textContent = current.slice(0, ++charIdx);
            if (charIdx === current.length) {
                deleting = true;
                setTimeout(typeWriter, 1800);
                return;
            }
        } else {
            typeEl.textContent = current.slice(0, --charIdx);
            if (charIdx === 0) {
                deleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
            }
        }
        setTimeout(typeWriter, deleting ? 50 : 100);
    }
    setTimeout(typeWriter, 800);


    /* ==============================
       5. REVEAL ON SCROLL
    ============================== */
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));


    /* ==============================
       6. SKILL BARS ANIMATION
    ============================== */
    const bars = document.querySelectorAll('.bar-fill');
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const w = entry.target.getAttribute('data-width');
                entry.target.style.width = w + '%';
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    bars.forEach(bar => barObserver.observe(bar));


    /* ==============================
       7. STATS COUNTER
    ============================== */
    const statNums = document.querySelectorAll('.stat-number');
    let counted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                statNums.forEach(el => {
                    const target = parseInt(el.getAttribute('data-target'));
                    let count = 0;
                    const step = Math.ceil(target / 40);
                    const timer = setInterval(() => {
                        count += step;
                        if (count >= target) { count = target; clearInterval(timer); }
                        el.textContent = count + (target >= 10 ? '' : '');
                    }, 45);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) statsObserver.observe(statsSection);


    /* ==============================
       8. SCROLL TO TOP BUTTON
    ============================== */
    const scrollTopBtn = document.getElementById('scrollTop');
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    /* ==============================
       9. SMOOTH NAV SCROLL
    ============================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

}); // end DOMContentLoaded
