// GSAP Enhanced Portfolio Website Animations

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Initialize GSAP animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Fallback: Ensure all elements are visible by default
    const skillCards = document.querySelectorAll('.skill-card');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const contactItems = document.querySelectorAll('.contact-item');
    const sectionTitles = document.querySelectorAll('.section-title');
    
    skillCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
    });
    
    portfolioCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
    
    contactItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0) scale(1)';
    });
    
    sectionTitles.forEach(title => {
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
    });
    
    // Fallback: Ensure hero content is visible by default
    const heroElements = document.querySelectorAll('.hero-badge, .title-line, .hero-subtitle, .hero-description, .hero-buttons, .hero-stats, .profile-image, .floating-icon');
    heroElements.forEach(element => {
        if (element) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        }
    });
    
    // Set initial states for GSAP animations
    gsap.set(".title-line", { opacity: 0, y: 50 });
    gsap.set(".hero-subtitle", { opacity: 0, y: 30 });
    gsap.set(".hero-description", { opacity: 0, y: 30 });
    gsap.set(".hero-buttons", { opacity: 0, y: 30 });
    gsap.set(".hero-stats", { opacity: 0, y: 30 });
    gsap.set(".profile-image", { opacity: 0, scale: 0.5 });
    gsap.set(".floating-icon", { opacity: 0, scale: 0 });
    gsap.set(".hero-badge", { opacity: 0, scale: 0.8 });
    
    // Set initial states for sections (make sure they're visible by default)
    gsap.set(".skill-card", { opacity: 1, y: 0, scale: 1 });
    gsap.set(".portfolio-card", { opacity: 1, y: 0, scale: 1 });
    gsap.set(".contact-item", { opacity: 1, y: 0, scale: 1 });
    gsap.set(".section-title", { opacity: 1, y: 0 });
    
    // Create master timeline for hero section
    const heroTimeline = gsap.timeline({ delay: 0.5 });
    
    // Hero section animations
    heroTimeline
        .to(".hero-badge", { 
            duration: 0.8, 
            opacity: 1, 
            scale: 1, 
            ease: "back.out(1.7)" 
        })
        .to(".title-line", { 
            duration: 1, 
            opacity: 1, 
            y: 0, 
            stagger: 0.2, 
            ease: "power3.out" 
        }, "-=0.4")
        .to(".hero-subtitle", { 
            duration: 0.8, 
            opacity: 1, 
            y: 0, 
            ease: "power2.out" 
        }, "-=0.6")
        .to(".hero-description", { 
            duration: 0.8, 
            opacity: 1, 
            y: 0, 
            ease: "power2.out" 
        }, "-=0.4")
        .to(".hero-buttons", { 
            duration: 0.8, 
            opacity: 1, 
            y: 0, 
            ease: "power2.out" 
        }, "-=0.4")
        .to(".hero-stats", { 
            duration: 0.8, 
            opacity: 1, 
            y: 0, 
            ease: "power2.out" 
        }, "-=0.4")
        .to(".profile-image", { 
            duration: 1.2, 
            opacity: 1, 
            scale: 1, 
            ease: "back.out(1.7)" 
        }, "-=1")
        .to(".floating-icon", { 
            duration: 0.6, 
            opacity: 1, 
            scale: 1, 
            stagger: 0.1, 
            ease: "back.out(1.7)" 
        }, "-=0.8");
    
    // Floating icons continuous animation
    gsap.to(".floating-icon", {
        duration: 3,
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-15, 15)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
    });
    
    // Profile ring rotation
    gsap.to(".profile-ring", {
        duration: 20,
        rotation: 360,
        repeat: -1,
        ease: "none"
    });
    
    gsap.to(".profile-ring::before", {
        duration: 15,
        rotation: -360,
        repeat: -1,
        ease: "none"
    });
    
    // Hero background animations
    gsap.to(".hero-particles", {
        duration: 30,
        x: 150,
        y: 150,
        repeat: -1,
        ease: "none"
    });
    
    gsap.to(".hero-grid", {
        duration: 20,
        x: 50,
        y: 50,
        repeat: -1,
        ease: "none"
    });
    
    // Header floating shapes animation
    gsap.to(".shape", {
        duration: 6,
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        rotation: "random(-180, 180)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
    });
    
    // Header particles animation
    gsap.to(".particles", {
        duration: 20,
        x: 200,
        repeat: -1,
        ease: "none"
    });
    
    // Navigation animations
    gsap.from(".navbar", {
        duration: 1,
        y: -100,
        ease: "power3.out"
    });
    
    gsap.from(".nav-link", {
        duration: 0.8,
        y: -30,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5
    });
    
    // Brand animation
    gsap.from(".brand-text", {
        duration: 1,
        scale: 0,
        rotation: 180,
        ease: "back.out(1.7)",
        delay: 0.3
    });
    
    // Enhanced scroll-triggered animations for sections
    gsap.utils.toArray("section").forEach((section, index) => {
        if (section.id !== "home") {
            // Section entrance animation
            gsap.fromTo(section, 
                { opacity: 0, y: 100, scale: 0.95 },
                {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse",
                        scrub: 1
                    },
                    duration: 1.5,
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    ease: "power3.out"
                }
            );
            
            // Section background animation
            gsap.fromTo(section, 
                { backgroundPosition: "0% 0%" },
                {
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 2
                    },
                    backgroundPosition: "0% 100%",
                    ease: "none"
                }
            );
        }
    });
    
    // Skills section animations
    gsap.fromTo(".skill-card", 
        { opacity: 0, y: 100, scale: 0.5, rotation: -10 },
        {
            scrollTrigger: {
                trigger: "#skills",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            duration: 1.2,
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            stagger: {
                amount: 0.8,
                from: "start"
            },
            ease: "back.out(1.7)"
        }
    );
    
    // Skills category titles animation
    gsap.fromTo(".skill-category", 
        { opacity: 0, x: -50, scale: 0.8 },
        {
            scrollTrigger: {
                trigger: ".skill-category",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            duration: 1,
            opacity: 1,
            x: 0,
            scale: 1,
            stagger: 0.3,
            ease: "power3.out"
        }
    );
    
    // Skills icons animation
    gsap.fromTo(".skill-card i", 
        { opacity: 0, scale: 0, rotation: 180 },
        {
            scrollTrigger: {
                trigger: "#skills",
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            duration: 1,
            opacity: 1,
            scale: 1,
            rotation: 0,
            stagger: 0.15,
            ease: "elastic.out(1, 0.3)"
        }
    );
    
    // Contact section animations
    gsap.fromTo(".contact-item", 
        { opacity: 0, y: 50, scale: 0.8, rotation: -5 },
        {
            scrollTrigger: {
                trigger: "#contact",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            duration: 1,
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }
    );
    
    // Contact form container animation
    gsap.fromTo(".contact-form-container", 
        { opacity: 0, x: -100, scale: 0.9 },
        {
            scrollTrigger: {
                trigger: "#contact",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            duration: 1.2,
            opacity: 1,
            x: 0,
            scale: 1,
            ease: "power3.out"
        }
    );
    
    // Contact info container animation
    gsap.fromTo(".contact-info", 
        { opacity: 0, x: 100, scale: 0.9 },
        {
            scrollTrigger: {
                trigger: "#contact",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            duration: 1.2,
            opacity: 1,
            x: 0,
            scale: 1,
            ease: "power3.out"
        }
    );
    
    // Form fields animation
    gsap.fromTo(".contact-form .form-group", 
        { opacity: 0, y: 30, scale: 0.95 },
        {
            scrollTrigger: {
                trigger: ".contact-form-container",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            duration: 0.8,
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            ease: "power2.out"
        }
    );
    
    // Submit button animation
    gsap.fromTo(".contact-submit-btn", 
        { opacity: 0, y: 50, scale: 0.8 },
        {
            scrollTrigger: {
                trigger: ".contact-form-container",
                start: "top 75%",
                toggleActions: "play none none reverse"
            },
            duration: 1,
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)"
        }
    );
    
    // Social links animation
    gsap.fromTo(".social-link", 
        { opacity: 0, scale: 0, rotation: 180 },
        {
            scrollTrigger: {
                trigger: ".social-section",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            duration: 0.8,
            opacity: 1,
            scale: 1,
            rotation: 0,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }
    );
    
    // Section titles animation
    gsap.fromTo(".section-title", 
        { opacity: 0, y: 50 },
        {
            scrollTrigger: {
                trigger: ".section-title",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            duration: 1,
            opacity: 1,
            y: 0,
            ease: "power3.out"
        }
    );
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    ScrollTrigger.create({
        start: "top -50",
        end: 99999,
        toggleClass: {className: "navbar-scrolled", targets: navbar}
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onEnter: () => updateActiveNav(section.getAttribute('id')),
            onEnterBack: () => updateActiveNav(section.getAttribute('id'))
        });
    });
    
    function updateActiveNav(id) {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
            }
        });
    }
    
    // Enhanced skill card hover animations with GSAP
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.4,
                y: -15,
                scale: 1.08,
                rotation: 2,
                boxShadow: "0 20px 40px rgba(0, 245, 255, 0.2)",
                ease: "power2.out"
            });
            
            gsap.to(this.querySelector('i'), {
                duration: 0.4,
                scale: 1.3,
                rotation: 10,
                color: "#00f5ff",
                ease: "back.out(1.7)"
            });
            
            gsap.to(this.querySelector('h5'), {
                duration: 0.3,
                color: "#00f5ff",
                textShadow: "0 0 10px rgba(0, 245, 255, 0.5)",
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.4,
                y: 0,
                scale: 1,
                rotation: 0,
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                ease: "power2.out"
            });
            
            gsap.to(this.querySelector('i'), {
                duration: 0.4,
                scale: 1,
                rotation: 0,
                color: "#007bff",
                ease: "power2.out"
            });
            
            gsap.to(this.querySelector('h5'), {
                duration: 0.3,
                color: "#343a40",
                textShadow: "none",
                ease: "power2.out"
            });
        });
    });
    
    // Button hover animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                y: -2,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                y: 0,
                ease: "power2.out"
            });
        });
    });
    
    // Social links hover animations
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.2,
                y: -5,
                rotation: 5,
                ease: "back.out(1.7)"
            });
        });
        
        link.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                y: 0,
                rotation: 0,
                ease: "power2.out"
            });
        });
    });
    
    // Contact items click to copy with animation
    const contactItems = document.querySelectorAll('.contact-item p');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = this.textContent;
                
                gsap.to(this, {
                    duration: 0.2,
                    scale: 0.95,
                    ease: "power2.out",
                    onComplete: () => {
                        this.textContent = 'Copied!';
                        this.style.color = '#28a745';
                        
                        gsap.to(this, {
                            duration: 0.2,
                            scale: 1,
                            ease: "back.out(1.7)"
                        });
                        
                        setTimeout(() => {
                            gsap.to(this, {
                                duration: 0.3,
                                scale: 1,
                                ease: "power2.out",
                                onComplete: () => {
                                    this.textContent = originalText;
                                    this.style.color = '';
                                }
                            });
                        }, 2000);
                    }
                });
            });
        });
        
        item.style.cursor = 'pointer';
        item.title = 'Click to copy';
    });
    
    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll-to-top button with GSAP
    ScrollTrigger.create({
        start: "top -300",
        end: 99999,
        onEnter: () => gsap.to(scrollToTopBtn, { duration: 0.3, opacity: 1, visibility: "visible" }),
        onLeaveBack: () => gsap.to(scrollToTopBtn, { duration: 0.3, opacity: 0, visibility: "hidden" })
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: 0 },
            ease: "power2.inOut"
        });
    });
    
    // Scroll to top button hover animation
    scrollToTopBtn.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1.1,
            backgroundColor: "#0056b3",
            ease: "power2.out"
        });
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1,
            backgroundColor: "var(--primary-color)",
            ease: "power2.out"
        });
    });
    
    // Mobile menu close on link click
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
    
    // Typing effect for hero title (optional enhancement)
    const nameText = document.querySelector('.name-text');
    if (nameText) {
        const originalText = nameText.textContent;
        nameText.textContent = '';
        
        gsap.to(nameText, {
            duration: 2,
            text: originalText,
            ease: "none",
            delay: 2
        });
    }
    
    // Parallax effect for hero section
    gsap.to(".hero-bg-animation", {
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1
        },
        y: -100,
        ease: "none"
    });
    
    // Brand dot pulsing animation
    gsap.to(".brand-dot", {
        duration: 1.5,
        scale: 1.3,
        opacity: 0.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    // Badge glow animation
    gsap.to(".badge-text", {
        duration: 2,
        textShadow: "0 0 20px var(--cyber-green), 0 0 30px var(--cyber-green)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        
        gsap.fromTo(stat, 
            { textContent: 0 },
            {
                textContent: numericValue,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Additional GSAP animations for enhanced interactivity
    
    // Continuous floating animation for skill icons
    gsap.to(".skill-card i", {
        duration: 3,
        y: "random(-10, 10)",
        rotation: "random(-5, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
            amount: 2,
            from: "random"
        }
    });
    
    // Form field focus animations
    const formInputs = document.querySelectorAll('.contact-form .form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.02,
                boxShadow: "0 0 20px rgba(0, 245, 255, 0.3)",
                ease: "power2.out"
            });
        });
        
        input.addEventListener('blur', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                boxShadow: "0 0 0 rgba(0, 245, 255, 0)",
                ease: "power2.out"
            });
        });
    });
    
    // Contact item continuous hover effect
    gsap.to(".contact-item", {
        duration: 4,
        y: "random(-5, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
    });
    
    // Social links continuous rotation
    gsap.to(".social-link", {
        duration: 8,
        rotation: 360,
        repeat: -1,
        ease: "none",
        stagger: 1
    });
    
    // Section title continuous glow effect
    gsap.to(".section-title", {
        duration: 3,
        textShadow: "0 0 20px rgba(0, 123, 255, 0.5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    // Advanced scroll-triggered animations
    
    // Parallax scrolling for hero background
    gsap.to(".hero-bg-animation", {
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1
        },
        y: -200,
        ease: "none"
    });
    
    // Parallax scrolling for floating shapes
    gsap.to(".floating-shapes .shape", {
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 2
        },
        y: (i) => -100 * (i + 1),
        rotation: 360,
        ease: "none",
        stagger: 0.2
    });
    
    // Scroll-triggered reveal for about section
    gsap.fromTo("#about .lead", 
        { opacity: 0, x: -100 },
        {
            scrollTrigger: {
                trigger: "#about",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            duration: 1.5,
            opacity: 1,
            x: 0,
            ease: "power3.out"
        }
    );
    
    gsap.fromTo("#about p", 
        { opacity: 0, x: 100 },
        {
            scrollTrigger: {
                trigger: "#about",
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            duration: 1.5,
            opacity: 1,
            x: 0,
            ease: "power3.out",
            delay: 0.3
        }
    );
    
    
    // Scroll-triggered progress bars for skills
    gsap.utils.toArray(".skill-card").forEach((card, index) => {
        gsap.fromTo(card, 
            { 
                opacity: 0, 
                scale: 0.5, 
                rotation: -45,
                transformOrigin: "center center"
            },
            {
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                },
                duration: 1.2,
                opacity: 1,
                scale: 1,
                rotation: 0,
                ease: "elastic.out(1, 0.3)",
                delay: index * 0.1
            }
        );
    });
    
    // Scroll-triggered contact form reveal
    gsap.fromTo(".contact-form-container", 
        { 
            opacity: 0, 
            x: -200, 
            rotationY: -45,
            transformOrigin: "left center"
        },
        {
            scrollTrigger: {
                trigger: "#contact",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            duration: 2,
            opacity: 1,
            x: 0,
            rotationY: 0,
            ease: "power3.out"
        }
    );
    
    gsap.fromTo(".contact-info", 
        { 
            opacity: 0, 
            x: 200, 
            rotationY: 45,
            transformOrigin: "right center"
        },
        {
            scrollTrigger: {
                trigger: "#contact",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            duration: 2,
            opacity: 1,
            x: 0,
            rotationY: 0,
            ease: "power3.out",
            delay: 0.3
        }
    );
    
    // Scroll-triggered text reveal animation
    gsap.utils.toArray(".section-title").forEach(title => {
        gsap.fromTo(title, 
            { 
                opacity: 0, 
                y: 100, 
                scale: 0.5,
                textShadow: "0 0 0 rgba(0, 123, 255, 0)"
            },
            {
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                duration: 1.5,
                opacity: 1,
                y: 0,
                scale: 1,
                textShadow: "0 0 30px rgba(0, 123, 255, 0.8)",
                ease: "back.out(1.7)"
            }
        );
    });
    
    // Scroll-triggered counter animation for stats
    gsap.utils.toArray(".stat-number").forEach(stat => {
        const finalValue = parseInt(stat.textContent.replace(/\D/g, ''));
        
        gsap.fromTo(stat, 
            { textContent: 0 },
            {
                textContent: finalValue,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Scroll-triggered navbar background change
    ScrollTrigger.create({
        start: "top -50",
        end: 99999,
        toggleClass: {className: "navbar-scrolled", targets: ".navbar"}
    });
    
    // Scroll-triggered progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    ScrollTrigger.create({
        start: "top top",
        end: "bottom bottom",
        onUpdate: self => {
            progressBar.style.width = `${self.progress * 100}%`;
        }
    });
    
    // Section background change on scroll
    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => section.classList.add('scroll-active'),
            onLeave: () => section.classList.remove('scroll-active'),
            onEnterBack: () => section.classList.add('scroll-active'),
            onLeaveBack: () => section.classList.remove('scroll-active')
        });
    });
    
    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();
    
    // Highlights carousel uses default Bootstrap transitions (GSAP disabled per request)

});

