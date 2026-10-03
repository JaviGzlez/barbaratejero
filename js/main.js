// Bárbara Tejero Fotografía · interacciones
(() => {
  /* ---------- Menú móvil ---------- */
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');

  const setMenu = (open) => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  window.matchMedia('(min-width: 1041px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  /* ---------- Cabecera al hacer scroll ---------- */
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Aparición suave ---------- */
  const targets = document.querySelectorAll('.section-head, .session-card, .feature, .about-text, .about-media, .review, .banner-text, .cta-content');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 5) * 70}ms`;
      io.observe(el);
    });
  }

  /* ---------- Año ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* =========================================================
     Cookies
     Ahora la web solo usa almacenamiento técnico. Si algún día
     se añade Google Analytics u otro servicio, cárgalo dentro de
     loadAnalytics(): solo se ejecuta si la persona lo acepta.
     ========================================================= */
  const CONSENT_KEY = 'bt_cookie_consent';
  const CONSENT_DAYS = 365;

  const readConsent = () => {
    try {
      const data = JSON.parse(localStorage.getItem(CONSENT_KEY));
      if (!data || Date.now() - data.date > CONSENT_DAYS * 864e5) return null;
      return data;
    } catch { return null; }
  };
  const saveConsent = (analytics) => {
    const data = { necessary: true, analytics, date: Date.now() };
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(data)); } catch {}
    return data;
  };

  const loadAnalytics = () => {
    // Ejemplo (descomentar y poner el ID si se usa Google Analytics):
    // const s = document.createElement('script');
    // s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
    // document.head.appendChild(s);
    // window.dataLayer = window.dataLayer || [];
    // function gtag(){ dataLayer.push(arguments); }
    // gtag('js', new Date()); gtag('config', 'G-XXXXXXX', { anonymize_ip: true });
  };

  const applyConsent = (c) => { if (c?.analytics) loadAnalytics(); };

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-live', 'polite');
  banner.setAttribute('aria-labelledby', 'cookie-title');
  banner.innerHTML = `
    <h2 id="cookie-title">Tu privacidad</h2>
    <p>Usamos únicamente almacenamiento técnico necesario para que la web funcione y recordar tu elección. Si aceptas, también podremos usar cookies de análisis para mejorar la web. Más información en la <a href="politica-cookies.html">política de cookies</a>.</p>
    <div class="cookie-prefs" id="cookie-prefs">
      <div class="pref">
        <div><strong>Necesarias</strong><span>Imprescindibles para el funcionamiento. Siempre activas.</span></div>
        <label class="switch"><input type="checkbox" checked disabled aria-label="Cookies necesarias"><i></i></label>
      </div>
      <div class="pref">
        <div><strong>Análisis</strong><span>Estadísticas anónimas de visitas.</span></div>
        <label class="switch"><input type="checkbox" id="cookie-analytics" aria-label="Cookies de análisis"><i></i></label>
      </div>
    </div>
    <div class="cookie-actions">
      <button type="button" class="btn btn-primary" data-cookie="accept">Aceptar todas</button>
      <button type="button" class="btn btn-outline" data-cookie="reject">Rechazar</button>
      <button type="button" class="btn btn-outline" data-cookie="config" aria-controls="cookie-prefs" aria-expanded="false">Configurar</button>
    </div>`;
  document.body.appendChild(banner);

  const analyticsInput = banner.querySelector('#cookie-analytics');
  const configBtn = banner.querySelector('[data-cookie="config"]');

  const updateOffset = () => document.body.style.setProperty('--cookie-h', `${banner.offsetHeight + 16}px`);
  const showBanner = (withPrefs = false) => {
    const c = readConsent();
    analyticsInput.checked = !!c?.analytics;
    banner.classList.toggle('show-prefs', withPrefs);
    configBtn.textContent = withPrefs ? 'Guardar selección' : 'Configurar';
    configBtn.setAttribute('aria-expanded', String(withPrefs));
    banner.classList.add('is-visible');
    document.body.classList.add('cookie-open');
    requestAnimationFrame(updateOffset);
  };
  const hideBanner = () => {
    banner.classList.remove('is-visible');
    document.body.classList.remove('cookie-open');
  };

  banner.addEventListener('click', (e) => {
    const action = e.target.closest('[data-cookie]')?.dataset.cookie;
    if (!action) return;
    if (action === 'accept') { applyConsent(saveConsent(true)); hideBanner(); }
    if (action === 'reject') { saveConsent(false); hideBanner(); }
    if (action === 'config') {
      if (banner.classList.contains('show-prefs')) {
        applyConsent(saveConsent(analyticsInput.checked)); hideBanner();
      } else {
        showBanner(true);
      }
    }
  });
  window.addEventListener('resize', () => { if (banner.classList.contains('is-visible')) updateOffset(); });
  document.querySelectorAll('[data-cookie-settings]').forEach((b) => b.addEventListener('click', () => showBanner(true)));

  const existing = readConsent();
  if (existing) applyConsent(existing);
  else setTimeout(() => showBanner(false), 600);

  /* =========================================================
     Formulario de contacto (Web3Forms)
     ========================================================= */
  const form = document.getElementById('contact-form');
  if (form) {
    const status = form.querySelector('.form-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    const WA_URL = 'https://wa.me/34686806207';

    const setError = (el, msg) => {
      const wrap = el.closest('.field, .check');
      if (!wrap) return;
      wrap.classList.toggle('has-error', !!msg);
      let m = wrap.querySelector('.error-msg');
      if (msg && wrap.classList.contains('field')) {
        if (!m) { m = document.createElement('span'); m.className = 'error-msg'; wrap.appendChild(m); }
        m.textContent = msg;
      } else if (m) m.remove();
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    };

    const messageFor = (el) => {
      if (el.validity.valueMissing) return el.type === 'checkbox' ? 'Debes aceptar la política de privacidad.' : 'Este campo es obligatorio.';
      if (el.validity.typeMismatch && el.type === 'email') return 'Revisa el email, parece que no es correcto.';
      if (el.validity.patternMismatch) return 'Revisa el teléfono (mínimo 9 dígitos).';
      return '';
    };

    form.querySelectorAll('input, select, textarea').forEach((el) => {
      if (el.type === 'hidden' || el.classList.contains('hp')) return;
      el.addEventListener('blur', () => { if (el.value || el.type === 'checkbox') setError(el, messageFor(el)); });
      el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') setError(el, messageFor(el)); });
      el.addEventListener('change', () => { if (el.getAttribute('aria-invalid') === 'true') setError(el, messageFor(el)); });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.className = 'form-status';
      status.textContent = '';

      let firstInvalid = null;
      form.querySelectorAll('[required]').forEach((el) => {
        const msg = messageFor(el);
        setError(el, msg);
        if (msg && !firstInvalid) firstInvalid = el;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      if (form.botcheck.checked) return; // bot

      const key = form.access_key.value;
      if (!key || key.startsWith('TU_')) {
        status.classList.add('err');
        status.innerHTML = `El formulario aún no está activado. Escríbeme por <a href="${WA_URL}" target="_blank" rel="noopener">WhatsApp</a> mientras tanto.`;
        return;
      }

      const data = Object.fromEntries(new FormData(form));
      data.subject = `Nueva consulta: ${data.sesion} · ${data.nombre}`;
      data.replyto = data.email;
      delete data.privacidad;
      delete data.botcheck;

      submitBtn.disabled = true;
      const original = submitBtn.textContent;
      submitBtn.textContent = 'Enviando…';

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.message || 'Error');
        form.reset();
        status.classList.add('ok');
        status.textContent = '¡Gracias! He recibido tu mensaje y te responderé muy pronto.';
      } catch {
        status.classList.add('err');
        status.innerHTML = `No se ha podido enviar. Inténtalo de nuevo o escríbeme por <a href="${WA_URL}" target="_blank" rel="noopener">WhatsApp</a>.`;
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = original;
      }
    });
  }
})();
