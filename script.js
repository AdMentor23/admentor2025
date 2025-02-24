// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Cursor glow effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-glow');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Animated number counting
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target;
            const targetValue = parseInt(numberElement.dataset.value);
            animateNumber(numberElement, targetValue);
        }
    });
}, observerOptions);

document.querySelectorAll('.achievement-number').forEach(number => {
    observer.observe(number);
});

function animateNumber(element, target) {
    let current = 0;
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60 FPS

    function update() {
        current += step;
        if (current < target) {
            element.textContent = '$' + Math.floor(current).toLocaleString();
            requestAnimationFrame(update);
        } else {
            element.textContent = '$' + target.toLocaleString();
        }
    }

    update();
}

// Smooth scroll handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax effect for gradient sphere
window.addEventListener('scroll', () => {
    const sphere = document.querySelector('.gradient-sphere');
    const scrolled = window.pageYOffset;
    sphere.style.transform = `translateY(calc(-50% + ${scrolled * 0.5}px))`;
});

// Mobile Menu Toggle
const hamburger = document.createElement('div');
hamburger.classList.add('hamburger');
hamburger.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.glass-nav').appendChild(hamburger);

hamburger.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : 
        '<i class="fas fa-bars"></i>';
});

// Form handling
document.getElementById('leadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    try {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Add your form submission logic here
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        form.reset();
        submitBtn.textContent = 'Message Sent!';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
        
    } catch (error) {
        console.error('Error:', error);
        submitBtn.textContent = 'Error! Try Again';
        submitBtn.disabled = false;
    }
});

// Calendly integration
function openCalendly() {
    Calendly.initPopupWidget({
        url: 'https://calendly.com/your-calendly-url',
        color: '#00F5FF',
        textColor: '#FFFFFF',
        branding: true
    });
}

// Add smooth reveal on scroll for all interactive elements
const revealElements = document.querySelectorAll('.expertise-card, .achievement-card, .social-button');
const revealOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    revealOnScroll.observe(element);
});

// Scroll-based animations
const scrollElements = document.querySelectorAll('.service-card, .case-study-content');

const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
};

const displayScrollElement = element => {
    element.classList.add('scrolled');
};

const hideScrollElement = element => {
    element.classList.remove('scrolled');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    const viewProjectsBtn = document.getElementById('viewProjectsBtn');
    
    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'projects.html';
        });
    }

    // Keep other existing functionality
    // ... rest of your code ...
});

// Enhanced mouse interaction
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    const backgroundElements = document.querySelector('.background-elements');
    const icons = document.querySelectorAll('.bg-icon');

    // Smooth background rotation
    backgroundElements.style.transform = `rotateY(${mouseX * 20}deg) rotateX(${-mouseY * 20}deg)`;

    // Interactive icons
    icons.forEach((icon, index) => {
        const rect = icon.getBoundingClientRect();
        const iconX = rect.left + rect.width / 2;
        const iconY = rect.top + rect.height / 2;
        
        const distanceX = e.clientX - iconX;
        const distanceY = e.clientY - iconY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const maxDistance = 400;
        
        if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const moveX = (distanceX / distance) * force * -35;
            const moveY = (distanceY / distance) * force * -35;
            const moveZ = force * 150;
            const rotateY = moveX * 0.1;
            const rotateX = moveY * 0.1;
            
            icon.style.transform = `
                translate3d(${moveX}px, ${moveY}px, ${moveZ}px)
                rotateY(${rotateY}deg)
                rotateX(${rotateX}deg)
            `;
            icon.style.opacity = 0.2 + force * 0.3;
        }
    });
});

// Add floating animation to icons
document.querySelectorAll('.bg-icon').forEach((icon, index) => {
    icon.style.animation = `iconFloat ${12 + index * 2}s infinite ease-in-out ${index * 1.5}s`;
});

// Store default transforms and add floating animation
document.querySelectorAll('.bg-icon').forEach((icon, index) => {
    const depth = (index % 3 - 1) * 100;
    const defaultTransform = `translateZ(${depth}px)`;
    icon.dataset.defaultTransform = defaultTransform;
    icon.style.transform = defaultTransform;
    
    // Add subtle floating animation
    icon.style.animation = `float${index} ${10 + index * 2}s infinite ease-in-out`;
    
    // Create unique keyframe animation for each icon
    const keyframes = `
        @keyframes float${index} {
            0%, 100% {
                transform: ${defaultTransform} translate(0, 0);
            }
            50% {
                transform: ${defaultTransform} translate(${(index % 2 ? 20 : -20)}px, ${(index % 3 - 1) * 20}px);
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
});

// Add dynamic particles
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position in 3D space
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const z = Math.random() * 200 - 100;
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.transform = `translateZ(${z}px)`;
        
        // Random animation delay and duration
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${10 + Math.random() * 10}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on load
document.addEventListener('DOMContentLoaded', createParticles);

// Enhanced mouse interaction
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    const backgroundElements = document.querySelector('.background-elements');
    const dataPoints = document.querySelector('.data-points');
    const dataGrid = document.querySelector('.data-grid');
    const particles = document.querySelectorAll('.particle');

    // Parallax effect for different layers
    backgroundElements.style.transform = `rotateY(${mouseX * 15}deg) rotateX(${-mouseY * 15}deg)`;
    dataPoints.style.transform = `translate3d(${mouseX * 50}px, ${mouseY * 50}px, 0)`;
    dataGrid.style.transform = `translateZ(-200px) rotateX(60deg) translate(${mouseX * 25}px, ${mouseY * 25}px)`;

    // Move particles with cursor
    particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        const depth = parseFloat(particle.style.transform.match(/translateZ\(([-\d.]+)px\)/)?.[1] || 0);
        const depthFactor = (depth + 200) / 300; // Normalize depth to 0-1 range

        const dx = (e.clientX - rect.left) * depthFactor * 0.05;
        const dy = (e.clientY - rect.top) * depthFactor * 0.05;

        particle.style.transform = `translate3d(${dx}px, ${dy}px, ${depth}px)`;
    });
});

// Enhanced background effect
function initBackground() {
    const background = document.querySelector('.background-elements');
    
    // Create scanner line
    const scanner = document.createElement('div');
    scanner.className = 'scanner-line';
    background.appendChild(scanner);

    // Icon reveal on scan
    scanner.addEventListener('animationiteration', () => {
        document.querySelectorAll('.bg-icon').forEach((icon, index) => {
            setTimeout(() => {
                icon.style.animation = 'iconReveal 1.5s forwards';
            }, index * 200);
        });
    });

    // Mouse interaction with revealed icons
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        const icons = document.querySelectorAll('.bg-icon');
        icons.forEach((icon, index) => {
            const rect = icon.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            const distanceX = e.clientX - x;
            const distanceY = e.clientY - y;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            const maxDistance = 300;
            
            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                const moveX = (distanceX / distance) * force * -25;
                const moveY = (distanceY / distance) * force * -25;
                const moveZ = force * 100;
                
                icon.style.transform = `
                    translate3d(${moveX}px, ${moveY}px, ${moveZ}px)
                    scale(${1 + force * 0.2})
                `;
                icon.style.opacity = 0.15 + force * 0.25;
            } else {
                icon.style.transform = 'translate3d(0, 0, 50px) scale(1)';
                icon.style.opacity = 0.15;
            }
        });

        // Subtle background rotation
        background.style.transform = `
            rotateX(${-mouseY * 5}deg)
            rotateY(${mouseX * 5}deg)
        `;
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initBackground);

// Initialize dynamic background
function initDynamicBackground() {
    const background = document.querySelector('.background-elements');
    const gridLines = document.querySelector('.grid-lines');
    
    // Add multiple moving lines with continuous loop
    for (let i = 0; i < 5; i++) {
        const line = document.createElement('div');
        line.className = 'grid-line';
        line.style.top = `${20 + i * 20}%`;
        line.style.animationDelay = `${i * 1.5}s`;
        line.style.animationDuration = '8s';
        line.style.animationIterationCount = 'infinite';
        gridLines.appendChild(line);
    }

    // Create particles with continuous animation
    const particles = document.querySelector('.particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const z = Math.random() * 200 - 100;
        const delay = Math.random() * 5;
        const duration = 5 + Math.random() * 5;
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.transform = `translateZ(${z}px)`;
        particle.style.animation = `particleFloat ${duration}s ease-in-out ${delay}s infinite`;
        
        particles.appendChild(particle);
    }

    // Enhanced mouse interaction
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        background.style.transform = `
            rotateX(${-mouseY * 10}deg)
            rotateY(${mouseX * 10}deg)
            translateZ(-100px)
        `;

        particles.querySelectorAll('.particle').forEach(particle => {
            const rect = particle.getBoundingClientRect();
            const depth = parseFloat(particle.style.transform.match(/translateZ\(([-\d.]+)px\)/)?.[1] || 0);
            const depthFactor = (depth + 200) / 400;

            const dx = (e.clientX - rect.left) * depthFactor * 0.1;
            const dy = (e.clientY - rect.top) * depthFactor * 0.1;

            particle.style.transform = `translate3d(${dx}px, ${dy}px, ${depth}px)`;
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDynamicBackground);

function createDataParticles() {
    const container = document.querySelector('.background-elements');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'data-particle';
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration and delay
        const duration = 8 + Math.random() * 4;
        const delay = Math.random() * -10;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        container.appendChild(particle);
    }
}

// Initialize particles
document.addEventListener('DOMContentLoaded', () => {
    createDataParticles();
});

// Initialize background for projects page
document.addEventListener('DOMContentLoaded', () => {
    // Only run if we're on the projects page
    if (document.querySelector('.work-section')) {
        createDataParticles();
        initDynamicBackground();
    }
});

// FAQ Toggle with smooth animation
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        
        // Close other open FAQs
        document.querySelectorAll('.faq-item.active').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = '0';
            }
        });
        
        // Toggle current FAQ
        faqItem.classList.toggle('active');
        
        // Set max-height for smooth animation
        if (faqItem.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.opacity = '1';
        } else {
            answer.style.maxHeight = '0';
            answer.style.opacity = '0';
        }
    });
});

// Form submission handler
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show success popup
    showPopup({
        title: "Thank you!",
        message: "We'll be in touch shortly. Meanwhile, why not schedule a call?",
        calendlyLink: "https://calendly.com/your-calendly-link"
    });
    
    // Reset form
    this.reset();
});

// Popup function
function showPopup({ title, message, calendlyLink }) {
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h3>${title}</h3>
            <p>${message}</p>
            <a href="${calendlyLink}" class="cta-button" target="_blank">Schedule a Call</a>
            <button class="close-popup">Close</button>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Add close functionality
    popup.querySelector('.close-popup').onclick = () => popup.remove();
} 