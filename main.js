/* ==========================================================================
   ABHINAV.DEV — Clean, Humanized Portfolio Controller
   ========================================================================== */

import { createIcons, icons } from 'lucide';

// Brand icons matching Lucide 24x24 standard specifications
export const customIcons = {
  ...icons,
  Github: [
    ['path', { d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' }],
    ['path', { d: 'M9 18c-4.51 2-5-2-7-2' }]
  ],
  Linkedin: [
    ['path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }],
    ['rect', { width: '4', height: '12', x: '2', y: '9' }],
    ['circle', { cx: '4', cy: '4', r: '2' }]
  ]
};

export function renderLucideIcons(root = document) {
  createIcons({
    icons: customIcons,
    nameAttr: 'data-lucide',
    attrs: {
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    },
    root
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderLucideIcons();
  initThemeSwitcher();
  initScrollProgress();
  initHeroTyping();
  initHeroVisualStage();
  initScrollSpy();
  initTextRevealObserver();
  initCopyEmail();
  initContactForm();
});

/* --------------------------------------------------------------------------
   01. THEME SWITCHER (DARK LEMON / LIGHT LEMON)
   -------------------------------------------------------------------------- */
function initThemeSwitcher() {
  const themeBtns = document.querySelectorAll('[data-set-theme]');
  const toggleBtns = document.querySelectorAll('#mobile-theme-toggle, #project-theme-toggle, .mobile-theme-toggle, [data-action="toggle-theme"]');
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
      showToast(`Switched to ${t === 'cosmos' ? 'Dark Lemon' : 'Light Lemon'} theme`);
    });
  });

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const nextTheme = currentTheme === 'cosmos' ? 'light' : 'cosmos';
      applyTheme(nextTheme);
      showToast(`Switched to ${nextTheme === 'cosmos' ? 'Dark Lemon' : 'Light Lemon'} theme`);
    });
  });
}

/* --------------------------------------------------------------------------
   02. SCROLL PROGRESS BAR & BACK TO TOP BUTTON
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
      backToTopBtn.classList.toggle('visible', scrollTop > 400);
    }
  }, { passive: true });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   03. HERO DYNAMIC TYPING EFFECT
   -------------------------------------------------------------------------- */
function initHeroTyping() {
  const textEl = document.getElementById('typing-hero');
  if (!textEl) return;

  const words = ['applications.', 'REST APIs.', 'digital products.', 'user interfaces.'];
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

    let delay = isDeleting ? 50 : 100;

    if (!isDeleting && charIdx === currentWord.length) {
      delay = 2400;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      delay = 350;
    }

    setTimeout(typeStep, delay);
  }

  setTimeout(typeStep, 2500);
}

/* --------------------------------------------------------------------------
   04. HERO VIDEO CONTROLLER
   -------------------------------------------------------------------------- */
function initHeroVisualStage() {
  const video = document.getElementById('hero-avatar-video');
  const stage = document.querySelector('.hero-video-stage');

  if (video) {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const resumePlayback = () => {
          video.play().catch(() => { });
          window.removeEventListener('click', resumePlayback);
          window.removeEventListener('touchstart', resumePlayback);
          window.removeEventListener('scroll', resumePlayback);
        };
        window.addEventListener('click', resumePlayback, { once: true });
        window.addEventListener('touchstart', resumePlayback, { once: true });
        window.addEventListener('scroll', resumePlayback, { once: true });
      });
    }
  }

  if (!stage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const heroSection = document.getElementById('home');
  if (!heroSection) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentTiltX = 0;
  let currentTiltY = 0;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    mouseY = (e.clientY - rect.top) / rect.height - 0.5;
  }, { passive: true });

  heroSection.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
  });

  function renderTilt() {
    currentTiltX += (mouseY * -5 - currentTiltX) * 0.08;
    currentTiltY += (mouseX * 7 - currentTiltY) * 0.08;

    if (window.innerWidth > 1024) {
      stage.style.transform = `perspective(1000px) rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;
    } else {
      stage.style.transform = '';
    }

    requestAnimationFrame(renderTilt);
  }

  requestAnimationFrame(renderTilt);
}

/* --------------------------------------------------------------------------
   05. SCROLL SPY
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const navItems = document.querySelectorAll('.side-nav-item');
  const dockItems = document.querySelectorAll('.dock-item');
  const sections = document.querySelectorAll('section');
  if (!sections.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(item => {
          item.classList.toggle('active', item.getAttribute('data-section') === id);
        });
        dockItems.forEach(item => {
          item.classList.toggle('active', item.getAttribute('data-section') === id);
        });
      }
    });
  }, { threshold: 0.25, rootMargin: '-10% 0px -50% 0px' });

  sections.forEach(sec => obs.observe(sec));
}

/* --------------------------------------------------------------------------
   06. TEXT REVEAL & FADE OBSERVER
   -------------------------------------------------------------------------- */
function initTextRevealObserver() {
  const targets = document.querySelectorAll('.fade-up');
  if (!targets.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(t => obs.observe(t));
}

/* --------------------------------------------------------------------------
   07. 1-CLICK COPY EMAIL
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('abhinav.dev.01@gmail.com').then(() => {
      copyBtn.innerHTML = '<i data-lucide="check" style="width: 13px; height: 13px;"></i> Copied!';
      copyBtn.classList.add('copied');
      renderLucideIcons(copyBtn);
      showToast('Email address copied to clipboard!');
      setTimeout(() => {
        copyBtn.innerHTML = '<i data-lucide="copy" style="width: 13px; height: 13px;"></i> Copy';
        copyBtn.classList.remove('copied');
        renderLucideIcons(copyBtn);
      }, 2500);
    });
  });
}

/* --------------------------------------------------------------------------
   08. CONTACT FORM HANDLER
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameEl = document.getElementById('contact-name');
  const emailEl = document.getElementById('contact-email');
  const msgEl = document.getElementById('contact-message');

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
    const v1 = validate(nameEl, 'field-name');
    const v2 = validate(emailEl, 'field-email');
    const v3 = validate(msgEl, 'field-message');

    if (!v1 || !v2 || !v3) {
      showToast('Please fill in all required fields.');
      return;
    }

    showToast('Message sent! Abhinav will get back to you shortly. 👋');
    form.reset();
    document.querySelectorAll('.form-field').forEach(f => f.classList.remove('has-error'));
  });
}

/* --------------------------------------------------------------------------
   09. TOAST NOTIFICATIONS
   -------------------------------------------------------------------------- */
function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i data-lucide="check" style="width: 14px; height: 14px; flex-shrink: 0; color: var(--accent-light);"></i> <span>${msg}</span>`;
  container.appendChild(toast);
  renderLucideIcons(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(6px)';
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}
