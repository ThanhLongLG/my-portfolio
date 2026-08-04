const THEME_STORAGE_KEY = 'theme';

function setupNavigation() {
  const menuButton = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-links');
  if (!menuButton || !menu) return;

  const setMenuOpen = open => {
    menu.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  };

  menuButton.addEventListener('click', () => {
    setMenuOpen(!menu.classList.contains('open'));
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });
}

function setupThemeToggle() {
  const themeButton = document.querySelector('.theme-toggle');
  const isLightTheme = () => document.documentElement.classList.contains('light');
  const setTheme = theme => {
    const light = theme === 'light';
    document.documentElement.classList.toggle('light', light);
    themeButton?.setAttribute('aria-pressed', String(light));
  };

  setTheme(localStorage.getItem(THEME_STORAGE_KEY) || 'dark');
  themeButton?.addEventListener('click', () => {
    const theme = isLightTheme() ? 'dark' : 'light';
    setTheme(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  });
}

function setupContactForm() {
  const form = document.querySelector('.contact-form[data-email-recipient]');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = data.get('name')?.trim() || '';
    const email = data.get('email')?.trim() || '';
    const message = data.get('message')?.trim() || '';
    const subject = `Portfolio message from ${name || email}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const query = new URLSearchParams({
      view: 'cm',
      fs: '1',
      to: form.dataset.emailRecipient,
      su: subject,
      body
    });

    window.location.href = `https://mail.google.com/mail/?${query}`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupThemeToggle();
  setupContactForm();

  const role = document.getElementById('typing-role');
  if (role) {
    const roles = (role.dataset.roles || role.textContent).split('|');
    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    setInterval(() => {
      const currentRole = roles[roleIndex];
      role.textContent = currentRole.slice(0, deleting ? --characterIndex : ++characterIndex);
      if (!deleting && characterIndex === currentRole.length) deleting = true;
      if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }, 110);
  }
});
