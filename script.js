// Import AOS library from CDN in HTML
document.addEventListener("DOMContentLoaded", function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: false,
        mirror: true
    });
    
    // Enhanced parallax effect for cover section
    const parallaxCover = document.querySelector('.parallax-cover');
    const coverContent = document.querySelector('.cover-content');
    const logo = document.querySelector('.logo');
    
    window.addEventListener('scroll', function() {
        let scrollPosition = window.pageYOffset;
        let opacity = 1 - (scrollPosition * 2 / window.innerHeight);
        let scale = 1 - (scrollPosition * 0.0005);
        
        // Parallax effect on cover background
        parallaxCover.style.backgroundPositionY = scrollPosition * 0.7 + 'px';
        
        // Scale and fade effect on cover content
        if (opacity > 0) {
            coverContent.style.opacity = opacity;
            coverContent.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            logo.style.transform = `scale(${scale}) rotate(${scrollPosition * 0.05}deg)`;
        }
        
        // Smooth scroll functionality
        document.querySelector('.scroll-hint').addEventListener('click', function() {
            const teamSection = document.querySelector('.team');
            teamSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Enhance image hover effects
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.1)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });
    
    // Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '4px';
    progressBar.style.backgroundColor = '#3498db';
    progressBar.style.zIndex = '9999';
    progressBar.style.width = '0%';
    progressBar.style.transition = 'width 0.2s ease';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalScroll) * 100;
        progressBar.style.width = progress + '%';
    });
    
    // Add custom animation for section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease forwards';
            }
        });
    }, { threshold: 0.2 });
    
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
    
    // Particles effect for the cover section
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                resize: true
            }
        },
        retina_detect: true
    });
});

// JavaScript function to handle image loading and transitions
function handleImageLoad() {
    const images = document.querySelectorAll('.team-member img, .teacher img');
    
    images.forEach(img => {
        // Create placeholder before image loads
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.style.backgroundColor = '#f0f0f0';
        placeholder.style.width = '100%';
        placeholder.style.height = '100%';
        placeholder.style.position = 'absolute';
        placeholder.style.top = '0';
        placeholder.style.left = '0';
        placeholder.style.borderRadius = '10px';
        
        // Add loading animation
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'loading-spinner';
        loadingSpinner.style.border = '5px solid rgba(0, 0, 0, 0.1)';
        loadingSpinner.style.borderTopColor = '#3498db';
        loadingSpinner.style.borderRadius = '50%';
        loadingSpinner.style.width = '30px';
        loadingSpinner.style.height = '30px';
        loadingSpinner.style.animation = 'spin 1s linear infinite';
        loadingSpinner.style.position = 'absolute';
        loadingSpinner.style.top = '50%';
        loadingSpinner.style.left = '50%';
        loadingSpinner.style.transform = 'translate(-50%, -50%)';
        
        placeholder.appendChild(loadingSpinner);
        
        // Add placeholder before the image
        img.parentNode.insertBefore(placeholder, img);
        
        // Create keyframe animation for spinner
        if (!document.querySelector('#spinner-keyframes')) {
            const style = document.createElement('style');
            style.id = 'spinner-keyframes';
            style.textContent = `
                @keyframes spin {
                    0% { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove placeholder when image loads
        img.onload = function() {
            placeholder.style.opacity = '0';
            setTimeout(() => {
                placeholder.remove();
            }, 300);
        };
        
        // Add fade-in effect for images
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        img.onload = function() {
            placeholder.style.opacity = '0';
            img.style.opacity = '1';
            setTimeout(() => {
                placeholder.remove();
            }, 300);
        };
    });
}

// Call image loading handler
window.addEventListener('load', handleImageLoad);