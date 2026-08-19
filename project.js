/* ==========================================================================
   Project Data & Page Logic
   ========================================================================== */

import { renderLucideIcons } from './main.js';

const projectsData = {
  jeevalink: {
    name:     "JeevaLink",
    category: "Blood Donation Platform",
    type:     "Full-Stack Web App",
    cover:    "/jeevalink.png",
    liveDemo: "https://jeevalink-demo.netlify.app",
    github:   "https://github.com/abhinav-dev-01/jeevalink",
    skills:   ["React", "Node.js", "MongoDB", "Firebase", "Socket.io"],
    abstract: "JeevaLink is a blood donation and emergency response platform engineered for real-time donor matching, location mapping, and urgent medical request dispatching. The platform enables instant connections between blood donors and recipients in critical situations, with live geolocation, push notifications, and an admin dashboard for hospital coordinators.",
  },
  libgo: {
    name:     "LibGo",
    category: "Digital Library",
    type:     "Full-Stack Web Application",
    cover:    "/fittrack.png",
    liveDemo: "https://libgo-demo.netlify.app",
    github:   "https://github.com/abhinav-dev-01/libgo",
    skills:   ["React", "Node.js", "MongoDB", "Express"],
    abstract: "LibGo is a comprehensive digital library management system streamlining catalog indexing, digital book lending, automated overdue tracking, and member circulation management. Features include QR-code based book check-in/check-out, automated fine calculation, and a member self-service portal.",
  },
  examsystem: {
    name:     "Exam System",
    category: "Education Platform",
    type:     "Full-Stack Web Application",
    cover:    "/byteforge.png",
    liveDemo: "https://examsystem-demo.netlify.app",
    github:   "https://github.com/abhinav-dev-01/examsystem",
    skills:   ["React", "Express", "PostgreSQL", "Node.js"],
    abstract: "A seat arrangement and examination management platform automating hall allocation, student hall ticket verification, and invigilation schedule generation. Supports bulk student import via CSV, random seat allocation algorithms, and real-time attendance marking for invigilators.",
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const params    = new URLSearchParams(window.location.search);
  const id        = params.get('id');
  const project   = projectsData[id] || projectsData['jeevalink'];

  // Update <title>
  document.title = `${project.name} | ABHINAV.DEV`;

  // Fill in fields
  const set = (elId, val) => {
    const el = document.getElementById(elId);
    if (el) el.textContent = val;
  };

  set('project-title',    project.name);
  set('detail-category',  project.category);
  set('project-abstract', project.abstract);
  set('project-type',     project.type);

  // Cover
  const cover = document.getElementById('project-cover');
  if (cover) {
    cover.src = project.cover;
    cover.alt = project.name;
  }

  // Links
  const liveEl   = document.getElementById('project-live-link');
  const githubEl = document.getElementById('project-github-link');
  if (liveEl)   liveEl.href   = project.liveDemo;
  if (githubEl) githubEl.href = project.github;

  // Skills
  const skillsWrap = document.getElementById('project-skills');
  if (skillsWrap) {
    skillsWrap.innerHTML = project.skills
      .map(s => `<span class="project-chip">${s}</span>`)
      .join('');
  }

  // Render Lucide icons for project view
  renderLucideIcons();
});
