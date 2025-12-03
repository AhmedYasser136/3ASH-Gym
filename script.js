// Interactive JavaScript for 3ASH Gym Website

// Language Management
let currentLanguage = localStorage.getItem('language') || 'en';

// Function to toggle language
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    localStorage.setItem('language', currentLanguage);
    updateLanguage();
}

// Function to update all text based on current language
function updateLanguage() {
    const html = document.documentElement;
    const langToggleBtn = document.querySelector('.lang-text');

    // Update HTML attributes
    html.setAttribute('lang', currentLanguage);
    html.setAttribute('dir', currentLanguage === 'ar' ? 'rtl' : 'ltr');

    // Update toggle button text
    if (langToggleBtn) {
        langToggleBtn.textContent = currentLanguage === 'en' ? '' : '';
    }

    // Update all elements with data-en and data-ar attributes
    const elements = document.querySelectorAll('[data-en][data-ar]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
            // For HTML content (like &copy;)
            if (text.includes('&')) {
                element.innerHTML = text;
            } else {
                element.textContent = text;
            }
        }
    });

    // Update "Today" badge if exists
    updateTodayBadge();
}

// Function to update "Today" badge based on language
function updateTodayBadge() {
    const todayBadge = document.querySelector('.today-badge');
    if (todayBadge) {
        todayBadge.textContent = currentLanguage === 'ar' ? 'اليوم' : 'TODAY';
    }
}

// Function to open WhatsApp chat
function openWhatsApp(phoneNumber, event) {
    // Remove spaces and format the phone number
    const cleanNumber = phoneNumber.replace(/\s+/g, '');

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${cleanNumber}`;

    // Open in new tab
    window.open(whatsappURL, '_blank');

    // Add visual feedback
    if (event && event.currentTarget) {
        const clickedCard = event.currentTarget;
        clickedCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            clickedCard.style.transform = '';
        }, 200);
    }
}

// Function to open Facebook page
function openFacebook(event) {
    const facebookURL = 'https://www.facebook.com/3ashGym';

    // Open in new tab
    window.open(facebookURL, '_blank');

    // Add visual feedback
    if (event && event.currentTarget) {
        const clickedCard = event.currentTarget;
        clickedCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            clickedCard.style.transform = '';
        }, 200);
    }
}

// Smooth scroll functionality for internal links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language on page load
    updateLanguage();

    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add entrance animations when elements come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Display current day highlight
    highlightCurrentDay();

    // Add hover sound effect simulation (visual feedback)
    addCardInteractions();
});

// Function to highlight current day
function highlightCurrentDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];

    const dayCards = document.querySelectorAll('.day-card');

    dayCards.forEach(card => {
        const dayHeading = card.querySelector('h3');
        const dayNameEn = dayHeading.getAttribute('data-en');

        // Check if this is today's card
        if (dayNameEn === today) {
            card.style.border = '3px solid var(--primary-color)';
            card.style.boxShadow = '0 8px 16px rgba(255, 107, 53, 0.3)';

            // Check if badge already exists
            let badge = card.querySelector('.today-badge');
            if (!badge) {
                // Add a "Today" badge
                badge = document.createElement('span');
                badge.className = 'today-badge';
                badge.style.cssText = `
                    display: inline-block;
                    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
                    color: white;
                    padding: 4px 12px;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: bold;
                    margin-top: 8px;
                    letter-spacing: 1px;
                `;
                card.appendChild(badge);
            }
            // Update badge text based on current language
            badge.textContent = currentLanguage === 'ar' ? 'اليوم' : 'TODAY';
        }
    });
}

// Add interactive feedback to cards
function addCardInteractions() {
    const interactiveCards = document.querySelectorAll('.contact-card, .day-card');

    interactiveCards.forEach(card => {
        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 107, 53, 0.5);
                width: 100px;
                height: 100px;
                margin-top: -50px;
                margin-left: -50px;
                animation: ripple 0.6s;
                pointer-events: none;
            `;

            const rect = card.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';

            card.style.position = 'relative';
            card.style.overflow = 'hidden';
            card.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(style);

// Check if user is on mobile and optimize accordingly
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Add mobile-specific enhancements
if (isMobileDevice()) {
    // Make phone numbers more prominent on mobile
    const phoneNumbers = document.querySelectorAll('.phone');
    phoneNumbers.forEach(phone => {
        phone.style.fontSize = '1.3rem';
    });

    // Add haptic feedback simulation
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });

        card.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
}

// Website loaded successfully - all interactive features enabled