const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 120);
}, { passive: true });

menuButton.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const countdown = document.querySelector('.countdown');
const weddingDate = new Date(countdown.dataset.date).getTime();

function updateCountdown() {
  const remaining = Math.max(0, weddingDate - Date.now());
  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining / 3600000) % 24),
    minutes: Math.floor((remaining / 60000) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
  };

  Object.entries(values).forEach(([unit, value]) => {
    countdown.querySelector(`[data-unit="${unit}"]`).textContent = String(value).padStart(unit === 'days' ? 3 : 2, '0');
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

document.querySelectorAll('details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (!detail.open) return;
    document.querySelectorAll('details[open]').forEach((other) => {
      if (other !== detail) other.open = false;
    });
  });
});
