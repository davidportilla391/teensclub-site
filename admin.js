/* ============================================================================
   TeensClub® — admin.js
   Panel de ventas. Lee boletos de tu Google Sheet (JSONP) + POS local (caja).
   ============================================================================ */

/* ============================================================
   CONFIGURA AQUÍ
   ------------------------------------------------------------ */
const TC_ADMIN_PASS = 'teensclub26';   // ← cámbiala por tu contraseña
const TC_LOG_URL = 'https://script.google.com/macros/s/AKfycbxKXTqsA59CvcjvmibIzmhBZ33gE35yBLWocE8qYLlILb42Bjb_QwzkEknBwYKx0mLvrg/exec';
const AFORO_TOTAL = 500;
const CUPO = { barra: 500 };
const PRECIO = { barra: 250 };
/* ============================================================ */

/* productos del POS (de la carta) */
const POS_PRODUCTS = [
  { n: 'Tropic Rush', p: 80 },
  { n: 'Green Mint', p: 80 },
  { n: 'Pink Smash', p: 80 },
  { n: 'Electric Blue', p: 80 },
  { n: 'Berry Lemonade', p: 80 },
  { n: 'Copa Blanca', p: 99 },
  { n: 'Copa Rosada', p: 99 },
  { n: 'Champaña TC', p: 380 },
  { n: 'Refresco', p: 50 },
  { n: 'Agua', p: 30 }
];

/* ---------------------------------------------------------------- AUTH --- */
function tryUnlock() {
  const v = document.getElementById('lockPass').value;
  if (v === TC_ADMIN_PASS) {
    sessionStorage.setItem('tc_admin_ok', '1');
    showApp();
  } else {
    document.getElementById('lockErr').textContent = 'Contraseña incorrecta.';
    document.getElementById('lockPass').value = '';
  }
}
function showApp() {
  document.getElementById('lock').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  loadTickets();
  renderPos();
  buildPosModal();
}
if (sessionStorage.getItem('tc_admin_ok') === '1') {
  window.addEventListener('DOMContentLoaded', showApp);
}

/* ------------------------------------------------------- BOLETOS (Sheet) --- */
const money = n => '$' + Number(n || 0).toLocaleString('es-MX');

function loadTickets() {
  if (!TC_LOG_URL) { document.getElementById('salesEmpty').textContent = 'Falta configurar la URL de la hoja.'; return; }
  const cb = '__tc_cb_' + Date.now();
  const cleanup = (s) => { try { delete window[cb]; } catch (e) { window[cb] = undefined; } if (s && s.parentNode) s.parentNode.removeChild(s); };
  const timer = setTimeout(() => {
    const el = document.getElementById('salesEmpty');
    if (el) el.innerHTML = 'No pudimos leer la hoja. Asegúrate de haber agregado el <b>doGet</b> al Apps Script (te paso el código) y de publicar para "Cualquier usuario".';
  }, 8000);

  window[cb] = function (data) {
    clearTimeout(timer);
    const rows = (data && data.rows) ? data.rows : (Array.isArray(data) ? data : []);
    renderTickets(rows);
    cleanup(s);
  };
  const s = document.createElement('script');
  s.src = TC_LOG_URL + (TC_LOG_URL.indexOf('?') === -1 ? '?' : '&') + 'action=list&callback=' + cb;
  s.onerror = function () { clearTimeout(timer); cleanup(s); };
  document.body.appendChild(s);
}

function field(row, keys) {
  for (const k of Object.keys(row)) {
    const lk = String(k).toLowerCase().trim();
    if (keys.includes(lk)) return row[k];
  }
  return '';
}

function renderTickets(rows) {
  // normaliza
  const sales = rows.map(r => ({
    folio: field(r, ['folio']),
    nombre: field(r, ['nombre', 'comprador', 'name']),
    cover: String(field(r, ['cover'])),
    precio: Number(String(field(r, ['precio', 'monto', 'price'])).replace(/[^0-9.]/g, '')) || 0,
    rp: field(r, ['rp'])
  })).filter(s => s.folio || s.nombre || s.precio);

  const total = sales.length;
  const ingresos = sales.reduce((a, b) => a + b.precio, 0);

  document.getElementById('stBoletos').textContent = total;
  document.getElementById('stBoletosSub').textContent = 'de ' + AFORO_TOTAL + ' disponibles';
  document.getElementById('stIngresos').textContent = money(ingresos);
  document.getElementById('stBarra').textContent = total;
  document.getElementById('stRestante').textContent = Math.max(0, AFORO_TOTAL - total);

  setOcc('Barra', total, CUPO.barra);

  // tabla últimas ventas (más recientes primero)
  const body = document.getElementById('salesBody');
  if (!sales.length) {
    body.innerHTML = '<tr><td class="empty" colspan="5">Aún no hay ventas registradas.</td></tr>';
  } else {
    const recent = sales.slice().reverse().slice(0, 25);
    body.innerHTML = recent.map(s =>
      '<tr><td class="mono">' + (s.folio || '—') + '</td>' +
      '<td>' + (s.nombre || '—') + '</td>' +
      '<td class="muted">' + (s.cover || '—') + '</td>' +
      '<td>' + rpPill(s.rp) + '</td>' +
      '<td class="right mono">' + money(s.precio) + '</td></tr>'
    ).join('');
  }

  // desglose por RP
  const byRp = {};
  sales.forEach(s => { const k = (s.rp || '—').trim() || '—'; byRp[k] = (byRp[k] || 0) + 1; });
  const rpEntries = Object.entries(byRp).sort((a, b) => b[1] - a[1]);
  const rw = document.getElementById('rpWrap');
  rw.innerHTML = rpEntries.length
    ? rpEntries.map(([n, c]) => '<div class="rpchip"><span class="n">' + n + '</span><span class="c">' + c + '</span></div>').join('')
    : '<span style="color:var(--tc-fg-faint);font-size:13px;font-weight:600;">Sin datos aún</span>';
}

function rpPill(rp) {
  if (!rp || rp === '—') return '<span class="muted">—</span>';
  if (/cuenta propia/i.test(rp)) return '<span class="pillst">Cuenta propia</span>';
  return '<span class="pillst rp">' + rp + '</span>';
}

function setOcc(id, sold, cupo) {
  const pct = cupo ? Math.min(100, Math.round((sold / cupo) * 100)) : 0;
  document.getElementById('fill' + id).style.width = pct + '%';
  document.getElementById('sold' + id).textContent = sold + ' vendidos';
  document.getElementById('pct' + id).textContent = pct + '%';
}

/* ---------------------------------------------------------------- POS --- */
const POS_KEY = 'tc_pos_v1';
function getPos() { try { return JSON.parse(localStorage.getItem(POS_KEY) || '[]'); } catch (e) { return []; } }
function setPos(a) { try { localStorage.setItem(POS_KEY, JSON.stringify(a)); } catch (e) {} }

let posCart = {};   // { index: qty }
let posMethod = 'Efectivo';

function buildPosModal() {
  const wrap = document.getElementById('posProducts');
  wrap.innerHTML = POS_PRODUCTS.map((p, i) =>
    '<div class="prod"><div><div class="pn">' + p.n + '</div><div class="pp">' + money(p.p) + '</div></div>' +
    '<div class="qty"><button onclick="posQty(' + i + ',-1)">–</button><span id="q' + i + '">0</span><button onclick="posQty(' + i + ',1)">+</button></div></div>'
  ).join('');
  document.querySelectorAll('#posMethod button').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('#posMethod button').forEach(x => x.classList.remove('sel'));
      b.classList.add('sel'); posMethod = b.getAttribute('data-m');
    });
  });
}
function posQty(i, d) {
  posCart[i] = Math.max(0, (posCart[i] || 0) + d);
  document.getElementById('q' + i).textContent = posCart[i];
  document.getElementById('posModalTotal').textContent = money(posCartTotal());
}
function posCartTotal() {
  return Object.entries(posCart).reduce((a, [i, q]) => a + POS_PRODUCTS[i].p * q, 0);
}
function openPos() {
  posCart = {}; posMethod = 'Efectivo';
  POS_PRODUCTS.forEach((p, i) => { const el = document.getElementById('q' + i); if (el) el.textContent = '0'; });
  document.querySelectorAll('#posMethod button').forEach((x, idx) => x.classList.toggle('sel', idx === 0));
  document.getElementById('posModalTotal').textContent = '$0';
  document.getElementById('posStation').value = '';
  document.getElementById('posModal').classList.add('open');
}
function closePos() { document.getElementById('posModal').classList.remove('open'); }

function savePos() {
  const total = posCartTotal();
  if (total <= 0) { closePos(); return; }
  const items = Object.entries(posCart).filter(([i, q]) => q > 0).map(([i, q]) => ({ n: POS_PRODUCTS[i].n, p: POS_PRODUCTS[i].p, q: q }));
  const order = {
    id: 'P' + (getPos().length + 1).toString().padStart(3, '0'),
    items, total,
    method: posMethod,
    station: document.getElementById('posStation').value.trim() || 'Caja',
    ts: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
  };
  const all = getPos(); all.push(order); setPos(all);
  closePos(); renderPos();
}

function renderPos() {
  const orders = getPos();
  const total = orders.reduce((a, b) => a + b.total, 0);
  const cash = orders.filter(o => o.method === 'Efectivo').reduce((a, b) => a + b.total, 0);
  const card = orders.filter(o => o.method === 'Tarjeta').reduce((a, b) => a + b.total, 0);
  const avg = orders.length ? Math.round(total / orders.length) : 0;
  document.getElementById('posTotal').textContent = money(total);
  document.getElementById('posCash').textContent = money(cash);
  document.getElementById('posCard').textContent = money(card);
  document.getElementById('posAvg').textContent = money(avg);

  // productos más vendidos
  const tally = {};
  orders.forEach(o => o.items.forEach(it => {
    if (!tally[it.n]) tally[it.n] = { u: 0, t: 0 };
    tally[it.n].u += it.q; tally[it.n].t += it.p * it.q;
  }));
  const top = Object.entries(tally).sort((a, b) => b[1].u - a[1].u);
  const topBody = document.getElementById('topBody');
  topBody.innerHTML = top.length
    ? top.map(([n, v]) => '<tr><td>' + n + '</td><td class="right mono">' + v.u + '</td><td class="right mono">' + money(v.t) + '</td></tr>').join('')
    : '<tr><td class="empty" colspan="3">Sin ventas POS aún</td></tr>';

  // últimas órdenes
  const posBody = document.getElementById('posBody');
  posBody.innerHTML = orders.length
    ? orders.slice().reverse().slice(0, 20).map(o =>
        '<tr><td class="mono">' + o.id + '</td><td class="muted">' + o.station + '</td>' +
        '<td>' + o.method + ' <span class="muted">· ' + o.ts + '</span></td>' +
        '<td class="right mono">' + money(o.total) + '</td></tr>'
      ).join('')
    : '<tr><td class="empty" colspan="4">Sin órdenes aún</td></tr>';
}

// cerrar modal al tocar el fondo
document.getElementById('posModal').addEventListener('click', function (e) { if (e.target === this) closePos(); });
