const header = document.querySelector('.site-header');
const opening = document.querySelector('.opening');

const host = new URLSearchParams(window.location.search).get('host')?.toLowerCase();
const isHindi = document.documentElement.lang === 'hi';
const invitationVariants = {
  en: {
    a: {
      blessing: 'With the blessings of Sau. Padma-devi and Dr Inderchandji Agrawal',
      hostLine: {
        family: 'Dr Sunita and Dr Dipak Agrawal',
        invitation: 'joyfully invite you',
        occasion: 'to celebrate the wedding of their son',
      },
      coupleName: 'Amey and Shyamli',
      wordmark: 'hero-wordmark-amey-first.png',
      partnerLine: 'daughter of Kavitaji and Ramavtarji Agrawal',
      footer: [
        'Cordially inviting you',
        'Sau. Padma-devi & Dr Inderchandji Agrawal',
        'Sau. Laxmi-devi & Sunilji Agrawal',
        'Dr Sunita & Dr Dipak Agrawal ✦ Nitin Agrawal',
        'With best compliments',
        'Anirudha & Aparna',
      ],
    },
    s: {
      invocations: [
        'Shree Gajanan Maharaj Prasanna',
        'By the grace of Khatu Shyam and Mansa Mata',
      ],
      blessing: 'With the blessings of Late Kaveri-bai and Late Vasudeoji Agrawal',
      hostLine: {
        family: 'Kavita and Ramavtar Agrawal',
        invitation: 'joyfully invite you',
        occasion: 'to celebrate the wedding of their daughter',
      },
      coupleName: 'Shyamli and Amey',
      wordmark: 'hero-wordmark-v2.png',
      partnerLine: [
        'son of Dr Sunitaji and Dr Dipakji Agrawal',
        'grandson of Sau. Padma-devi and Dr Inderchandji Agrawal',
      ],
      footer: [
        'Cordially inviting you',
        'Murari Agrawal ✦ Vijay Agrawal',
        'Ramavtar Agrawal ✦ Mayur Agrawal',
      ],
    },
  },
  hi: {
    a: {
      blessing: 'सौ. पद्मा देवी एवं डॉ. इंदरचंदजी अग्रवाल के शुभाशीष से',
      hostLine: {
        family: 'डॉ. सुनीता एवं डॉ. दीपक अग्रवाल',
        invitation: 'आपको अपने सुपुत्र के',
        occasion: 'शुभ विवाह में सादर आमंत्रित करते हैं',
      },
      coupleName: 'अमेय और श्यामली',
      wordmark: '../hero-wordmark-hindi-amey-first.png',
      partnerLine: 'सुपुत्री कविताजी एवं रामअवतारजी अग्रवाल',
      footer: [
        'सस्नेह आमंत्रण',
        'सौ. पद्मा देवी एवं डॉ. इंदरचंदजी अग्रवाल',
        'सौ. लक्ष्मी देवी एवं सुनीलजी अग्रवाल',
        'डॉ. सुनीता एवं डॉ. दीपक अग्रवाल ✦ नितिन अग्रवाल',
        'शुभकामनाओं सहित',
        'अनिरुद्ध एवं अपर्णा',
      ],
    },
    s: {
      invocations: [
        'श्री गजानन महाराज प्रसन्न',
        'खाटू श्याम एवं मनसा माता की असीम कृपा से हमारे यहाँ',
      ],
      hostLine: [
        'कविता एवं रामअवतार अग्रवाल की सुपुत्री',
        'स्व. कावेरीबाई एवं स्व. वासुदेवजी अग्रवाल की सुपौत्री',
      ],
      coupleName: 'श्यामली और अमेय',
      wordmark: '../hero-wordmark-hindi-v3.png',
      partnerLine: [
        'डॉ. सुनीताजी एवं डॉ. दीपकजी अग्रवाल के सुपुत्र',
        'सौ. पद्मा देवी एवं डॉ. इंदरचंदजी अग्रवाल के सुपौत्र',
      ],
      closingLine: 'के मंगल परिणय के शुभ अवसर पर हम आपको सादर आमंत्रित करते हैं',
      footer: [
        'सस्नेह आमंत्रण',
        'मुरारी अग्रवाल ✦ विजय अग्रवाल',
        'रामअवतार अग्रवाल ✦ मयुर अग्रवाल',
      ],
    },
  },
};

const invitation = invitationVariants[isHindi ? 'hi' : 'en'][host];
if (invitation) {
  const invocations = document.querySelector('#hero-invocations');
  const blessing = document.querySelector('#hero-blessing');
  const hostLine = document.querySelector('#hero-host-line');
  const coupleName = document.querySelector('#hero-couple-name');
  const wordmark = document.querySelector('#hero-wordmark');
  const partnerLine = document.querySelector('#hero-partner-line');
  const footer = document.querySelector('#footer-family-text');

  document.body.classList.add('hosted-invitation', `host-${host}`);
  if (invitation.invocations) {
    invocations.replaceChildren(...invitation.invocations.map((line, index) => {
      const row = document.createElement('span');
      row.className = 'hero-invocation-line';
      if (index === 0) {
        const openingMark = document.createElement('i');
        openingMark.textContent = '॥';
        const closingMark = openingMark.cloneNode(true);
        row.append(openingMark, document.createTextNode(line), closingMark);
      } else {
        row.textContent = line;
      }
      return row;
    }));
    invocations.hidden = false;
  }
  if (invitation.blessing) {
    const blessingLead = 'With the blessings of ';
    if (invitation.blessing.startsWith(blessingLead)) {
      const lead = document.createElement('span');
      lead.textContent = blessingLead.trim();
      const names = document.createElement('span');
      names.className = 'hero-blessing-names';
      names.textContent = invitation.blessing.slice(blessingLead.length);
      blessing.replaceChildren(lead, document.createTextNode(' '), names);
    } else {
      blessing.textContent = invitation.blessing;
    }
    blessing.hidden = false;
  }
  if (Array.isArray(invitation.hostLine)) {
    hostLine.replaceChildren(...invitation.hostLine.map((line) => {
      const row = document.createElement('span');
      row.className = 'hero-host-row';
      row.textContent = line;
      return row;
    }));
  } else {
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
  }
  coupleName.textContent = invitation.coupleName;
  wordmark.src = invitation.wordmark;
  wordmark.alt = invitation.coupleName;
  if (Array.isArray(invitation.partnerLine)) {
    partnerLine.replaceChildren(...invitation.partnerLine.map((line) => {
      const row = document.createElement('span');
      row.className = 'hero-partner-row';
      row.textContent = line;
      return row;
    }));
  } else {
    partnerLine.textContent = invitation.partnerLine;
  }
  if (invitation.closingLine) {
    const closingLine = document.createElement('span');
    closingLine.className = 'hero-invite-closing';
    closingLine.textContent = invitation.closingLine;
    partnerLine.append(closingLine);
  }
  if (Array.isArray(invitation.footer)) {
    footer.replaceChildren(...invitation.footer.map((line, index) => {
      const row = document.createElement('span');
      const isHeading = index === 0 || line === 'With best compliments' || line === 'शुभकामनाओं सहित';
      row.className = isHeading ? 'footer-invitation-heading' : 'footer-invitation-line';
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
