// DOM Ready and Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeNavigation();
    initializeWhatsAppButtons();
    initializeScrollAnimations();
    initializeSmoothScrolling();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle (if needed for responsive design)
    const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
        });
    }
}

// WhatsApp button functionality
function initializeWhatsAppButtons() {
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            try {
                // Log the WhatsApp interaction for analytics
                console.log('WhatsApp CTA clicked:', this.textContent.trim());
                
                // Add a subtle animation feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Optional: Track the event for analytics
                trackWhatsAppClick(this);
                
            } catch (error) {
                console.error('Error handling WhatsApp CTA click:', error);
            }
        });
        
        // Add hover effect enhancement
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('service-card') || 
                    entry.target.classList.contains('advantage-card') || 
                    entry.target.classList.contains('plan-card')) {
                    
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .advantage-card, .plan-card, .section-header');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scrolling for internal links
function initializeSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                event.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Analytics tracking function
function trackWhatsAppClick(button) {
    try {
        const buttonText = button.textContent.trim();
        const section = button.closest('section')?.id || 'unknown';
        
        // Log for debugging
        console.log('WhatsApp click tracked:', {
            buttonText,
            section,
            timestamp: new Date().toISOString()
        });
        
        // Here you could integrate with analytics services like Google Analytics
        // gtag('event', 'whatsapp_click', {
        //     'button_text': buttonText,
        //     'section': section
        // });
        
    } catch (error) {
        console.error('Error tracking WhatsApp click:', error);
    }
}

// Utility function to detect mobile devices
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Enhanced WhatsApp link generation (if needed for dynamic content)
function generateWhatsAppLink(phoneNumber, message) {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

// Form validation (if contact forms are added later)
function validateForm(formElement) {
    const requiredFields = formElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

// Performance optimization: Lazy loading for images (if added)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error handling for external resources
window.addEventListener('error', function(event) {
    console.error('Resource loading error:', event.filename, event.lineno, event.message);
});

// Handle offline/online status
window.addEventListener('online', function() {
    console.log('Connection restored');
    // You could show a notification here
});

window.addEventListener('offline', function() {
    console.log('Connection lost');
    // You could show an offline notification here
});

// Keyboard navigation enhancement
document.addEventListener('keydown', function(event) {
    // Escape key to close any open modals or menus
    if (event.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        const activeMobileMenu = document.querySelector('.nav-links.active');
        
        if (activeModal) {
            activeModal.classList.remove('active');
        }
        
        if (activeMobileMenu) {
            activeMobileMenu.classList.remove('active');
        }
    }
});

// Preload critical resources
function preloadCriticalResources() {
    const criticalLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadCriticalResources();

// Export functions for potential external use
window.AIExpertSite = {
    trackWhatsAppClick,
    generateWhatsAppLink,
    validateForm,
    isMobileDevice
};
