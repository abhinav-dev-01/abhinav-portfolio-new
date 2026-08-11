/* ==========================================================================
   ABHINAV.DEV — Premium Portfolio Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initCustomCursor();
  initScrollSpy();
  initTextRevealObserver();
  initProjectsStoryDeck();
  initSystemArchitecture();
  initMobileMenu();
  initContactForm();
});

/* --------------------------------------------------------------------------
   01. LOADING SCREEN
   -------------------------------------------------------------------------- */
function initLoadingScreen() {
  const screen     = document.getElementById('loading-screen');
  const fill       = document.getElementById('loader-progress-fill');
  const ring       = document.getElementById('loader-ring-circle');
  const percent    = document.getElementById('loader-percent');
  const statusEl   = document.getElementById('loader-status');
  const tagline    = document.getElementById('loader-tagline');
  const nameChars  = document.querySelectorAll('.loader-name-char');
  if (!screen) return;

  const CIRCUMFERENCE = 2 * Math.PI * 35; // r=35
  const steps = [
    { at: 0,   label: 'INITIALIZING' },
    { at: 15,  label: 'LOADING ASSETS' },
    { at: 40,  label: 'BUILDING UI' },
    { at: 70,  label: 'ALMOST READY' },
    { at: 90,  label: 'FINISHING UP' },
    { at: 100, label: 'READY' },
  ];

  let progress = 0;
  let rafId;
  let startTime = null;
  const TOTAL_DURATION = 2200; // ms

  function easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
  }

  function updateProgress(ts) {
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;
    const raw = Math.min(elapsed / TOTAL_DURATION, 1);
    progress = Math.round(easeInOutQuart(raw) * 100);

    // Update fill bar
    if (fill) fill.style.width = `${progress}%`;

    // Update SVG ring
    if (ring) {
      const offset = CIRCUMFERENCE * (1 - progress / 100);
      ring.style.strokeDashoffset = offset;
    }

    // Update percent text
    if (percent) percent.textContent = `${String(progress).padStart(3, '0')}%`;

    // Update status label
    const currentStep = steps.reduce((acc, s) => progress >= s.at ? s : acc, steps[0]);
    if (statusEl) statusEl.textContent = currentStep.label;

    // Reveal name chars progressively
    const charsToShow = Math.floor((progress / 100) * nameChars.length);
    nameChars.forEach((c, i) => {
      if (i < charsToShow) c.classList.add('shown');
    });

    // Show tagline when 75%+
    if (progress >= 75 && tagline) tagline.classList.add('shown');

    if (raw < 1) {
      rafId = requestAnimationFrame(updateProgress);
    } else {
      // Done — short pause then hide
      setTimeout(finishLoading, 400);
    }
  }

  function finishLoading() {
    // Ensure all chars shown
    nameChars.forEach(c => c.classList.add('shown'));
    if (tagline) tagline.classList.add('shown');

    setTimeout(() => {
      screen.classList.add('hidden');
      document.body.classList.remove('is-loading');

      // Trigger hero reveal after loading
      const heroSection = document.getElementById('home');
      if (heroSection) {
        setTimeout(() => heroSection.classList.add('is-visible'), 100);
      }

      setTimeout(() => screen.remove(), 700);
    }, 300);
  }

  rafId = requestAnimationFrame(updateProgress);
}

/* --------------------------------------------------------------------------
   02. CUSTOM CURSOR
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const dot    = document.getElementById('cursor-dot');
  const circle = document.getElementById('cursor-circle');
  if (!cursor || !dot || !circle) return;

  let mouseX = window.innerWidth / 2,  mouseY = window.innerHeight / 2;
  let circX  = mouseX,                  circY  = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  (function render() {
    circX += (mouseX - circX) * 0.12;
    circY += (mouseY - circY) * 0.12;
    dot.style.left    = `${mouseX}px`;
    dot.style.top     = `${mouseY}px`;
    circle.style.left = `${circX}px`;
    circle.style.top  = `${circY}px`;
    requestAnimationFrame(render);
  })();

  document.querySelectorAll('.project-view-link, .slide-image-mask').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover-project'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover-project'));
  });

  document.querySelectorAll('.magnetic-target, a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (!cursor.classList.contains('hover-project')) cursor.classList.add('hover-target');
    });
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover-target'));
  });
}

/* --------------------------------------------------------------------------
   03. SCROLL SPY
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const navItems = document.querySelectorAll('.side-nav-item');
  const sections = document.querySelectorAll('section');
  if (!navItems.length || !sections.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item =>
          item.classList.toggle('active', item.getAttribute('data-section') === id)
        );
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => obs.observe(s));
}

/* --------------------------------------------------------------------------
   04. TEXT REVEAL & FADE-UP OBSERVER
   -------------------------------------------------------------------------- */
function initTextRevealObserver() {
  const targets = document.querySelectorAll('.cinematic-section');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.1 });

  targets.forEach(t => obs.observe(t));
}

/* --------------------------------------------------------------------------
   05. PROJECTS STORY DECK
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

  // Auto-advance every 6s
  let autoTimer = setInterval(() => goTo((current + 1) % slides.length), 6000);

  [prevBtn, nextBtn].forEach(btn => btn?.addEventListener('click', () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo((current + 1) % slides.length), 6000);
  }));
}

/* --------------------------------------------------------------------------
   06. SYSTEM ARCHITECTURE
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
    if (!state.frontend && !state.backend && !state.database) { msg = 'SYSTEM SHUTDOWN';      offline = true; }
    else if (!state.frontend) { msg = 'FRONTEND OFFLINE';    offline = true; }
    else if (!state.backend)  { msg = 'API CONNECTION LOST'; offline = true; }
    else if (!state.database) { msg = 'DB DISCONNECTED';     offline = true; }

    const banner = document.getElementById('system-banner');
    const txt    = document.getElementById('system-status-text');
    if (txt)    txt.textContent = msg;
    if (banner) banner.classList.toggle('offline', offline);
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

  // Particles
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
      speed:   Math.random() * 2 + 1.2,
      radius:  Math.random() * 1.5 + 0.8,
    });
  }

  let lastSpawn = 0;
  function draw(ts) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (ts - lastSpawn > 300) {
      if (state.frontend && state.backend)  spawn('conn-fb');
      if (state.backend  && state.database) spawn('conn-bd');
      lastSpawn = ts;
    }
    particles = particles.filter(p => {
      p.y += p.speed;
      if (p.y >= p.targetY) return false;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.8)';
      ctx.shadowColor = '#06B6D4';
      ctx.shadowBlur  = 8;
      ctx.fill();
      return true;
    });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

/* --------------------------------------------------------------------------
   07. MOBILE MENU
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
   08. CONTACT FORM + TOAST
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
    if (!v1 || !v2 || !v3) { showToast('Please fill in all required fields.'); return; }
    showToast('Message sent! Abhinav will get back to you soon. 👋');
    form.reset();
    document.querySelectorAll('.form-field').forEach(f => f.classList.remove('has-error'));
  });
}

function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className   = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity 0.35s, transform 0.35s';
    toast.style.opacity    = '0';
    toast.style.transform  = 'translateY(8px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
