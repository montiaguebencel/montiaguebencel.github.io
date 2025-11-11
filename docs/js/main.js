// Modern Portfolio JavaScript

// ===================================
// Typing Animation
// ===================================
const typingText = document.querySelector('.typing-text');
const titles = [
  'Software Engineer',
  'Full-Stack Developer',
  'DevOps Specialist',
  'CI/CD Expert',
  'Cloud Architect'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeTitle() {
  const currentTitle = titles[titleIndex];
  
  if (isDeleting) {
    typingText.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 150;
  }
  
  if (!isDeleting && charIndex === currentTitle.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    typingSpeed = 500; // Pause before new word
  }
  
  setTimeout(typeTitle, typingSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeTitle, 1000);
});

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function activateNavLink() {
  let scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', activateNavLink);

// ===================================
// Scroll Animations (Simple AOS Alternative)
// ===================================
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      
      // Animate skill bars
      if (entry.target.querySelector('.skill-progress')) {
        const progressBars = entry.target.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-progress') + '%';
          bar.dataset.targetWidth = targetWidth;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = bar.dataset.targetWidth;
          }, 200);
        });
      }
    }
  });
}, observerOptions);

// Apply animations to elements
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.section-header, .about-content, .about-stats-grid, ' +
    '.skill-category, .timeline-item, .service-card, ' +
    '.contact-info, .contact-form'
  );
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// ===================================
// Skill Progress Animation on Scroll
// ===================================
const skillsSection = document.querySelector('.skills-section');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !skillsAnimated) {
      const progressBars = document.querySelectorAll('.skill-progress');
      progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-progress') + '%';
        // Store the target width before setting to 0
        bar.dataset.targetWidth = targetWidth;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = bar.dataset.targetWidth;
        }, 200);
      });
      skillsAnimated = true;
    }
  });
}, { threshold: 0.3 });

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// ===================================
// Form Submission Handler
// ===================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // For demo purposes - in production, send to actual endpoint
    console.log('Form submitted:', data);
    
    // Show success message (you can customize this)
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
  });
}

// ===================================
// Counter Animation for Stats
// ===================================
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + (element.textContent.includes('%') ? '%' : '+');
    }
  }, 16);
}

// Animate stats on scroll
const statsSection = document.querySelector('.hero-stats');
let statsAnimated = false;

if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        const statNumbers = entry.target.querySelectorAll('.stat-item h3');
        statNumbers.forEach(stat => {
          const text = stat.textContent;
          const number = parseInt(text);
          if (!isNaN(number)) {
            stat.textContent = '0' + (text.includes('%') ? '%' : '+');
            animateCounter(stat, number);
          }
        });
        statsAnimated = true;
      }
    });
  }, { threshold: 0.5 });
  
  statsObserver.observe(statsSection);
}

// ===================================
// Parallax Effect for Hero Background
// ===================================
const heroBackground = document.querySelector('.hero-background');

if (heroBackground) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  });
}

// ===================================
// Mobile Menu Toggle
// ===================================
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler) {
  navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navbarCollapse && navbarCollapse.classList.contains('show')) {
    if (!e.target.closest('.navbar')) {
      navbarCollapse.classList.remove('show');
    }
  }
});

// ===================================
// Preloader (Optional)
// ===================================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ===================================
// Add loading animation to buttons
// ===================================
const buttons = document.querySelectorAll('.btn-primary, .btn-outline');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    // Add ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple CSS
const style = document.createElement('style');
style.textContent = `
  .btn-primary, .btn-outline {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===================================
// Console Message
// ===================================
console.log('%c👋 Hello Developer!', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
console.log('%cLike what you see? Let\'s connect!', 'color: #aaa6c3; font-size: 14px;');
console.log('%cGitHub: https://github.com/montiaguebencel', 'color: #00d9ff; font-size: 12px;');
