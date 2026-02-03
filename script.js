// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const deployBtn = document.getElementById('deployBtn');
const deployStatus = document.getElementById('deployStatus');
const contactForm = document.getElementById('contactForm');
const visitCount = document.getElementById('visitCount');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.querySelector('i').classList.toggle('fa-bars');
    hamburger.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
    });
});

// Deployment Simulation
deployBtn.addEventListener('click', function() {
    const steps = document.querySelectorAll('.step');
    const messages = [
        "Creating storage account...",
        "Enabling static website feature...",
        "Uploading HTML, CSS, and JS files...",
        "Configuring CDN endpoint...",
        "Website deployed successfully! 🎉"
    ];
    
    deployStatus.textContent = "";
    deployStatus.style.display = "block";
    deployStatus.className = "status-message";
    deployBtn.disabled = true;
    deployBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deploying...';
    
    let currentStep = 0;
    
    const deployProcess = setInterval(() => {
        // Update status message
        deployStatus.textContent = messages[currentStep];
        
        // Update step visualization
        if (currentStep > 0) {
            steps[currentStep - 1].classList.add('completed');
            steps[currentStep - 1].classList.remove('active');
        }
        
        if (currentStep < steps.length) {
            steps[currentStep].classList.add('active');
        }
        
        currentStep++;
        
        // When deployment is complete
        if (currentStep > steps.length) {
            clearInterval(deployProcess);
            deployStatus.textContent = messages[4];
            deployStatus.style.backgroundColor = "#d4edda";
            deployStatus.style.color = "#155724";
            deployBtn.disabled = false;
            deployBtn.innerHTML = '<i class="fas fa-check"></i> Deployed Successfully!';
            
            // Add celebration effect
            createConfetti();
        }
    }, 1000);
});

// Create confetti effect
function createConfetti() {
    const colors = ['#0078d4', '#50e6ff', '#005a9e', '#4CAF50', '#FF9800'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        document.body.appendChild(confetti);
        
        // Animation
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 20}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// Contact Form Handler
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For this demo, we'll just show a success message
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate API call
    setTimeout(() => {
        alert(`Thank you, ${name}! Your message has been sent.\n\nThis is a demo. In a real app, this would connect to Azure Functions or another backend service.`);
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }, 1500);
});

// Visitor Counter Simulation
function simulateVisitorCounter() {
    // Get current count from localStorage or start at random number
    let count = localStorage.getItem('visitorCount');
    
    if (!count) {
        // Start with a random number between 100 and 500 for realism
        count = Math.floor(Math.random() * 400) + 100;
    } else {
        count = parseInt(count);
    }
    
    // Increment count
    count++;
    
    // Update display with animation
    let displayCount = parseInt(visitCount.textContent);
    const increment = Math.ceil((count - displayCount) / 30);
    
    const counterInterval = setInterval(() => {
        displayCount += increment;
        if (displayCount >= count) {
            displayCount = count;
            clearInterval(counterInterval);
        }
        visitCount.textContent = displayCount.toLocaleString();
    }, 50);
    
    // Save to localStorage
    localStorage.setItem('visitorCount', count);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Start visitor counter
    simulateVisitorCounter();
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Initialize with scroll effect
    window.dispatchEvent(new Event('scroll'));
});