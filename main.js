/* ==========================================================================
   Canvas Particle Background
   ========================================================================== */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const activeColors = ['#FF4D9D', '#C026D3', '#8A2BE2'];

// Mouse state
const mouse = {
  x: null,
  y: null,
  radius: 120
};

// Set canvas dimensions
function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', () => {
  setCanvasSize();
  initParticles();
});

// Capture mouse movements
window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Clear mouse coordinates when leaving window
window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
});

// Particle Constructor
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.color = activeColors[Math.floor(Math.random() * activeColors.length)];
    this.opacity = Math.random() * 0.5 + 0.2;
    this.baseOpacity = this.opacity;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off edges
    if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
    if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

    // Interactive mouse glow/hover repulsion
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.hypot(dx, dy);

      if (distance < mouse.radius) {
        // Light repulsion effect
        const force = (mouse.radius - distance) / mouse.radius;
        const dirX = dx / distance;
        const dirY = dy / distance;
        this.x -= dirX * force * 1.5;
        this.y -= dirY * force * 1.5;
        this.opacity = Math.min(1, this.baseOpacity + force * 0.5);
        this.size = Math.min(3.5, this.size + force * 0.5);
      } else {
        if (this.opacity > this.baseOpacity) this.opacity -= 0.02;
        if (this.size > 2) this.size -= 0.05;
      }
    }
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;

    // Add glow to brighter particles
    if (this.opacity > 0.5) {
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
    }
    ctx.fill();
    ctx.restore();
  }
}

// Populate particle array
function initParticles() {
  particlesArray = [];
  const numberOfParticles = Math.floor((canvas.width * canvas.height) / 14000);
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}
initParticles();

// Particle Animation Loop
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();


/* ==========================================================================
   Typing Animation Subtitle
   ========================================================================== */
const typingTextElement = document.getElementById('typing-text');
const phrases = [
  "> Full Stack Developer",
  "> MERN Stack Architect",
  "> Python & Php Dev",
  "> UI/UX Modern Innovator"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeAnimation() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    // Deleting character
    typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50; // faster deletion
  } else {
    // Typing character
    typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 120; // standard typing
  }

  // Handle typing progression
  if (!isDeleting && charIndex === currentPhrase.length) {
    // Delay at end of phrase
    typingSpeed = 2500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    // Move to next phrase
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500; // brief pause before next phrase
  }

  setTimeout(typeAnimation, typingSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeAnimation, 1000);
});


/* ==========================================================================
   Terminal Card 3D Tilt Parallax Effect
   ========================================================================== */
const terminal = document.getElementById('profile-terminal');

if (terminal) {
  const container = document.querySelector('.hero-right');

  container.addEventListener('mousemove', (e) => {
    // Get mouse position relative to terminal card
    const rect = terminal.getBoundingClientRect();
    const cardWidth = rect.width;
    const cardHeight = rect.height;

    // Card center coords
    const centerX = rect.left + cardWidth / 2;
    const centerY = rect.top + cardHeight / 2;

    // Mouse distance from center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation angle (max 12deg tilt)
    const rotateX = -12 * (mouseY / (window.innerHeight / 2));
    const rotateY = 12 * (mouseX / (window.innerWidth / 2));

    // Apply styling dynamically
    // Pause CSS float animation to avoid conflicts during hover
    terminal.style.animation = 'none';
    terminal.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  container.addEventListener('mouseleave', () => {
    // Reset layout smoothing back to baseline
    terminal.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    terminal.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

    // Resume CSS float animation after transition completes
    setTimeout(() => {
      terminal.style.transition = '';
      terminal.style.animation = 'float-card 6s ease-in-out infinite';
    }, 500);
  });
}

/* ==========================================================================
   Bento Card Spotlight & Scroll Counter Animations
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mouse Spotlight Effect for Bento Cards
  const bentoCards = document.querySelectorAll('.bento-card');
  bentoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });

  // 2. Count-up Animation for Bento Counter Elements
  const counters = document.querySelectorAll('.bento-counter');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetValueStr = target.getAttribute('data-value');
          const targetValue = parseInt(targetValueStr, 10);

          if (isNaN(targetValue)) {
            // Non-numeric counters like infinity or text just display immediately
            target.textContent = targetValueStr;
          } else {
            let start = 0;
            const suffix = target.getAttribute('data-suffix') || '';
            const duration = 1200; // ms
            const stepTime = Math.max(Math.floor(duration / targetValue), 15);

            const interval = setInterval(() => {
              start++;
              target.textContent = start + suffix;
              if (start >= targetValue) {
                clearInterval(interval);
                target.textContent = targetValueStr; // ensure exact value is displayed at end
              }
            }, stepTime);
          }

          // Stop observing this element once animated
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.1 });

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  /* ==========================================================================
     Unlocked Abilities (Skills) Grid Cards Entry Animation
     ========================================================================== */
  const skillCards = document.querySelectorAll('.skills-grid-card');
  if (skillCards.length > 0) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Staggered entry animation for cards
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    skillCards.forEach(card => {
      skillsObserver.observe(card);
    });
  }

  /* ==========================================================================
     Projects Filtering
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active class on filter buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Filter project cards in grid
      projectCards.forEach(card => {
        const cardComplexity = card.getAttribute('data-complexity');
        if (filterValue === 'all' || cardComplexity === filterValue) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
});
