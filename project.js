import {
  createIcons,
  Download,
  CheckCircle2,
  Cpu,
  Code2,
  Sparkles,
  Layers,
  Check,
  ArrowLeft,
  Globe,
  GitBranch
} from 'lucide';

function initLucideIcons() {
  createIcons({
    icons: {
      Download,
      CheckCircle2,
      Cpu,
      Code2,
      Sparkles,
      Layers,
      Check,
      ArrowLeft,
      Globe,
      GitBranch
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLucideIcons);
} else {
  initLucideIcons();
}

/* ==========================================================================
   Project Details Content Loader (Cyberpunk Telemetry)
   ========================================================================== */
const projectsData = {
  taskvibe: {
    name: "TaskVibe.sys",
    liveDemo: "https://taskvibe-demo.netlify.app",
    github: "https://github.com/abhinav-dev-01/taskvibe",
    skills: ["HTML5", "CSS3", "JavaScript", "Local Storage", "Drag & Drop", "Agile UI"],
    abstract: "TaskVibe simplifies agile productivity with an intuitive, interactive board interface. Users can create, organize, and prioritize tasks seamlessly using local persistence. The drag-and-drop mechanism mimics high-end developer project boards for fluid task delegation.",
    modules: [
      { title: "Board Workspace", desc: "Column-based task organizing featuring To-Do, In Progress, Review, and Completed stages." },
      { title: "Task Constructor", desc: "Create tasks with customized tags, detailed descriptions, due dates, and priority levels." },
      { title: "Sync Middleware", desc: "Automatic state saving to browser LocalStorage ensures persistent workspace sessions." }
    ],
    features: [
      "Seamless HTML5 Drag and Drop API integration",
      "Custom category filtering on the fly",
      "Interactive priority-based color coding",
      "Responsive cyberpunk dark mode compatibility",
      "Instant query search filter updates",
      "Automatic state backup caching"
    ]
  },
  fittrack: {
    name: "FitTrack.sys",
    liveDemo: "https://fittrack-demo.netlify.app",
    github: "https://github.com/abhinav-dev-01/fittrack",
    skills: ["React", "Tailwind CSS", "Firebase", "Chart.js", "NoSQL Sync"],
    abstract: "FitTrack empowers users to achieve fitness goals through data visualization. Log workouts, monitor diet, and view weekly analytics charts in a unified interface. Real-time updates help users stay aligned with targets.",
    modules: [
      { title: "Activity Logger", desc: "Track cardio, weightlifting, sets, repetitions, and total active minutes." },
      { title: "Nutrition Sync", desc: "Calorie lookup logs coupled with hydration tracker level logs." },
      { title: "Visual Analytics", desc: "Interactive graph dashboards analyzing weight progress trends." }
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
    name: "ByteForge.sys",
    liveDemo: "https://byteforge-demo.netlify.app",
    github: "https://github.com/abhinav-dev-01/byteforge",
    skills: ["Next.js", "Django", "PostgreSQL", "OpenAI API", "JWT Security", "Tailwind"],
    abstract: "ByteForge is a cloud-based SaaS tool designed for modern development workflows. Integrating LLMs directly into a web interface, it accelerates code authoring, explains functions, and suggests optimizations in real-time.",
    modules: [
      { title: "AI Generator", desc: "Generates Python, JS, and PHP unit tests on the fly using OpenAI integration." },
      { title: "Refactor Sandbox", desc: "Code analyzer that highlights performance bottlenecks and suggests optimized logic." },
      { title: "Vault Database", desc: "Secure PostgreSQL store caching analysis history and generated script repositories." }
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
  document.title = `${data.name} Case Study | Cyberpunk Portfolio`;

  // 1. Populate Project Name
  const projTitleEl = document.getElementById('project-title');
  if (projTitleEl) {
    projTitleEl.textContent = data.name.toUpperCase();
  }

  // 1b. Populate Action Links
  const liveDemoLinkEl = document.getElementById('project-live-demo-link');
  if (liveDemoLinkEl) {
    liveDemoLinkEl.href = data.liveDemo || '#';
  }

  const githubLinkEl = document.getElementById('project-github-link');
  if (githubLinkEl) {
    githubLinkEl.href = data.github || '#';
  }

  // 2. Populate Used Skills Row
  const skillsRowEl = document.getElementById('project-skills');
  if (skillsRowEl) {
    skillsRowEl.innerHTML = '';
    data.skills.forEach(skill => {
      const badge = document.createElement('span');
      badge.className = 'skill-badge';
      badge.textContent = skill;
      skillsRowEl.appendChild(badge);
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

  // 5. Populate Features List
  const featuresEl = document.getElementById('project-features');
  if (featuresEl) {
    featuresEl.innerHTML = '';
    data.features.forEach(feat => {
      const item = document.createElement('li');
      item.className = 'project-feature-item';
      item.innerHTML = `
        <i data-lucide="check-circle-2" class="project-feature-icon"></i>
        <span class="project-feature-text">${feat}</span>
      `;
      featuresEl.appendChild(item);
    });
  }

  // Trigger Lucide icons rendering
  initLucideIcons();
});
