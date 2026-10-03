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
  const targets = document.querySelectorAll('.section-head, .session-card, .gallery-item, .feature, .about-text, .about-media, .review, .banner-text, .cta-content');
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
     Reservas por WhatsApp
     El formulario NO envía datos a ningún servidor: compone el
     mensaje y abre WhatsApp para que la persona lo envíe.
     ========================================================= */
  const WA_NUMBER = '34686806207';
  const SESIONES = ['Embarazo', 'Newborn', 'Bebés / Smash cake', 'Familia', 'Comunión', 'Otra / No lo tengo claro'];
  const WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.09.81.83-3-.2-.31a8.2 8.2 0 1 1 6.94 3.83Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-3.36-2.94c-.25-.44.25-.4.72-1.34.08-.16.04-.3-.02-.43l-.76-1.83c-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31 2.77 2.77 0 0 0-.86 2.06 4.8 4.8 0 0 0 1 2.55 11 11 0 0 0 4.22 3.73c1.57.68 2.19.74 2.98.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.29Z"/></svg>';

  let formCount = 0;
  const buildForm = () => {
    const id = `bk${++formCount}`;
    const form = document.createElement('form');
    form.className = 'contact-form booking-form';
    form.noValidate = true;
    form.innerHTML = `
      <div class="field">
        <label for="${id}-nombre">Tu nombre *</label>
        <input id="${id}-nombre" name="nombre" type="text" autocomplete="name" required>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="${id}-sesion">Tipo de sesión *</label>
          <select id="${id}-sesion" name="sesion" required>
            <option value="" selected disabled>Elige una opción</option>
            ${SESIONES.map((o) => `<option>${o}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label for="${id}-fecha">Fecha aproximada</label>
          <input id="${id}-fecha" name="fecha" type="text" placeholder="Ej.: parto previsto en marzo">
        </div>
      </div>
      <div class="field">
        <label for="${id}-msg">Cuéntame un poco más</label>
        <textarea id="${id}-msg" name="mensaje" rows="4" placeholder="Número de personas, ideas, dudas…"></textarea>
      </div>
      <label class="check">
        <input type="checkbox" name="privacidad" required>
        <span>He leído y acepto la <a href="politica-privacidad.html" target="_blank">política de privacidad</a>. *</span>
      </label>
      <button type="submit" class="btn btn-wa">${WA_ICON}<span>Enviar por WhatsApp</span></button>
      <p class="form-note">Se abrirá WhatsApp con tu mensaje preparado. La web no guarda ningún dato.</p>`;
    form.addEventListener('submit', onSubmit);
    form.querySelectorAll('[required]').forEach((el) => {
      const evt = el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'input';
      el.addEventListener(evt, () => { if (el.getAttribute('aria-invalid') === 'true') setError(el, messageFor(el)); });
    });
    return form;
  };

  const messageFor = (el) => {
    if (!el.validity.valueMissing) return '';
    if (el.type === 'checkbox') return 'Debes aceptar la política de privacidad.';
    if (el.tagName === 'SELECT') return 'Elige el tipo de sesión.';
    return 'Este campo es obligatorio.';
  };
  const setError = (el, msg) => {
    const wrap = el.closest('.field, .check');
    if (!wrap) return;
    wrap.classList.toggle('has-error', !!msg);
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    let m = wrap.querySelector('.error-msg');
    if (msg && wrap.classList.contains('field')) {
      if (!m) { m = document.createElement('span'); m.className = 'error-msg'; wrap.appendChild(m); }
      m.textContent = msg;
    } else if (m) m.remove();
  };

  function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    let first = null;
    form.querySelectorAll('[required]').forEach((el) => {
      const msg = messageFor(el);
      setError(el, msg);
      if (msg && !first) first = el;
    });
    if (first) { first.focus(); return; }

    const d = Object.fromEntries(new FormData(form));
    const lines = [
      `Hola Bárbara, soy ${d.nombre.trim()}. Me gustaría información para una sesión de fotos.`,
      '',
      `• Tipo de sesión: ${d.sesion}`,
    ];
    if (d.fecha.trim()) lines.push(`• Fecha aproximada: ${d.fecha.trim()}`);
    if (d.mensaje.trim()) lines.push('', d.mensaje.trim());
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;

    const win = window.open(url, '_blank', 'noopener');
    if (!win) window.location.href = url;
    form.reset();
    if (dialog?.open) dialog.close();
  }

  // Formulario fijo (página de contacto)
  document.querySelectorAll('[data-booking-inline]').forEach((slot) => slot.appendChild(buildForm()));

  // Ventana emergente para todos los botones de reserva / WhatsApp
  const dialog = document.createElement('dialog');
  dialog.className = 'booking-dialog';
  dialog.setAttribute('aria-labelledby', 'booking-title');
  dialog.innerHTML = `
    <button type="button" class="dialog-close" aria-label="Cerrar">&times;</button>
    <p class="eyebrow">Reserva tu sesión</p>
    <h2 id="booking-title">Cuéntame qué necesitas</h2>
    <p class="form-intro">Rellena estos datos y te llevo a WhatsApp con el mensaje listo para enviar.</p>`;
  dialog.appendChild(buildForm());
  document.body.appendChild(dialog);
  const closeDialog = () => dialog.close();
  dialog.querySelector('.dialog-close').addEventListener('click', closeDialog);
  dialog.addEventListener('click', (e) => { if (e.target === dialog) closeDialog(); });
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));

  document.querySelectorAll('[data-booking]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (typeof dialog.showModal !== 'function') return; // navegador muy antiguo: va directo a WhatsApp
      e.preventDefault();
      setMenu(false);
      dialog.showModal();
      document.body.classList.add('dialog-open');
      setTimeout(() => dialog.querySelector('input[name="nombre"]')?.focus(), 60);
    });
  });

  /* ---------- Visor de fotos de la galería ---------- */
  const items = [...document.querySelectorAll('[data-lightbox]')];
  if (items.length) {
    const lb = document.createElement('dialog');
    lb.className = 'lightbox';
    lb.innerHTML = `
      <button type="button" class="lb-close" aria-label="Cerrar">&times;</button>
      <button type="button" class="lb-prev" aria-label="Foto anterior">&#8249;</button>
      <img alt="">
      <button type="button" class="lb-next" aria-label="Foto siguiente">&#8250;</button>`;
    document.body.appendChild(lb);
    const lbImg = lb.querySelector('img');
    let current = 0;
    const show = (i) => {
      current = (i + items.length) % items.length;
      lbImg.src = items[current].href;
      lbImg.alt = items[current].querySelector('img')?.alt || '';
    };
    items.forEach((a, i) => a.addEventListener('click', (e) => {
      if (typeof lb.showModal !== 'function') return;
      e.preventDefault(); show(i); lb.showModal();
    }));
    lb.querySelector('.lb-close').addEventListener('click', () => lb.close());
    lb.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
    lb.querySelector('.lb-next').addEventListener('click', () => show(current + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
    let x0 = null;
    lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }
})();
