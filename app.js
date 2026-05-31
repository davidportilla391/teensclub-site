/* ============================================================================
   TeensClub® — app.js
   Plataforma de eventos. Picar un evento -> ticket sheet con covers -> Mercado Pago.
   ============================================================================ */

/* ============================================================================
   FOLIO ÚNICO DEL BOLETO
   El registro a Google Sheets ahora se hace AL FINALIZAR el pago, desde
   gracias.html (así la hoja solo guarda compras realmente pagadas).
   ============================================================================ */

// Genera un folio único corto para el boleto, ej. TC1-K4F2-9XQ
function genFolio() {
  const a = Date.now().toString(36).toUpperCase().slice(-4);
  const b = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3);
  return 'TC1-' + a + '-' + b;
}

/* ---------------------------------------------------------------- EVENTOS ---
   Para agregar un evento nuevo: copia un bloque aquí y añade su <article class="ev">
   en index.html con data-event="<id>". Si tienes un link directo de Mercado Pago
   por cover, pégalo en `link`; si lo dejas vacío se usa el flujo /api/create-preference
   (igual que la página anterior).
----------------------------------------------------------------------------- */
const TC_EVENTS = {
  vol01: {
    pretitle: 'Vol.01 · Edición #001 · La primera',
    title: 'TeensClub Vol.1',
    sub: 'Boleto nominativo · QR + ID en la puerta',
    date: 'Vie 26 · Jun 2026',
    time: '2:00 — 7:00 PM',
    age: '13 — 17 años',
    venue: 'La Calle de las Sirenas',
    address: 'Blvd. Manuel Ávila Camacho 2324, Satélite, Naucalpan, EDOMEX',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=La+Calle+de+las+Sirenas+Sat%C3%A9lite+Naucalpan',
    poster: 'assets/poster-vol01-tall.png',
    covers: [
      // Link de pago de MercadoPago — cover único $250 barra libre.
      { id: 'barra', name: 'Barra libre', note: 'Acceso general + barra libre toda la tarde', price: 250 }
    ]
  }
  // vol02: { ... }  ← próximos eventos van aquí cuando se liberen
};

/* ---------------------------------------------------------------- TICKER --- */
(function buildTicker() {
  const items = [
    'TeensClub Vol.01 — Venta abierta',
    'Viernes 26 junio · 2 — 7 PM',
    'La Calle de las Sirenas · Satélite',
    'Solo 13 — 17 años',
    '100% sin alcohol'
  ];
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  let html = '';
  for (let r = 0; r < 2; r++) {
    items.forEach(t => { html += '<span>' + t + '</span><i></i>'; });
  }
  track.innerHTML = html;
})();

/* ---------------------------------------------------------------- SHEET --- */
let sheetState = { eventId: null, coverId: null, rp: '', rpSource: '', name: '' };

/* Picar un evento ahora navega a su subpágina (el dashboard del evento). */
function openSheet(eventId, preselectCoverId) {
  location.href = 'evento.html?ev=' + encodeURIComponent(eventId) +
    (preselectCoverId ? '&cover=' + encodeURIComponent(preselectCoverId) : '');
}

/* La llama evento.html: lee el evento del URL y arma la página. */
function initEventPage() {
  const p = new URLSearchParams(location.search);
  const id = p.get('ev') || 'vol01';
  if (!TC_EVENTS[id]) { location.href = 'index.html#eventos'; return; }
  fillEvent(id, p.get('cover'));
}

/* Llena el dashboard + covers + formulario para un evento dado. */
function fillEvent(eventId, preselectCoverId) {
  const ev = TC_EVENTS[eventId];
  if (!ev) return;
  sheetState.eventId = eventId;
  sheetState.rp = '';
  sheetState.rpSource = '';
  sheetState.name = '';

  document.getElementById('sheetPretitle').textContent = ev.pretitle;
  document.getElementById('sheetTitle').textContent = ev.title;
  document.getElementById('sheetSub').textContent = ev.sub;

  // dashboard del evento (precio, lugar, fecha, mapa)
  const cover0 = ev.covers[0] || {};
  const dash = document.getElementById('sheetDash');
  if (dash) {
    dash.innerHTML =
      (ev.poster ? '<div class="sd-poster"><img src="' + ev.poster + '" alt="Póster ' + (ev.title || '') + '" /></div>' : '') +
      '<div class="sd-right">' +
      '<div class="sd-grid">' +
        '<div class="sd-cell"><span class="sd-k">Fecha</span><span class="sd-v">' + (ev.date || '—') + '</span></div>' +
        '<div class="sd-cell"><span class="sd-k">Horario</span><span class="sd-v">' + (ev.time || '—') + '</span></div>' +
        '<div class="sd-cell"><span class="sd-k">Edad</span><span class="sd-v">' + (ev.age || '—') + '</span></div>' +
        '<div class="sd-cell sd-price"><span class="sd-k">Cover</span><span class="sd-v">$' + (cover0.price || '—') + ' <small>barra libre</small></span></div>' +
      '</div>' +
      (ev.venue ?
      '<a class="sd-venue" href="' + (ev.mapUrl || '#') + '" target="_blank" rel="noopener">' +
        '<span class="sd-venue-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></span>' +
        '<span class="sd-venue-txt"><span class="sd-k">Lugar</span><span class="sd-venue-name">' + ev.venue + '</span><span class="sd-venue-addr">' + (ev.address || '') + '</span></span>' +
        '<span class="sd-map">Ver mapa<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg></span>' +
      '</a>' : '') +
      (ev.venue ?
      '<div class="sd-mapbox">' +
        '<div class="grid"></div>' +
        '<div class="pin"><span class="orb"></span><span class="lbl">' + ev.venue + '</span></div>' +
        '<div class="note">Satélite · Naucalpan, EDOMEX</div>' +
      '</div>' : '') +
      '</div>';
  }

  const tiers = document.getElementById('sheetTiers');
  tiers.innerHTML = '';
  ev.covers.forEach((c, i) => {
    const sel = preselectCoverId ? c.id === preselectCoverId : i === 0;
    const btn = document.createElement('button');
    btn.className = 'tier' + (sel ? ' is-sel' : '');
    btn.setAttribute('data-cover', c.id);
    btn.innerHTML =
      '<span class="tier-radio"></span>' +
      '<span class="tier-info"><span class="tier-name">' + c.name + '</span>' +
      '<span class="tier-note">' + c.note + '</span></span>' +
      '<span class="tier-price">$' + c.price + '</span>';
    btn.addEventListener('click', () => selectTier(c.id));
    tiers.appendChild(btn);
    if (sel) sheetState.coverId = c.id;
  });

  // reset RP field
  const rpOther = document.getElementById('rpOther');
  const rpOtherInput = document.getElementById('rpOtherInput');
  document.querySelectorAll('#rpSeg .rp-seg-btn').forEach(b => b.classList.remove('is-sel'));
  rpOther.classList.remove('show');
  rpOtherInput.value = '';
  // reset name field
  const nameIn = document.getElementById('buyerName');
  nameIn.value = '';
  document.getElementById('nameField').classList.remove('is-set');

  updateTotal();
  refreshPayState();
}

function selectTier(coverId) {
  sheetState.coverId = coverId;
  document.querySelectorAll('#sheetTiers .tier').forEach(t => {
    t.classList.toggle('is-sel', t.getAttribute('data-cover') === coverId);
  });
  updateTotal();
  refreshPayState();
}

/* ---- ¿De qué parte vienes? (RP vs cuenta propia) ---- */
(function wireRP() {
  const seg = document.getElementById('rpSeg');
  const rpOther = document.getElementById('rpOther');
  const rpOtherInput = document.getElementById('rpOtherInput');
  if (!seg) return;
  seg.querySelectorAll('.rp-seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      seg.querySelectorAll('.rp-seg-btn').forEach(b => b.classList.remove('is-sel'));
      btn.classList.add('is-sel');
      sheetState.rpSource = btn.getAttribute('data-src');
      if (sheetState.rpSource === 'rp') {
        rpOther.classList.add('show');
        rpOtherInput.focus();
        sheetState.rp = rpOtherInput.value.trim();
      } else {
        rpOther.classList.remove('show');
        sheetState.rp = 'Cuenta propia';
      }
      refreshPayState();
    });
  });
  rpOtherInput.addEventListener('input', () => {
    sheetState.rp = rpOtherInput.value.trim();
    refreshPayState();
  });
})();

/* ---- Name field ---- */
(function wireName() {
  const nameIn = document.getElementById('buyerName');
  if (!nameIn) return;
  nameIn.addEventListener('input', () => {
    sheetState.name = nameIn.value.trim();
    document.getElementById('nameField').classList.toggle('is-set', sheetState.name.length >= 3);
    refreshPayState();
  });
})();

function nameIsValid() { return sheetState.name.trim().length >= 3; }

function rpIsValid() {
  if (sheetState.rpSource === 'cuenta') return true;
  if (sheetState.rpSource === 'rp') return sheetState.rp.trim().length >= 2;
  return false;
}

function refreshPayState() {
  const btn = document.getElementById('sheetPay');
  const ok = !!sheetState.coverId && nameIsValid() && rpIsValid();
  btn.disabled = !ok;
  btn.classList.toggle('is-disabled', !ok);
}

function updateTotal() {
  const ev = TC_EVENTS[sheetState.eventId];
  if (!ev) return;
  const c = ev.covers.find(x => x.id === sheetState.coverId);
  document.getElementById('sheetTotal').textContent = c ? '$' + c.price : '$0';
}

function closeSheet() {
  const ov = document.getElementById('sheetOverlay');
  if (ov) ov.classList.remove('open');
  document.body.style.overflow = '';
}

(function () {
  const ov = document.getElementById('sheetOverlay');
  if (ov) ov.addEventListener('click', function (e) { if (e.target === this) closeSheet(); });
})();

/* ------------------------------------------------------- MERCADOPAGO --- */
async function goToCheckout() {
  const ev = TC_EVENTS[sheetState.eventId];
  if (!ev) return;
  const cover = ev.covers.find(x => x.id === sheetState.coverId);
  if (!cover) return;
  if (!nameIsValid() || !rpIsValid()) { refreshPayState(); return; }  // nombre + RP obligatorios

  // Guardamos la orden (nombre, RP, cover y un folio único).
  // El registro a la hoja de Google se manda AL FINALIZAR el pago, desde gracias.html.
  const order = {
    event: sheetState.eventId,
    cover: cover.id,
    coverName: cover.name,
    price: cover.price,
    name: sheetState.name,
    rp: sheetState.rp,
    id: genFolio(),
    logged: false,
    ts: Date.now()
  };
  try { localStorage.setItem('tc_last_order', JSON.stringify(order)); } catch (e) {}

  // Manda al link de pago de MercadoPago. Al terminar, MercadoPago regresa a gracias.html
  // (configúralo en el link: URLs de retorno → éxito → URL de tu gracias.html).
  if (cover.link) { window.location.href = cover.link; return; }

  // Fallback (si algún cover no tiene link)
  alert('Este cover aún no tiene link de pago configurado.');
}

/* ---------------------------------------------------------------- COUNTDOWN --- */
(function countdown() {
  const target = new Date('2026-06-26T14:00:00-06:00').getTime();
  const prev = { d: '', h: '', m: '', s: '' };
  const pad = n => String(n).padStart(2, '0');
  function set(id, val, key) {
    const el = document.getElementById(id);
    const v = pad(val);
    if (el && prev[key] !== v) {
      el.textContent = v;
      el.classList.remove('flip'); void el.offsetWidth; el.classList.add('flip');
      prev[key] = v;
    }
  }
  function tick() {
    let diff = Math.max(0, target - Date.now());
    const d = Math.floor(diff / 86400000); diff -= d * 86400000;
    const h = Math.floor(diff / 3600000); diff -= h * 3600000;
    const m = Math.floor(diff / 60000); diff -= m * 60000;
    const s = Math.floor(diff / 1000);
    set('cd-d', d, 'd'); set('cd-h', h, 'h'); set('cd-m', m, 'm'); set('cd-s', s, 's');
  }
  tick();
  setInterval(tick, 1000);

  // "prende" cada caja del contador en secuencia al cargar
  if (!matchMedia('(prefers-reduced-motion:reduce)').matches) {
    const boxes = document.querySelectorAll('.hero-cd-box');
    boxes.forEach((b, i) => setTimeout(() => b.classList.add('lit'), 900 + i * 140));
  }
})();

/* ---------------------------------------------------------------- NAV --- */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

/* active nav link + sticky buy */
const sections = ['inicio', 'info', 'eventos', 'faq'];
const navLinks = document.querySelectorAll('.nav-link');
const stickyBuy = document.getElementById('stickyBuy');
function onScroll() {
  let current = 'inicio';
  sections.forEach(id => {
    const sec = document.getElementById(id);
    if (sec && sec.getBoundingClientRect().top < 220) current = id;
  });
  navLinks.forEach(l => l.classList.toggle('is-active', l.dataset.target === current));
  if (stickyBuy) stickyBuy.classList.toggle('show', window.scrollY > window.innerHeight * 0.7);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------------------------------------------------------------- REVEAL --- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal, .stagger').forEach(el => io.observe(el));

/* ---------------------------------------------------------------- FORM --- */
function subscribe(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const btn = e.target.querySelector('button');
  btn.textContent = 'Listo';
  btn.disabled = true;
  input.value = '';
  input.placeholder = 'Te avisamos del próximo drop';
  setTimeout(() => { btn.textContent = 'Avísame'; btn.disabled = false; }, 2600);
  return false;
}
