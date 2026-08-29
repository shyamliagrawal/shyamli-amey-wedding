const header = document.querySelector('.site-header');
const opening = document.querySelector('.opening');

const host = new URLSearchParams(window.location.search).get('host')?.toLowerCase();
const isHindi = document.documentElement.lang === 'hi';
const invitationVariants = {
  en: {
    a: {
      blessing: 'With the blessings of Padma and Inderchand Agrawal',
      hostLine: {
        family: 'Sunita and Dipak Agrawal',
        invitation: 'joyfully invite you',
        occasion: 'to celebrate the wedding of their son',
      },
      coupleName: 'Amey and Shyamli',
      wordmark: 'hero-wordmark-amey-first.png',
      partnerLine: 'daughter of Kavita and Ramavtar Agrawal',
      footer: [
        'Cordially inviting you',
        'Padma & Inderchand Agrawal',
        'Sunita & Dipak Agrawal ✦ Nitin Agrawal',
      ],
    },
    s: {
      blessing: 'With the blessings of Kaveri and Vasudeo Agrawal',
      hostLine: {
        family: 'Kavita and Ramavtar Agrawal',
        invitation: 'joyfully invite you',
        occasion: 'to celebrate the wedding of their daughter',
      },
      coupleName: 'Shyamli and Amey',
      wordmark: 'hero-wordmark-v2.png',
      partnerLine: 'son of Sunita and Dipak Agrawal',
      footer: [
        'Cordially inviting you',
        'The Agrawal family, Shegaon',
      ],
    },
  },
  hi: {
    a: {
      blessing: 'पद्मा एवं इंदरचंद अग्रवाल के शुभाशीष से',
      hostLine: {
        family: 'सुनीता एवं दीपक अग्रवाल',
        invitation: 'आपको अपने सुपुत्र के',
        occasion: 'शुभ विवाह में सादर आमंत्रित करते हैं',
      },
      coupleName: 'अमेय और श्यामली',
      wordmark: '../hero-wordmark-hindi-amey-first.png',
      partnerLine: 'सुपुत्री कविता एवं रामावतार अग्रवाल',
      footer: [
        'सस्नेह आमंत्रण',
        'पद्मा एवं इंदरचंद अग्रवाल',
        'सुनीता एवं दीपक अग्रवाल ✦ नितिन अग्रवाल',
      ],
    },
    s: {
      blessing: 'कावेरी एवं वासुदेव अग्रवाल के शुभाशीष से',
      hostLine: {
        family: 'कविता एवं रामावतार अग्रवाल',
        invitation: 'आपको अपनी सुपुत्री के',
        occasion: 'शुभ विवाह में सादर आमंत्रित करते हैं',
      },
      coupleName: 'श्यामली और अमेय',
      wordmark: '../hero-wordmark-hindi-v3.png',
      partnerLine: 'सुपुत्र सुनीता एवं दीपक अग्रवाल',
      footer: [
        'सस्नेह आमंत्रण',
        'अग्रवाल परिवार, शेगांव',
      ],
    },
  },
};

const invitation = invitationVariants[isHindi ? 'hi' : 'en'][host];
if (invitation) {
  const blessing = document.querySelector('#hero-blessing');
  const hostLine = document.querySelector('#hero-host-line');
  const coupleName = document.querySelector('#hero-couple-name');
  const wordmark = document.querySelector('#hero-wordmark');
  const partnerLine = document.querySelector('#hero-partner-line');
  const footer = document.querySelector('#footer-family-text');

  document.body.classList.add('hosted-invitation', `host-${host}`);
  blessing.textContent = invitation.blessing;
  blessing.hidden = false;
  const familyName = document.createElement('span');
  familyName.className = 'hero-host-family';
  familyName.textContent = invitation.hostLine.family;
  const invitationLead = document.createElement('span');
  invitationLead.className = 'hero-host-invitation';
  invitationLead.textContent = invitation.hostLine.invitation;
  const primaryLine = document.createElement('span');
  primaryLine.className = 'hero-host-primary';
  primaryLine.append(familyName, document.createTextNode(' '), invitationLead);
  const occasion = document.createElement('span');
  occasion.className = 'hero-host-occasion';
  occasion.textContent = invitation.hostLine.occasion;
  hostLine.replaceChildren(primaryLine, occasion);
  coupleName.textContent = invitation.coupleName;
  wordmark.src = invitation.wordmark;
  wordmark.alt = invitation.coupleName;
  partnerLine.textContent = invitation.partnerLine;
  if (Array.isArray(invitation.footer)) {
    footer.replaceChildren(...invitation.footer.map((line, index) => {
      const row = document.createElement('span');
      row.className = index === 0 ? 'footer-invitation-heading' : 'footer-invitation-line';
      const parts = line.split(' ✦ ');
      row.append(document.createTextNode(parts[0]));
      if (parts.length > 1) {
        const separator = document.createElement('i');
        separator.className = 'footer-separator';
        separator.setAttribute('aria-hidden', 'true');
        separator.textContent = '✦';
        row.append(separator, document.createTextNode(parts[1]));
      }
      return row;
    }));
  } else {
    footer.textContent = invitation.footer;
  }

  const languageSwitch = document.querySelector('.language-switch');
  if (languageSwitch) languageSwitch.href = `${languageSwitch.getAttribute('href')}?host=${host}`;
}

function dismissOpening() {
  requestAnimationFrame(() => opening.classList.add('is-ready'));
}

if (document.readyState === 'complete') {
  dismissOpening();
} else {
  window.addEventListener('load', dismissOpening, { once: true });
}

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 120);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const storySection = document.querySelector('.story');
const storyFlight = storySection?.querySelector('.story-flight');
const flightMotions = storyFlight ? [...storyFlight.querySelectorAll('animateMotion')] : [];

if (storySection && storyFlight && flightMotions.length) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const startFlight = () => {
    flightMotions.forEach((motion) => {
      if (reducedMotion) motion.setAttribute('dur', '0.001s');
      motion.beginElement();
    });
    storyFlight.classList.add('flight-started');
  };

  if (reducedMotion) {
    startFlight();
  } else {
    const flightObserver = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      startFlight();
      flightObserver.disconnect();
    }, { threshold: 0.4 });
    flightObserver.observe(storySection);
  }
}

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
