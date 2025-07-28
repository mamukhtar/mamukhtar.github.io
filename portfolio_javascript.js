/* ============================================
   MARYAM'S PORTFOLIO - INTERACTIVE FUNCTIONALITY
   ============================================ */

/* ============================================
   1. NAVIGATION EFFECTS
   ============================================ */

// Add shadow to navigation bar when scrolling
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ============================================
   2. SCROLL ANIMATIONS
   ============================================ */

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

/* ============================================
   3. SKILL TAG INTERACTIONS
   ============================================ */

// Interactive skill tags that highlight related projects
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        // Remove active class from all tags
        document.querySelectorAll('.skill-tag').forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tag
        tag.classList.add('active');
        
        // Get related projects from data attribute
        const projects = tag.getAttribute('data-projects');
        if (projects) {
            const projectList = projects.split(',');
            
            // Hide all project cards first
            document.querySelectorAll('.project-card').forEach(card => {
                card.style.opacity = '0.3';
                card.style.transform = 'scale(0.95)';
            });
            
            // Show related project cards
            projectList.forEach(project => {
                const card = document.querySelector(`[data-project="${project}"]`);
                if (card) {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }
            });
            
            // Reset after 3 seconds
            setTimeout(() => {
                document.querySelectorAll('.project-card').forEach(card => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                });
                tag.classList.remove('active');
            }, 3000);
        }
    });
});

/* ============================================
   4. ANIMATED COUNTERS
   ============================================ */

// Enhanced counter animation function
function animateCounter(element, targetString) {
    let numericTarget;
    let formatType = '';
    
    // Parse different number formats
    if (targetString.includes('K')) {
        numericTarget = parseFloat(targetString) * 1000;
        formatType = 'K';
    } else if (targetString.includes('+')) {
        numericTarget = parseInt(targetString);
        formatType = '+';
    } else {
        numericTarget = parseInt(targetString);
    }
    
    let current = 0;
    const increment = numericTarget / 60;
    
    const timer = setInterval(() => {
        current += increment;
        
        // Format the display based on original format
        if (formatType === 'K') {
            element.textContent = (current / 1000).toFixed(1) + 'K';
        } else if (formatType === '+') {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current);
        }
        
        if (current >= numericTarget) {
            element.textContent = targetString;
            clearInterval(timer);
        }
    }, 50);
}

// Animate counters when book club stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = stat.getAttribute('data-target');
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Look for the correct element with class, not ID
const bookclubStats = document.querySelector('.bookclub-stats');
if (bookclubStats) {
    statsObserver.observe(bookclubStats);
}

/* ============================================
   6. UTILITY FUNCTIONS
   ============================================ */

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

/* ============================================
   7. PERFORMANCE OPTIMIZATIONS
   ============================================ */

// Optimize scroll event with throttling
const optimizedScrollHandler = throttle(() => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 100);

// Replace the original scroll event listener
window.removeEventListener('scroll', optimizedScrollHandler);
window.addEventListener('scroll', optimizedScrollHandler);

/* ============================================
   8. ACCESSIBILITY IMPROVEMENTS
   ============================================ */

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Add space bar support for skill tags
    if (e.code === 'Space' && e.target.classList.contains('skill-tag')) {
        e.preventDefault();
        e.target.click();
    }
    
    // Add enter key support for project cards
    if (e.code === 'Enter' && e.target.classList.contains('project-card')) {
        const link = e.target.querySelector('.project-link');
        if (link) {
            link.click();
        }
    }
});

// Add focus indicators for better accessibility
document.querySelectorAll('.skill-tag, .project-card').forEach(element => {
    element.setAttribute('tabindex', '0');
});

/* ============================================
   9. RESPONSIVE BEHAVIOR
   ============================================ */

// Handle mobile navigation (if you add a mobile menu later)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Add resize event listener for responsive adjustments
window.addEventListener('resize', debounce(() => {
    // Add any responsive behavior adjustments here
    console.log('Window resized');
}, 250));

/* ============================================
   10. INITIALIZATION
   ============================================ */

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized successfully! 🎉');
    
    // Add any initialization code here
    // For example, setting up tooltips, initializing libraries, etc.
});

// Initialize page after all resources are loaded
window.addEventListener('load', () => {
    console.log('All resources loaded! Ready to go! ✨');
    
    // Add any post-load initialization here
    // For example, starting animations, loading external content, etc.
});

/* ============================================
   11. ERROR HANDLING
   ============================================ */

// Global error handler for better debugging
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You can add error reporting here if needed
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // You can add error reporting here if needed
});
