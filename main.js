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
   2. Dynamic Typewriter Effect for Hero Subtitle
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const typewriterElement = document.getElementById('typewriter-text');
  if (typewriterElement) {
    const roles = [
      'Software Developer',
      'Full Stack Architect',
      'Python & React Developer',
      'UI/UX Craftsman'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before typing next
      }

      setTimeout(type, typeSpeed);
    }

    type();
  }
});

/* ==========================================================================
   3. Midnight Indigo & Royal Violet Laser Trail Canvas Effect
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
      size: Math.random() * 3 + 2,
      opacity: 0.85,
      color: Math.random() > 0.5 ? '#a855f7' : '#6366f1'
    });

    if (points.length > 25) points.shift();
  });

  function renderTrail() {
    ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
    for (let i = 0; i < points.length; i++) {
      const pt = points[i];
      pt.opacity -= 0.025;

      if (pt.opacity > 0) {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.shadowColor = pt.color;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = Math.max(0, pt.opacity);
        ctx.fill();
      }
    }
    requestAnimationFrame(renderTrail);
  }
  renderTrail();
}

/* ==========================================================================
   4. Coffee Mug Triggers
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const coffeeTrigger = document.getElementById('coffee-mug-trigger');
  const coffeeTrigger2 = document.getElementById('coffee-mug-trigger-2');
  let coffeeCount = 5;

  if (coffeeTrigger) {
    coffeeTrigger.addEventListener('click', () => {
      coffeeCount = (coffeeCount % 5) + 1;
      let cups = '';
      for (let i = 0; i < coffeeCount; i++) {
        cups += '☕ ';
      }
      coffeeTrigger.textContent = cups.trim();
    });
  }

  if (coffeeTrigger2) {
    let cups2 = 1;
    coffeeTrigger2.addEventListener('click', () => {
      cups2 = (cups2 % 5) + 1;
      const textSpan = coffeeTrigger2.querySelector('.badge-text');
      if (textSpan) {
        textSpan.textContent = `COFFEE x${cups2}`;
      }
    });
  }
});

/* ==========================================================================
   5. Mobile Drawer Toggle
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
   6. Cyber FX Mode Toggle Switcher
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
   7. Scroll Spy Navigation
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
