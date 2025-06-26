// Nashville Bourbon Co. - Interactive JavaScript

class NashvilleBourbon {
    constructor() {
        this.scrollY = 0;
        this.ticking = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setup3DBottle();
        this.setupNavigation();
        this.setupHeroAnimations();
        this.setupProductCards();
        this.setupTimeline();
        this.setupParallax();
        
        // Initial load animations
        this.animateOnLoad();
    }

    setupEventListeners() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('load', this.handleLoad.bind(this));
        
        // Smooth scrolling for nav links
        document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
            link.addEventListener('click', this.smoothScroll.bind(this));
        });
    }

    handleScroll() {
        this.scrollY = window.pageYOffset;
        if (!this.ticking) {
            requestAnimationFrame(this.updateScrollAnimations.bind(this));
            this.ticking = true;
        }
    }

    updateScrollAnimations() {
        this.updateNavbar();
        this.update3DBottle();
        this.updateParallax();
        this.updateScrollReveal();
        this.ticking = false;
    }

    // Navigation
    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        // Mobile menu toggle
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
    }

    updateNavbar() {
        const navbar = document.querySelector('.navbar');
        if (this.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // 3D Bottle Animation
    setup3DBottle() {
        this.bottle = document.getElementById('bottle3d');
        this.bottleContainer = document.querySelector('.bottle-container');
        
        if (this.bottle) {
            // Add mouse interaction
            this.bottleContainer.addEventListener('mousemove', this.handleBottleMouseMove.bind(this));
            this.bottleContainer.addEventListener('mouseleave', this.handleBottleMouseLeave.bind(this));
        }
    }

    update3DBottle() {
        if (!this.bottle) return;
        
        const heroHeight = document.querySelector('.hero').offsetHeight;
        const scrollProgress = Math.min(this.scrollY / heroHeight, 1);
        
        // Rotate bottle based on scroll
        const rotationY = 15 + (scrollProgress * 345); // Full rotation
        const rotationX = 5 + (scrollProgress * 10);
        const scale = 1 + (scrollProgress * 0.2);
        
        this.bottle.style.transform = `
            translate(-50%, -50%) 
            rotateY(${rotationY}deg) 
            rotateX(${rotationX}deg) 
            scale(${scale})
        `;
        
        // Add glow effect
        const glowIntensity = scrollProgress * 0.5;
        this.bottle.style.filter = `drop-shadow(0 0 ${20 + glowIntensity * 30}px rgba(212, 165, 116, ${0.4 + glowIntensity}))`;
    }

    handleBottleMouseMove(e) {
        if (!this.bottle) return;
        
        const rect = this.bottleContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const rotateX = (mouseY / rect.height) * -10;
        const rotateY = (mouseX / rect.width) * 10;
        
        this.bottle.style.transform = `
            translate(-50%, -50%) 
            rotateY(${15 + rotateY}deg) 
            rotateX(${5 + rotateX}deg)
            scale(1.05)
        `;
    }

    handleBottleMouseLeave() {
        if (!this.bottle) return;
        
        this.bottle.style.transform = `
            translate(-50%, -50%) 
            rotateY(15deg) 
            rotateX(5deg)
            scale(1)
        `;
    }

    // Hero Animations
    setupHeroAnimations() {
        const heroParticles = document.querySelector('.hero-particles');
        if (heroParticles) {
            this.createFloatingParticles();
        }
        
        // CTA button animations
        const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', this.animateButton.bind(this));
        });
    }

    createFloatingParticles() {
        const heroBackground = document.querySelector('.hero-background');
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(212, 165, 116, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 10 + 10}s infinite linear;
                z-index: 1;
            `;
            heroBackground.appendChild(particle);
        }
        
        // Add CSS animation
        if (!document.getElementById('particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes floatParticle {
                    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    animateButton(e) {
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Add ripple animation if not exists
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to { transform: scale(2); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Product Cards
    setupProductCards() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            card.addEventListener('mouseenter', this.animateProductCard.bind(this));
            card.addEventListener('mouseleave', this.resetProductCard.bind(this));
        });
    }

    animateProductCard(e) {
        const card = e.currentTarget;
        const bottle = card.querySelector('.product-bottle');
        const glow = card.querySelector('.product-glow');
        
        if (bottle) {
            bottle.style.transform = 'rotateY(15deg) scale(1.1)';
        }
        
        if (glow) {
            glow.style.opacity = '1';
            glow.style.transform = 'translate(-50%, -50%) scale(1.3)';
        }
        
        // Add floating animation
        card.style.transform = 'translateY(-15px) scale(1.02)';
    }

    resetProductCard(e) {
        const card = e.currentTarget;
        const bottle = card.querySelector('.product-bottle');
        const glow = card.querySelector('.product-glow');
        
        if (bottle) {
            bottle.style.transform = 'rotateY(0deg) scale(1)';
        }
        
        if (glow) {
            glow.style.opacity = '0';
            glow.style.transform = 'translate(-50%, -50%) scale(1)';
        }
        
        card.style.transform = 'translateY(0) scale(1)';
    }

    // Timeline Animation
    setupTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        // Animate timeline items on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.5 });
        
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            item.style.transition = `all 0.6s ease ${index * 0.2}s`;
            observer.observe(item);
        });
    }

    // Parallax Effects
    setupParallax() {
        this.parallaxElements = document.querySelectorAll('[data-parallax]');
    }

    updateParallax() {
        this.parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(this.scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Scroll Reveal Animation
    updateScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    // Smooth Scrolling
    smoothScroll(e) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Copper Still Animation
    setupCopperStill() {
        const copperStill = document.querySelector('.copper-still');
        if (copperStill) {
            // Add subtle rotation animation
            copperStill.style.animation = 'stillRotate 20s infinite linear';
            
            // Add CSS animation
            if (!document.getElementById('still-styles')) {
                const style = document.createElement('style');
                style.id = 'still-styles';
                style.textContent = `
                    @keyframes stillRotate {
                        0% { transform: translate(-50%, -50%) rotateY(0deg); }
                        100% { transform: translate(-50%, -50%) rotateY(5deg); }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }

    // Load Animations
    animateOnLoad() {
        // Animate hero elements
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroCta = document.querySelector('.hero-cta');
        
        if (heroTitle) {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(30px)';
            setTimeout(() => {
                heroTitle.style.transition = 'all 0.8s ease';
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 300);
        }
        
        if (heroSubtitle) {
            heroSubtitle.style.opacity = '0';
            heroSubtitle.style.transform = 'translateY(20px)';
            setTimeout(() => {
                heroSubtitle.style.transition = 'all 0.8s ease';
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }, 600);
        }
        
        if (heroCta) {
            heroCta.style.opacity = '0';
            heroCta.style.transform = 'translateY(20px)';
            setTimeout(() => {
                heroCta.style.transition = 'all 0.8s ease';
                heroCta.style.opacity = '1';
                heroCta.style.transform = 'translateY(0)';
            }, 900);
        }
        
        // Setup copper still animation
        this.setupCopperStill();
    }

    handleLoad() {
        // Add loaded class to body
        document.body.classList.add('loaded');
        
        // Initialize reveal elements
        const elements = document.querySelectorAll('.section-title, .section-description, .stat, .process-step');
        elements.forEach(element => {
            element.classList.add('reveal');
        });
    }

    handleResize() {
        // Recalculate dimensions on resize
        this.update3DBottle();
    }
}

// Enhanced Scroll Experience
class SmoothScroll {
    constructor() {
        this.current = 0;
        this.target = 0;
        this.ease = 0.05;
        this.speed = 0;
        this.init();
    }

    init() {
        document.body.style.height = document.body.scrollHeight + 'px';
        this.update();
    }

    update() {
        this.target = window.scrollY;
        this.current += (this.target - this.current) * this.ease;
        this.speed = this.target - this.current;
        
        // Apply transform to create smooth scrolling effect
        document.querySelector('main').style.transform = `translateY(${-this.current}px)`;
        
        requestAnimationFrame(this.update.bind(this));
    }
}

// Particle System for Enhanced Visuals
class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.particles = [];
        this.options = {
            count: options.count || 50,
            size: options.size || { min: 1, max: 3 },
            speed: options.speed || { min: 0.5, max: 2 },
            opacity: options.opacity || { min: 0.1, max: 0.6 },
            color: options.color || 'rgba(212, 165, 116, 0.5)'
        };
        this.init();
    }

    init() {
        for (let i = 0; i < this.options.count; i++) {
            this.createParticle();
        }
        this.animate();
    }

    createParticle() {
        const particle = {
            x: Math.random() * this.container.offsetWidth,
            y: Math.random() * this.container.offsetHeight,
            size: Math.random() * (this.options.size.max - this.options.size.min) + this.options.size.min,
            speedX: (Math.random() - 0.5) * 2 * this.options.speed.max,
            speedY: Math.random() * this.options.speed.max + this.options.speed.min,
            opacity: Math.random() * (this.options.opacity.max - this.options.opacity.min) + this.options.opacity.min,
            element: this.createElement()
        };
        
        this.particles.push(particle);
        this.container.appendChild(particle.element);
    }

    createElement() {
        const element = document.createElement('div');
        element.style.cssText = `
            position: absolute;
            background: ${this.options.color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
        `;
        return element;
    }

    animate() {
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y -= particle.speedY;
            
            // Reset particle when it goes off screen
            if (particle.y < -10) {
                particle.y = this.container.offsetHeight + 10;
                particle.x = Math.random() * this.container.offsetWidth;
            }
            
            // Update element position and style
            particle.element.style.cssText += `
                left: ${particle.x}px;
                top: ${particle.y}px;
                width: ${particle.size}px;
                height: ${particle.size}px;
                opacity: ${particle.opacity};
            `;
        });
        
        requestAnimationFrame(this.animate.bind(this));
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NashvilleBourbon();
    
    // Add particle system to hero section
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        new ParticleSystem(heroBackground, {
            count: 30,
            size: { min: 1, max: 4 },
            speed: { min: 0.3, max: 1.5 },
            opacity: { min: 0.1, max: 0.4 },
            color: 'rgba(212, 165, 116, 0.3)'
        });
    }
});

// Add CSS for smooth animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .reveal.active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .loaded .hero-title .title-line {
        animation: titleReveal 1.2s ease forwards;
    }
    
    .loaded .hero-title .title-line:nth-child(2) {
        animation-delay: 0.3s;
    }
    
    @keyframes titleReveal {
        0% {
            opacity: 0;
            transform: translateY(100px) rotateX(90deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
        }
    }
    
    .product-card {
        transform-style: preserve-3d;
    }
    
    .bottle-3d {
        transform-style: preserve-3d;
        will-change: transform;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

document.head.appendChild(dynamicStyles);