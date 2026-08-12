/* ==========================================================================
   ABHINAV.DEV — State-of-the-Art Portfolio Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initThemeSwitcher();
  initScrollProgress();
  initMouseOrb();
  initHeroTyping();
  initScrollSpy();
  initTextRevealObserver();
  initSkillsFilter();
  initCodeCard();
  initProjectsStoryDeck();
  initProjectViewToggle();
  initSystemArchitecture();
  initMobileMenu();
  initTerminalCLI();
  initContactForm();
});

/* --------------------------------------------------------------------------
   01. LOADING SCREEN
   -------------------------------------------------------------------------- */
function initLoadingScreen() {
  const screen    = document.getElementById('loading-screen');
  const fill      = document.getElementById('loader-progress-fill');
  const ring      = document.getElementById('loader-ring-circle');
  const percent   = document.getElementById('loader-percent');
  const statusEl  = document.getElementById('loader-status');
  const tagline   = document.getElementById('loader-tagline');
  const nameChars = document.querySelectorAll('.loader-name-char');
  if (!screen) return;

  const CIRCUMFERENCE = 2 * Math.PI * 35; // r=35
  const steps = [
    { at: 0,   label: 'INITIALIZING SYSTEM' },
    { at: 20,  label: 'LOADING ASSETS' },
    { at: 45,  label: 'COMPILING STACK' },
    { at: 75,  label: 'ALMOST READY' },
    { at: 100, label: 'SYSTEM READY' },
  ];

  let progress = 0;
  let startTime = null;
  const TOTAL_DURATION = 1800; // ms

  function easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
  }

  function updateProgress(ts) {
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;
    const raw = Math.min(elapsed / TOTAL_DURATION, 1);
    progress = Math.round(easeInOutQuart(raw) * 100);

    if (fill) fill.style.width = `${progress}%`;

    if (ring) {
      const offset = CIRCUMFERENCE * (1 - progress / 100);
      ring.style.strokeDashoffset = offset;
    }

    if (percent) percent.textContent = `${String(progress).padStart(3, '0')}%`;

    const currentStep = steps.reduce((acc, s) => progress >= s.at ? s : acc, steps[0]);
    if (statusEl) statusEl.textContent = currentStep.label;

    const charsToShow = Math.floor((progress / 100) * nameChars.length);
    nameChars.forEach((c, i) => {
      if (i < charsToShow) c.classList.add('shown');
    });

    if (progress >= 70 && tagline) tagline.classList.add('shown');

    if (raw < 1) {
      requestAnimationFrame(updateProgress);
    } else {
      setTimeout(finishLoading, 300);
    }
  }

  function finishLoading() {
    nameChars.forEach(c => c.classList.add('shown'));
    if (tagline) tagline.classList.add('shown');

    setTimeout(() => {
      screen.classList.add('hidden');
      document.body.classList.remove('is-loading');

      const heroSection = document.getElementById('home');
      if (heroSection) {
        setTimeout(() => heroSection.classList.add('is-visible'), 100);
      }

      setTimeout(() => screen.remove(), 700);
    }, 250);
  }

  requestAnimationFrame(updateProgress);
}

/* --------------------------------------------------------------------------
   02. THEME SWITCHER
   -------------------------------------------------------------------------- */
function initThemeSwitcher() {
  const themeBtns = document.querySelectorAll('[data-set-theme]');
  const mobileThemeBtn = document.getElementById('mobile-theme-toggle');
  const themes = ['cosmos', 'neon', 'light'];
  let currentTheme = localStorage.getItem('abhinav_theme') || 'cosmos';

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('abhinav_theme', t);
    themeBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-set-theme') === t));
    currentTheme = t;
  }

  applyTheme(currentTheme);

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.getAttribute('data-set-theme');
      applyTheme(t);
      showToast(`Switched to ${t.toUpperCase()} theme 🎨`);
    });
  });

  mobileThemeBtn?.addEventListener('click', () => {
    const nextIdx = (themes.indexOf(currentTheme) + 1) % themes.length;
    const nextTheme = themes[nextIdx];
    applyTheme(nextTheme);
    showToast(`Switched to ${nextTheme.toUpperCase()} theme 🎨`);
  });
}

/* --------------------------------------------------------------------------
   03. SCROLL PROGRESS BAR & BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;

    if (bar) {
      bar.style.transform = `scaleX(${scrollPercent})`;
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', scrollTop > 500);
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   04. MOUSE LIGHT ORB
   -------------------------------------------------------------------------- */
function initMouseOrb() {
  const orb = document.getElementById('mouse-light-orb');
  if (!orb) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let orbX = mouseX, orbY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  (function render() {
    orbX += (mouseX - orbX) * 0.08;
    orbY += (mouseY - orbY) * 0.08;
    orb.style.left = `${orbX}px`;
    orb.style.top = `${orbY}px`;
    requestAnimationFrame(render);
  })();
}

/* --------------------------------------------------------------------------
   05. HERO DYNAMIC TYPING TEXT EFFECT
   -------------------------------------------------------------------------- */
function initHeroTyping() {
  const textEl = document.getElementById('typing-hero');
  if (!textEl) return;

  const words = ['products.', 'web apps.', 'scalable APIs.', 'experiences.'];
  let wordIdx = 0;
  let charIdx = words[0].length;
  let isDeleting = false;

  function typeStep() {
    const currentWord = words[wordIdx];

    if (isDeleting) {
      charIdx--;
      textEl.textContent = currentWord.substring(0, charIdx);
    } else {
      charIdx++;
      textEl.textContent = currentWord.substring(0, charIdx);
    }

    let delay = isDeleting ? 60 : 110;

    if (!isDeleting && charIdx === currentWord.length) {
      delay = 2500;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      delay = 400;
    }

    setTimeout(typeStep, delay);
  }

  setTimeout(typeStep, 3000);
}

/* --------------------------------------------------------------------------
   06. SCROLL SPY
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const navItems  = document.querySelectorAll('.side-nav-item');
  const dockItems = document.querySelectorAll('.dock-item');
  const sections  = document.querySelectorAll('section');
  if (!sections.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item =>
          item.classList.toggle('active', item.getAttribute('data-section') === id)
        );
        dockItems.forEach(item =>
          item.classList.toggle('active', item.getAttribute('data-section') === id)
        );
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => obs.observe(s));
}

/* --------------------------------------------------------------------------
   07. TEXT REVEAL OBSERVER
   -------------------------------------------------------------------------- */
function initTextRevealObserver() {
  const targets = document.querySelectorAll('.cinematic-section, .hero-section');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.1 });

  targets.forEach(t => obs.observe(t));
}

/* --------------------------------------------------------------------------
   08. SKILLS CATEGORY FILTER
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const tagsContainer = document.getElementById('skills-tags-container');
  if (!filterBtns.length || !tagsContainer) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tags = tagsContainer.querySelectorAll('.tag');
      tags.forEach(tag => {
        const cat = tag.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          tag.classList.remove('hidden-tag');
        } else {
          tag.classList.add('hidden-tag');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   09. CODE CARD TABS & COPY SNIPPET
   -------------------------------------------------------------------------- */
function initCodeCard() {
  const tabBtns  = document.querySelectorAll('.code-tab-btn');
  const codePre  = document.getElementById('code-snippet-pre');
  const copyBtn  = document.getElementById('copy-code-btn');
  if (!codePre) return;

  const snippets = {
    developer: `<span class="code-kw">interface</span> Developer {
  name: <span class="code-str">"Abhinav"</span>;
  role: <span class="code-str">"Full-Stack Developer"</span>;
  location: <span class="code-str">"India 🇮🇳"</span>;
  stack: string[];
  status: <span class="code-str">"Ready for impact"</span>;
}

<span class="code-kw">const</span> developer: Developer = {
  name: <span class="code-str">"Abhinav"</span>,
  role: <span class="code-str">"Full Stack Engineer"</span>,
  location: <span class="code-str">"India 🇮🇳"</span>,
  stack: [<span class="code-str">"React"</span>, <span class="code-str">"Node.js"</span>, <span class="code-str">"PostgreSQL"</span>],
  status: <span class="code-str">"Ready for impact"</span>,
};

<span class="code-cmt">// Execute mission</span>
<span class="code-fn">deploySuccess</span>(developer);`,

    stack: `<span class="code-kw">{</span>
  <span class="code-key">"name"</span>: <span class="code-str">"abhinav-stack"</span>,
  <span class="code-key">"frontend"</span>: [<span class="code-str">"React"</span>, <span class="code-str">"Next.js"</span>, <span class="code-str">"TypeScript"</span>],
  <span class="code-key">"backend"</span>: [<span class="code-str">"Node.js"</span>, <span class="code-str">"Express"</span>, <span class="code-str">"Laravel"</span>],
  <span class="code-key">"database"</span>: [<span class="code-str">"PostgreSQL"</span>, <span class="code-str">"MongoDB"</span>, <span class="code-str">"Redis"</span>],
  <span class="code-key">"architecture"</span>: <span class="code-str">"Microservices &amp; REST"</span>
<span class="code-kw">}</span>`
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (snippets[tab]) {
        codePre.querySelector('code').innerHTML = snippets[tab];
      }
    });
  });

  copyBtn?.addEventListener('click', () => {
    const rawText = codePre.textContent;
    navigator.clipboard.writeText(rawText).then(() => {
      copyBtn.textContent = 'Copied!';
      showToast('Code snippet copied to clipboard 📋');
      setTimeout(() => copyBtn.textContent = 'Copy', 2000);
    });
  });
}

/* --------------------------------------------------------------------------
   10. PROJECTS STORY DECK
   -------------------------------------------------------------------------- */
function initProjectsStoryDeck() {
  const slides     = document.querySelectorAll('.story-slide');
  const pips       = document.querySelectorAll('.progress-pip');
  const prevBtn    = document.getElementById('story-prev');
  const nextBtn    = document.getElementById('story-next');
  const numDisplay = document.getElementById('current-project-num');
  if (!slides.length) return;

  let current = 0;

  function goTo(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    pips.forEach((p, i)   => p.classList.toggle('active', i === index));
    if (numDisplay) numDisplay.textContent = `0${index + 1}`;
    current = index;
  }

  prevBtn?.addEventListener('click', () => goTo((current - 1 + slides.length) % slides.length));
  nextBtn?.addEventListener('click', () => goTo((current + 1) % slides.length));

  document.addEventListener('keydown', (e) => {
    const sec = document.getElementById('projects');
    if (!sec) return;
    const r = sec.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      if (e.key === 'ArrowLeft')  goTo((current - 1 + slides.length) % slides.length);
      if (e.key === 'ArrowRight') goTo((current + 1) % slides.length);
    }
  });

  let autoTimer = setInterval(() => goTo((current + 1) % slides.length), 6500);

  [prevBtn, nextBtn].forEach(btn => btn?.addEventListener('click', () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo((current + 1) % slides.length), 6500);
  }));
}

/* --------------------------------------------------------------------------
   11. PROJECT VIEW TOGGLE (DECK VS GRID)
   -------------------------------------------------------------------------- */
function initProjectViewToggle() {
  const deckBtn  = document.getElementById('view-deck-btn');
  const gridBtn  = document.getElementById('view-grid-btn');
  const deckEl   = document.getElementById('story-deck');
  const gridEl   = document.getElementById('projects-grid');
  const navWrap  = document.getElementById('story-nav-wrap');
  const progress = document.getElementById('story-progress');
  if (!deckBtn || !gridBtn || !deckEl || !gridEl) return;

  deckBtn.addEventListener('click', () => {
    deckBtn.classList.add('active');
    gridBtn.classList.remove('active');
    deckEl.style.display = 'block';
    gridEl.classList.add('hidden-grid');
    if (navWrap) navWrap.style.display = 'flex';
    if (progress) progress.style.display = 'flex';
  });

  gridBtn.addEventListener('click', () => {
    gridBtn.classList.add('active');
    deckBtn.classList.remove('active');
    deckEl.style.display = 'none';
    gridEl.classList.remove('hidden-grid');
    if (navWrap) navWrap.style.display = 'none';
    if (progress) progress.style.display = 'none';
  });
}

/* --------------------------------------------------------------------------
   12. SYSTEM ARCHITECTURE & PARTICLES
   -------------------------------------------------------------------------- */
function initSystemArchitecture() {
  const container  = document.getElementById('system-architecture-canvas');
  const canvas     = document.getElementById('data-particles-canvas');
  const toggleBtns = document.querySelectorAll('.sys-toggle-btn');
  if (!container || !toggleBtns.length) return;

  const state = { frontend: true, backend: true, database: true };

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const layer = btn.getAttribute('data-layer');
      state[layer] = !state[layer];
      btn.classList.toggle('active', state[layer]);
      const lbl = btn.querySelector('.toggle-state');
      if (lbl) lbl.textContent = state[layer] ? 'ON' : 'OFF';
      syncState();
    });
  });

  function syncState() {
    ['frontend', 'backend', 'database'].forEach(n => {
      document.getElementById(`layer-${n}`)?.classList.toggle('layer-off', !state[n]);
    });

    const fbOk = state.frontend && state.backend;
    const bdOk = state.backend  && state.database;
    setConn('conn-fb', fbOk);
    setConn('conn-bd', bdOk);

    ['frontend', 'backend', 'database'].forEach(n => updateRow(n, state[n]));

    let msg = 'SYSTEM OPERATIONAL', offline = false;
    if (!state.frontend && !state.backend && !state.database) { msg = 'SYSTEM SHUTDOWN'; offline = true; }
    else if (!state.frontend) { msg = 'FRONTEND OFFLINE';    offline = true; }
    else if (!state.backend)  { msg = 'API DISCONNECTED';    offline = true; }
    else if (!state.database) { msg = 'DB DISCONNECTED';     offline = true; }

    const banner = document.getElementById('system-banner');
    const txt    = document.getElementById('system-status-text');
    if (txt)    txt.textContent = msg;
    if (banner) banner.classList.toggle('offline', offline);

    // Update metrics
    const latEl = document.getElementById('metric-latency');
    const tpsEl = document.getElementById('metric-tps');
    if (latEl) latEl.textContent = offline ? 'N/A' : `~${Math.floor(Math.random() * 5 + 10)}ms`;
    if (tpsEl) tpsEl.textContent = offline ? '0 req/s' : `${Math.floor(Math.random() * 30 + 120)} req/s`;
  }

  function setConn(id, active) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('active-conn', active);
    el.classList.toggle('conn-broken', !active);
  }

  function updateRow(name, on) {
    const row   = document.getElementById(`status-row-${name}`);
    const label = document.getElementById(`status-label-${name}`);
    if (!row) return;
    row.querySelector('.sys-status-dot')?.classList.toggle('active-dot', on);
    if (label) {
      label.textContent = on ? 'RUNNING' : 'OFFLINE';
      label.classList.toggle('running',       on);
      label.classList.toggle('offline-label', !on);
    }
  }

  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width  = container.clientWidth;
    canvas.height = container.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function spawn(connId) {
    const conn = document.getElementById(connId);
    if (!conn) return;
    const cr = container.getBoundingClientRect();
    const lr = conn.getBoundingClientRect();
    particles.push({
      x:       lr.left - cr.left + lr.width / 2,
      y:       lr.top  - cr.top,
      targetY: lr.bottom - cr.top,
      speed:   Math.random() * 2.2 + 1.4,
      radius:  Math.random() * 1.8 + 1.0,
    });
  }

  let lastSpawn = 0;
  function draw(ts) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (ts - lastSpawn > 280) {
      if (state.frontend && state.backend)  spawn('conn-fb');
      if (state.backend  && state.database) spawn('conn-bd');
      lastSpawn = ts;
    }
    particles = particles.filter(p => {
      p.y += p.speed;
      if (p.y >= p.targetY) return false;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.85)';
      ctx.shadowColor = '#06B6D4';
      ctx.shadowBlur  = 10;
      ctx.fill();
      return true;
    });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

/* --------------------------------------------------------------------------
   13. INTERACTIVE TERMINAL CLI PANEL
   -------------------------------------------------------------------------- */
function initTerminalCLI() {
  const cliInput   = document.getElementById('terminal-cli-input');
  const cliBody    = document.getElementById('terminal-body-content');
  const copyEmail  = document.getElementById('copy-email-btn');

  copyEmail?.addEventListener('click', () => {
    navigator.clipboard.writeText('abhinav.dev.01@gmail.com').then(() => {
      showToast('Email address copied to clipboard! 📬');
    });
  });

  if (!cliInput || !cliBody) return;

  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = cliInput.value.trim().toLowerCase();
      cliInput.value = '';
      if (!val) return;

      appendOutput(`abhinav@cli:~$ ${val}`, 'term-prompt');
      processCommand(val);
      cliBody.scrollTop = cliBody.scrollHeight;
    }
  });

  function appendOutput(text, className = '') {
    const p = document.createElement('p');
    if (className) p.className = className;
    p.textContent = text;
    cliBody.appendChild(p);
  }

  function processCommand(cmd) {
    switch (cmd) {
      case 'help':
        appendOutput('Available commands:', 'term-info');
        appendOutput('  skills   - List technical core stack');
        appendOutput('  projects - Display featured works');
        appendOutput('  contact  - Get direct contact email');
        appendOutput('  clear    - Clear terminal screen');
        appendOutput('  hire     - Send quick hire interest message');
        break;
      case 'skills':
        appendOutput('> React, Next.js, Node.js, TypeScript, PostgreSQL, MongoDB, Docker, Redis', 'term-success');
        break;
      case 'projects':
        appendOutput('> 01 JeevaLink (Blood Donation) | 02 LibGo (Digital Library) | 03 Exam System', 'term-success');
        break;
      case 'contact':
        appendOutput('> Email: abhinav.dev.01@gmail.com', 'term-success');
        break;
      case 'clear':
        cliBody.innerHTML = '';
        appendOutput('abhinav@cli:~$ terminal cleared', 'term-muted');
        break;
      case 'hire':
        appendOutput('> Awesome! Drop a message in the form on the right or email abhinav.dev.01@gmail.com directly 🚀', 'term-success');
        showToast('Form highlighted for contact! 🚀');
        document.getElementById('contact-name')?.focus();
        break;
      default:
        appendOutput(`Command not recognized: '${cmd}'. Type 'help' for options.`, 'term-muted');
    }
  }
}

/* --------------------------------------------------------------------------
   14. MOBILE MENU
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const btn     = document.getElementById('mobile-menu-btn');
  const overlay = document.getElementById('mobile-overlay');
  if (!btn || !overlay) return;

  btn.addEventListener('click', () => {
    const open = overlay.classList.toggle('active');
    btn.textContent = open ? 'CLOSE' : 'MENU';
  });

  overlay.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    overlay.classList.remove('active');
    btn.textContent = 'MENU';
  }));
}

/* --------------------------------------------------------------------------
   15. CONTACT FORM + TOAST NOTIFICATION SYSTEM
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form    = document.getElementById('contact-form');
  if (!form) return;

  const nameEl  = document.getElementById('contact-name');
  const emailEl = document.getElementById('contact-email');
  const msgEl   = document.getElementById('contact-message');

  function validate(input, wrapperId) {
    const wrap = document.getElementById(wrapperId);
    if (!wrap) return true;
    const valid = input.type === 'email'
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())
      : input.value.trim().length > 0;
    wrap.classList.toggle('has-error', !valid);
    return valid;
  }

  [nameEl, emailEl, msgEl].forEach(inp => {
    if (!inp) return;
    inp.addEventListener('input', () => {
      const wrap = inp.closest('.form-field');
      if (wrap?.classList.contains('has-error')) validate(inp, wrap.id);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v1 = validate(nameEl,  'field-name');
    const v2 = validate(emailEl, 'field-email');
    const v3 = validate(msgEl,   'field-message');

    if (!v1 || !v2 || !v3) {
      showToast('Please fill in all required fields accurately.');
      return;
    }

    showToast('Message sent! Abhinav will respond to your inquiry shortly. 👋');
    form.reset();
    document.querySelectorAll('.form-field').forEach(f => f.classList.remove('has-error'));
  });
}

function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✨</span> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.35s, transform 0.35s';
    toast.style.opacity    = '0';
    toast.style.transform  = 'translateY(8px)';
    setTimeout(() => toast.remove(), 400);
  }, 3800);
}
