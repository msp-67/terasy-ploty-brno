/* =========================================
   NAVIGATION — scroll state + active link
   ========================================= */
(function () {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile-menu');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link, .nav__link');

  // Scroll-triggered nav shadow
  function handleNavScroll() {
    if (nav) {
      nav.classList.toggle('is-scrolled', window.scrollY > 20);
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);
    });

    // Close on link click
    mobileMenu.querySelectorAll('.nav__mobile-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        mobileMenu.classList.contains('is-open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        mobileMenu.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
        document.body.classList.remove('menu-open');
      }
    });
  }

  // Active link highlight — match current page filename
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  mobileLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (
      href === currentPath ||
      (currentPath === '' && href === 'index.html') ||
      (currentPath === 'index.html' && href === 'index.html')
    ) {
      link.classList.add('is-active');
    }
  });
})();


/* =========================================
   CONTACT FORM — Make.com webhook via fetch
   ========================================= */
(function () {
  var WEBHOOK_URL = 'https://hook.eu1.make.com/8dqkciicilt78a471ntc1g227fw6pkwb';

  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Focus first empty required field and bail
    var requiredFields = form.querySelectorAll('[required]');
    for (var i = 0; i < requiredFields.length; i++) {
      if (!requiredFields[i].value.trim()) {
        requiredFields[i].focus();
        return;
      }
    }

    // Collect field values
    var payload = {
      jmeno:    form.querySelector('#jmeno').value.trim(),
      prijmeni: form.querySelector('#prijmeni').value.trim(),
      email:    form.querySelector('#email').value.trim(),
      telefon:  form.querySelector('#telefon').value.trim(),
      mesto:    form.querySelector('#mesto').value.trim(),
      zprava:   form.querySelector('#zprava').value.trim()
    };

    // Disable button, show loading state
    var submitBtn = form.querySelector('[type="submit"]');
    var originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Odesílám...';

    // Clear any previous inline error
    var prevError = form.querySelector('.form-error');
    if (prevError) prevError.remove();

    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(function (response) {
      if (!response.ok) throw new Error('HTTP ' + response.status);

      // Success: swap form content for confirmation
      form.innerHTML = [
        '<div class="contact-form__success" role="status" aria-live="polite">',
        '  <div class="contact-form__success-icon" aria-hidden="true">',
        '    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"',
        '         fill="none" stroke="currentColor" stroke-width="1.8"',
        '         stroke-linecap="round" stroke-linejoin="round">',
        '      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>',
        '      <path d="m9 11 3 3L22 4"/>',
        '    </svg>',
        '  </div>',
        '  <h3 class="contact-form__success-title">Děkujeme za zprávu!</h3>',
        '  <p class="contact-form__success-text">Ozveme se vám co nejdříve.</p>',
        '</div>'
      ].join('\n');
    })
    .catch(function () {
      // Error: restore button, show inline error message
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;

      var errorDiv = document.createElement('div');
      errorDiv.className = 'form-error';
      errorDiv.setAttribute('role', 'alert');
      errorDiv.textContent = 'Něco se pokazilo. Zkuste to prosím znovu nebo nás kontaktujte telefonicky.';
      form.querySelector('.form-submit').insertAdjacentElement('beforebegin', errorDiv);
    });
  });
})();


/* =========================================
   FADE-IN ON SCROLL — Intersection Observer
   ========================================= */
(function () {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    // Fallback: show all immediately
    elements.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach(function (el) { observer.observe(el); });
})();
