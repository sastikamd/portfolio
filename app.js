// Dynamic Text Typewriter Effect
const dynamicTextElement = document.getElementById('dynamicText');
const textArray = [
    'Developer',
    'Gardener',
    'Nature Enthusiast'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let pauseAfterWord = 2000;
let pauseAfterDelete = 500;

function typeWriter() {
    const currentText = textArray[textIndex];
    
    if (!isDeleting) {
        // Typing
        dynamicTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            // Finished typing current text
            isDeleting = true;
            setTimeout(typeWriter, pauseAfterWord);
            return;
        }
        
        setTimeout(typeWriter, typingSpeed);
    } else {
        // Deleting
        dynamicTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            // Finished deleting
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            setTimeout(typeWriter, pauseAfterDelete);
            return;
        }
        
        setTimeout(typeWriter, deletingSpeed);
    }
}

// Start the typewriter effect when page loads
if (dynamicTextElement) {
    setTimeout(typeWriter, 1000);
}

// Navigation
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Sticky Navigation
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Memory Card Game
const gameBoard = document.getElementById('gameBoard');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const pairsDisplay = document.getElementById('pairs');
const restartButton = document.getElementById('restartGame');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let gameTime = 0;
let timerInterval = null;

const cardEmojis = ['🚀', '⚛️', '🎨', '💻', '🔥', '⭐', '🎯', '💡'];

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function startTimer() {
    timerInterval = setInterval(() => {
        gameTime++;
        const minutes = Math.floor(gameTime / 60);
        const seconds = gameTime % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function createCard(emoji, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    cardFront.textContent = '🎮';
    
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.textContent = emoji;
    
    card.appendChild(cardFront);
    card.appendChild(cardBack);
    
    card.addEventListener('click', () => flipCard(card));
    
    return card;
}

function flipCard(card) {
    if (flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    if (moves === 0 && gameTime === 0) {
        startTimer();
    }
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const emoji1 = card1.dataset.emoji;
    const emoji2 = card2.dataset.emoji;
    
    if (emoji1 === emoji2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        pairsDisplay.textContent = `${matchedPairs}/8`;
        flippedCards = [];
        
        if (matchedPairs === 8) {
            stopTimer();
            setTimeout(() => {
                alert(`🎉 Congratulations! You won!\n\nMoves: ${moves}\nTime: ${timerDisplay.textContent}`);
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function initGame() {
    gameBoard.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    gameTime = 0;
    
    movesDisplay.textContent = '0';
    timerDisplay.textContent = '0:00';
    pairsDisplay.textContent = '0/8';
    
    stopTimer();
    
    const shuffledEmojis = shuffleArray([...cardEmojis, ...cardEmojis]);
    
    shuffledEmojis.forEach((emoji, index) => {
        const card = createCard(emoji, index);
        cards.push(card);
        gameBoard.appendChild(card);
    });
}

restartButton.addEventListener('click', initGame);

// Initialize game on load
initGame();

// Particle Animation System
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    
    function setCanvasSize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    setCanvasSize();
    window.addEventListener('resize', () => {
        setCanvasSize();
        initParticles();
    });
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function initParticles() {
        particles = [];
        const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.2;
                    ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        animationFrameId = requestAnimationFrame(animateParticles);
    }
    
    // Only animate when the home section is visible
    const homeSection = document.getElementById('home');
    const particleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (particles.length === 0) initParticles();
                animateParticles();
            } else {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
            }
        });
    }, { threshold: 0.1 });
    
    if (homeSection) {
        particleObserver.observe(homeSection);
    }
}

// Skills Animation
const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

function animateSkills() {
    const skillProgress = document.querySelectorAll('.skill-progress');
    skillProgress.forEach(bar => {
        const progress = bar.dataset.progress;
        bar.style.setProperty('--progress', progress + '%');
        bar.classList.add('animate');
    });
}

const observerOptions = {
    threshold: 0.3
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            animateSkills();
            skillsAnimated = true;
        }
    });
}, observerOptions);

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function hideError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    errorElement.classList.remove('show');
}

function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    
    hideError(fieldId);
    
    if (value === '') {
        showError(fieldId, 'This field is required');
        return false;
    }
    
    if (fieldId === 'email' && !validateEmail(value)) {
        showError(fieldId, 'Please enter a valid email address');
        return false;
    }
    
    if (fieldId === 'name' && value.length < 2) {
        showError(fieldId, 'Name must be at least 2 characters');
        return false;
    }
    
    if (fieldId === 'message' && value.length < 10) {
        showError(fieldId, 'Message must be at least 10 characters');
        return false;
    }
    
    return true;
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    
    const isNameValid = validateField(nameField);
    const isEmailValid = validateField(emailField);
    const isSubjectValid = validateField(subjectField);
    const isMessageValid = validateField(messageField);
    
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Show success message
        formSuccess.classList.add('show');
        contactForm.reset();
        
        // Reset after 5 seconds
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
    }
});

// Add input validation on blur
const formFields = contactForm.querySelectorAll('.form-control');
formFields.forEach(field => {
    field.addEventListener('blur', () => {
        if (field.value.trim() !== '') {
            validateField(field);
        }
    });
    
    field.addEventListener('input', () => {
        if (field.value.trim() !== '') {
            hideError(field.id);
        }
    });
});

// Smooth scroll for navigation links
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
        }
    });
});

// Add scroll reveal animation
const revealElements = document.querySelectorAll('.project-card, .cert-card, .skill-category');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});