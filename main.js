import {
  createIcons,
  Download,
  Play,
  Atom,
  Code2,
  Server,
  Database,
  FileCode,
  FolderGit2,
  Cpu,
  Infinity as InfinityIcon,
  Zap,
  Sparkles,
  Palette,
  FileJson,
  Wind,
  LayoutGrid,
  Network,
  Code,
  Layers,
  Terminal,
  HardDrive,
  Flame,
  Globe,
  ShieldCheck,
  GitBranch,
  Smartphone,
  Box,
  BrainCircuit,
  Bot,
  Workflow,
  Container,
  Send,
  Triangle,
  Link2,
  Mail,
  Briefcase,
  GraduationCap,
  MessageSquare
} from 'lucide';

/* ==========================================================================
   1. Lucide Icons Initializer
   ========================================================================== */
function initLucideIcons() {
  createIcons({
    icons: {
      Download,
      Play,
      Atom,
      Code2,
      Server,
      Database,
      FileCode,
      FolderGit2,
      Cpu,
      Infinity: InfinityIcon,
      Zap,
      Sparkles,
      Palette,
      FileJson,
      Wind,
      LayoutGrid,
      Network,
      Code,
      Layers,
      Terminal,
      HardDrive,
      Flame,
      Globe,
      ShieldCheck,
      GitBranch,
      Smartphone,
      Box,
      BrainCircuit,
      Bot,
      Workflow,
      Container,
      Send,
      Triangle,
      Link2,
      Mail,
      Briefcase,
      GraduationCap,
      MessageSquare
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLucideIcons);
} else {
  initLucideIcons();
}

/* ==========================================================================
   2. Pencil Cursor Trail Effect
   ========================================================================== */
const trailCanvas = document.getElementById('pencil-trail-canvas');
if (trailCanvas) {
  const ctx = trailCanvas.getContext('2d');
  let points = [];

  function resizeCanvas() {
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  window.addEventListener('mousemove', (e) => {
    points.push({
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 2.5 + 1.5,
      opacity: 0.5,
      color: '#2563EB'
    });

    if (points.length > 20) points.shift();
  });

  function renderTrail() {
    ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
    for (let i = 0; i < points.length; i++) {
      const pt = points[i];
      pt.opacity -= 0.02;

      if (pt.opacity > 0) {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = Math.max(0, pt.opacity);
        ctx.fill();
      }
    }
    requestAnimationFrame(renderTrail);
  }
  renderTrail();
}

/* ==========================================================================
   3. Interactive Laptop Terminal Prompt
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');

  if (terminalInput && terminalOutput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        const userCmdLine = document.createElement('div');
        userCmdLine.className = 'terminal-line';
        userCmdLine.innerHTML = `&gt; <span class="green-text">${cmd}</span>`;
        terminalOutput.appendChild(userCmdLine);

        let responseText = '';
        if (cmd === 'help') {
          responseText = 'Available commands: whoami, skills, projects, contact, clear';
        } else if (cmd === 'whoami') {
          responseText = 'Abhinav P — Full Stack Developer & UI Craftsman';
        } else if (cmd === 'skills') {
          responseText = 'React, Node.js, Django, PostgreSQL, MongoDB, Tailwind, TypeScript';
        } else if (cmd === 'projects') {
          responseText = 'TaskVibe, FitTrack, ByteForge — Click View My Work for details!';
        } else if (cmd === 'contact') {
          responseText = 'Email: abhinavpadoli@gmail.com | LinkedIn: in/abhinav-p-dev';
        } else if (cmd === 'clear') {
          terminalOutput.innerHTML = '';
          return;
        } else if (cmd !== '') {
          responseText = `Command not recognized: '${cmd}'. Type 'help' for options.`;
        }

        if (responseText) {
          const respLine = document.createElement('div');
          respLine.className = 'terminal-line indent-text';
          respLine.textContent = responseText;
          terminalOutput.appendChild(respLine);
        }

        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }
    });
  }
});

/* ==========================================================================
   4. Coffee Sip Counter Trigger
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const coffeeTrigger = document.getElementById('coffee-mug-trigger');
  const sipCountText = document.getElementById('sip-count');
  let sipCount = 4;

  if (coffeeTrigger && sipCountText) {
    coffeeTrigger.addEventListener('click', () => {
      sipCount++;
      sipCountText.textContent = sipCount;
      coffeeTrigger.style.transform = 'scale(1.2) rotate(8deg)';
      setTimeout(() => {
        coffeeTrigger.style.transform = 'scale(1) rotate(-3deg)';
      }, 250);
    });
  }
});

/* ==========================================================================
   5. Flying Paper Airplane Animation
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const planeTrigger = document.getElementById('paper-plane-trigger');
  if (planeTrigger) {
    planeTrigger.addEventListener('click', () => {
      planeTrigger.style.transition = 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
      planeTrigger.style.transform = 'translate(250px, -200px) rotate(45deg) scale(0.3)';
      setTimeout(() => {
        planeTrigger.style.transition = 'none';
        planeTrigger.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
      }, 1400);
    });
  }
});

/* ==========================================================================
   6. Mobile Menu Drawer Toggle
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-item');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileDrawer.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileDrawer.classList.remove('active');
      });
    });
  }
});

/* ==========================================================================
   7. Theme Mode Toggle Switcher
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  }
});

/* ==========================================================================
   8. Scroll Spy Navigation
   ========================================================================== */
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('header[id], section[id], footer[id]');
  const navItems = document.querySelectorAll('.nav-item');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${currentSection}`) {
      item.classList.add('active');
    }
  });
});
