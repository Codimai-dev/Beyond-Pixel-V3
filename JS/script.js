// Sticky Navigation Scroll Effect
const navbar = document.getElementById('navbar');
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / documentHeight) * 100;

    // Update progress bar
    scrollProgress.style.width = scrollPercentage + '%';
    
    // Add 'scrolled' class when scrolling down
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
}, { passive: true });

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link, .nav-menu .btn');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navHeight = navbar?.offsetHeight || 80;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // If it's a one-time animation, unobserve
            if (!entry.target.classList.contains('keep-observing')) {
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements with animation classes across all pages
document.querySelectorAll('.reveal, .fade-in, .stagger-children, .pain-point-item, .offering-card, .work-step, .case-card, .framework-step-large, .highlight-item, .contact-form-container').forEach(el => {
    observer.observe(el);
});

// Performance optimization: Button hover feedback
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Typing Animation
const span = document.getElementById("cnt");
if (span) {
    const words = ["Intelligence", "Impact"];
    let wordIndex = 0;
    let charIndex = 0;
    let typing = true;

    function type() {
        const word = words[wordIndex];

        if (typing) {
            span.textContent = word.slice(0, ++charIndex);

            if (charIndex === word.length) {
                typing = false;
                return setTimeout(type, 1200); 
            }
        } else {
            span.textContent = word.slice(0, --charIndex);

            if (charIndex === 0) {
                typing = true;
                wordIndex = (wordIndex + 1) % words.length;
                return setTimeout(type, 500); 
            }
        }

        setTimeout(type, typing ? 120 : 80);
    }

    type();
}

// ============================================
// HERO PARTICLES ANIMATION
// ============================================
const initHeroParticles = () => {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 50;
    const hero = document.querySelector('.hero');

    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 2 + 0.5;
            this.alpha = Math.random() * 0.5 + 0.1;
            this.pulseSpeed = Math.random() * 0.01 + 0.005;
            this.pulseDir = Math.random() > 0.5 ? 1 : -1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

            // Pulsing effect
            this.alpha += this.pulseSpeed * this.pulseDir;
            if (this.alpha > 0.7 || this.alpha < 0.1) {
                this.pulseDir *= -1;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            
            // Create glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#3B82F6';
            ctx.fillStyle = `rgba(59, 130, 246, ${this.alpha})`;
            ctx.fill();
            
            // Draw a slightly larger outer glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${this.alpha * 0.3})`;
            ctx.fill();
        }
    }

    const resize = () => {
        const parent = canvas.parentElement;
        if (!parent) return;
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        
        // Re-initialize particles on major resize to avoid empty gaps
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Reset properties that might affect performance/look
        ctx.shadowBlur = 0; 
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();
};

// Initialize particles when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroParticles);
} else {
    initHeroParticles();
}
