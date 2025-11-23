// ============================================
// Shiva Temple Website - Main JavaScript
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.getElementById('calendar-container');

    // Make sure the container exists on the page before adding a listener
    if (calendarContainer) {
        
        const loadCalendarContent = (month, year) => {
            // Show a loading message
            calendarContainer.innerHTML = '<p class="text-center text-deep_maroon font-semibold py-8">Loading events...</p>';

            fetch(`calendar-loader.php?month=${month}&year=${year}`)
                .then(response => {
                    if (!response.ok) throw new Error('Network error');
                    return response.text();
                })
                .then(html => {
                    calendarContainer.innerHTML = html;
                    // Redraw icons in the newly loaded content
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                })
                .catch(error => {
                    calendarContainer.innerHTML = '<p class="text-center text-red-600 py-8">Failed to load events. Please try again.</p>';
                    console.error('Error fetching calendar data:', error);
                });
        };

        // Use event delegation to handle clicks
        calendarContainer.addEventListener('click', (event) => {
            const navButton = event.target.closest('.month-nav-btn');
            if (navButton) {
                const month = navButton.dataset.month;
                const year = navButton.dataset.year;
                loadCalendarContent(month, year);
            }
        });
    }
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href').substring(1);
        if (linkHref === current) {
            link.classList.add('active');
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        // For now, we'll just show an alert
        alert('Thank you for your message! We will get back to you soon.\n\n' +
              'Name: ' + formData.name + '\n' +
              'Email: ' + formData.email + '\n' +
              'Message: ' + formData.message);
        
        // Reset form
        contactForm.reset();
    });
}

// Donation Button Click Handler
const donationButtons = document.querySelectorAll('.donation-btn');

donationButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Thank you for your interest in donating! Please contact the temple directly for donation options.\n\n' +
              'You can find contact information in the Contact section or visit the temple during temple hours.');
        
        // Scroll to contact section
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = contactSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Fade-in Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in effect
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Photo Gallery Lightbox (if images are added later)
const photoItems = document.querySelectorAll('.photo-item');

photoItems.forEach(item => {
    item.addEventListener('click', () => {
        // This can be expanded to show a lightbox when actual images are added
        console.log('Photo clicked - ready for lightbox implementation');
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link based on current scroll position
    const scrollPosition = window.pageYOffset;
    if (scrollPosition < 100) {
        navLinks[0].classList.add('active');
    }
    
    // Add fade-in to welcome section immediately
    const welcomeSection = document.querySelector('#welcome');
    if (welcomeSection) {
        setTimeout(() => {
            welcomeSection.style.opacity = '1';
            welcomeSection.style.transform = 'translateY(0)';
        }, 100);
    }
});

