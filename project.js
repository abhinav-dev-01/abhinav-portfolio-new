/* ==========================================================================
   Page Preloader Logic
   ========================================================================== */
document.body.classList.add('loading');

function runPreloader() {
  const loaderWrapper = document.getElementById('loader-wrapper');
  const percentText = document.getElementById('loader-percent');
  const progressCircle = document.getElementById('loader-circle');
  const statusText = document.getElementById('loader-status');
  
  if (!loaderWrapper) return;
  
  let progress = 0;
  const maxOffset = 339.29; // 2 * PI * 54 (radius)
  
  const statusPhrases = {
    0: 'Initializing neural link...',
    20: 'Loading component modules...',
    45: 'Connecting to database vaults...',
    70: 'Generating backdrop canvas grid...',
    90: 'Syncing system aesthetics...'
  };
  
  const interval = setInterval(() => {
    if (progress < 100) {
      progress += Math.floor(Math.random() * 3) + 1;
      if (progress > 100) progress = 100;
      
      if (percentText) percentText.textContent = `${progress}%`;
      
      if (progressCircle) {
        const offset = maxOffset - (progress / 100) * maxOffset;
        progressCircle.style.strokeDashoffset = offset;
      }
      
      const currentPhraseThreshold = Object.keys(statusPhrases)
        .map(Number)
        .sort((a, b) => b - a)
        .find(threshold => progress >= threshold);
      
      if (currentPhraseThreshold !== undefined && statusText) {
        statusText.textContent = statusPhrases[currentPhraseThreshold].toUpperCase();
      }
    } else {
      clearInterval(interval);
      
      setTimeout(() => {
        loaderWrapper.classList.add('fade-out');
        document.body.classList.remove('loading');
      }, 300);
    }
  }, 30);
}

// Initialize preloader immediately
runPreloader();

/* ==========================================================================
   Canvas Particle Background (Reused for Continuity)
   ========================================================================== */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const activeColors = ['#FF4D9D', '#C026D3', '#8A2BE2'];

const mouse = {
  x: null,
  y: null,
  radius: 120
};

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', () => {
  setCanvasSize();
  initParticles();
});

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
});

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

    if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
    if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.hypot(dx, dy);

      if (distance < mouse.radius) {
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

    if (this.opacity > 0.5) {
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
    }
    ctx.fill();
    ctx.restore();
  }
}

function initParticles() {
  particlesArray = [];
  const numberOfParticles = Math.floor((canvas.width * canvas.height) / 14000);
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}
initParticles();

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
   Project Details Content Loader
   ========================================================================== */
const projectsData = {
  taskvibe: {
    name: "TaskVibe",
    skills: ["HTML5", "CSS3", "JavaScript", "Local Storage", "Drag & Drop", "Agile UI"],
    abstract: "TaskVibe simplifies agile productivity with an intuitive, interactive board interface. Users can create, organize, and prioritize tasks seamlessly using local persistence. The drag-and-drop mechanism mimics high-end developer project boards for fluid task delegation.",
    modules: [
      { title: "Board Workspace", desc: "Column-based task organizing featuring To-Do, In Progress, Review, and Completed stages." },
      { title: "Task Constructor", desc: "Create tasks with customized tags, detailed descriptions, due dates, and priority levels." },
      { title: "Sync Middleware", desc: "Automatic state saving to browser LocalStorage ensures persistent workspace sessions." }
    ],
    screens: [
      "Dashboard Board View",
      "Task Detail Drawer",
      "Tag & Label Editor",
      "Completed Archive Library",
      "Collaboration Workspace",
      "User Profile Settings"
    ],
    features: [
      "Seamless HTML5 Drag and Drop API integration",
      "Custom category filtering on the fly",
      "Interactive priority-based color coding",
      "Responsive dark mode compatibility",
      "Instant query search filter updates",
      "Automatic state backup caching"
    ]
  },
  fittrack: {
    name: "FitTrack",
    skills: ["React", "Tailwind CSS", "Firebase", "Chart.js", "NoSQL Sync", "No Auth"],
    abstract: "FitTrack empowers users to achieve fitness goals through data visualization. Log workouts, monitor diet, and view weekly analytics charts in a unified interface. Real-time updates help users stay aligned with targets.",
    modules: [
      { title: "Activity Logger", desc: "Track cardio, weightlifting, sets, repetitions, and total active minutes." },
      { title: "Nutrition Sync", desc: "Calorie lookup logs coupled with hydration tracker level logs." },
      { title: "Visual Analytics", desc: "Interactive graph dashboards analyzing weight progress trends." }
    ],
    screens: [
      "Progress Tracker Dashboard",
      "Workout Logging Drawer",
      "Meal Logger Console",
      "Target Analytics Report",
      "Calorie Search Hub",
      "Goal Achievement Badges"
    ],
    features: [
      "Live progress charts using Chart.js visualization",
      "Goal achievements notification system",
      "Firebase database real-time sync",
      "User authentication and profile support",
      "Interactive diet logs calculator",
      "Custom workout plans constructor"
    ]
  },
  byteforge: {
    name: "ByteForge",
    skills: ["Next.js", "Django", "PostgreSQL", "OpenAI API", "JWT Security", "Tailwind"],
    abstract: "ByteForge is a cloud-based SaaS tool designed for modern development workflows. Integrating LLMs directly into a web interface, it accelerates code authoring, explains functions, and suggests optimizations in real-time.",
    modules: [
      { title: "AI Generator", desc: "Generates Python, JS, and PHP unit tests on the fly using OpenAI integration." },
      { title: "Refactor Sandbox", desc: "Code analyzer that highlights performance bottlenecks and suggests optimized logic." },
      { title: "Vault Database", desc: "Secure PostgreSQL store caching analysis history and generated script repositories." }
    ],
    screens: [
      "Code Assistant Console",
      "Test Editor Terminal",
      "Analytics Dashboard",
      "History Browser Panel",
      "AI Engine Settings",
      "Export Code Suite"
    ],
    features: [
      "Deep OpenAI API integration with stream responses",
      "Sandbox execution with syntax highlighting",
      "JWT secure authentication middleware",
      "Django REST API robust backend",
      "Detailed execution logs output",
      "Optimized prompt contexts loader"
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Parse URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');

  const data = projectsData[projectId] || projectsData.taskvibe;

  // Update Page Title in Browser
  document.title = `${data.name} Case Study | Portfolio`;

  // 1. Populate Project Name
  const projTitleEl = document.getElementById('project-title');
  if (projTitleEl) {
    projTitleEl.textContent = data.name.toUpperCase();
    projTitleEl.setAttribute('data-text', data.name.toUpperCase());
  }

  // 2. Populate Used Skills Row (small card badges)
  const skillsRowEl = document.getElementById('project-skills');
  if (skillsRowEl) {
    skillsRowEl.innerHTML = '';
    data.skills.forEach(skill => {
      const card = document.createElement('div');
      card.className = 'project-skill-card';
      card.innerHTML = `
        <span class="project-skill-dot"></span>
        <span class="project-skill-name">${skill}</span>
      `;
      skillsRowEl.appendChild(card);
    });
  }

  // 3. Populate Abstract
  const abstractEl = document.getElementById('project-abstract');
  if (abstractEl) {
    abstractEl.textContent = data.abstract;
  }

  // 4. Populate Modules Grid
  const modulesEl = document.getElementById('project-modules');
  if (modulesEl) {
    modulesEl.innerHTML = '';
    data.modules.forEach(mod => {
      const card = document.createElement('div');
      card.className = 'module-card project-module-card';
      card.innerHTML = `
        <h4 class="module-title">${mod.title}</h4>
        <p class="module-desc">${mod.desc}</p>
      `;
      modulesEl.appendChild(card);
    });
  }

  // 5. Populate Gallery Grid (6 items)
  const galleryEl = document.getElementById('project-gallery');
  if (galleryEl) {
    galleryEl.innerHTML = '';
    data.screens.forEach(screen => {
      const placeholder = document.createElement('div');
      placeholder.className = 'modal-image-placeholder project-gallery-card';
      placeholder.innerHTML = `
        <div class="gallery-card-glow"></div>
        <span class="modal-image-text">// ${screen.toUpperCase()}</span>
      `;
      galleryEl.appendChild(placeholder);
    });
  }

  // 6. Populate Features List
  const featuresEl = document.getElementById('project-features');
  if (featuresEl) {
    featuresEl.innerHTML = '';
    data.features.forEach(feat => {
      const item = document.createElement('li');
      item.className = 'modal-feature-item project-feature-item';
      item.innerHTML = `
        <span class="modal-feature-icon project-feature-icon">✓</span>
        <span class="project-feature-text">${feat}</span>
      `;
      featuresEl.appendChild(item);
    });
  }
});
