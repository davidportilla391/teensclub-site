<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<title>TeensClub® — Control de acceso</title>
<meta name="theme-color" content="#000000" />
<link rel="stylesheet" href="colors_and_type.css" />
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:var(--tc-black);color:var(--tc-fg);font-family:var(--tc-font-sans);font-weight:var(--tc-weight-medium);-webkit-font-smoothing:antialiased;min-height:100vh;}
  .scan-wrap{max-width:560px;margin:0 auto;min-height:100vh;display:flex;flex-direction:column;padding:18px 18px 24px;}
  /* header */
  .sh{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px;}
  .sh .wm{font-weight:var(--tc-weight-display);letter-spacing:-.03em;font-size:18px;}
  .sh .wm sup{font-size:.34em;font-weight:var(--tc-weight-bold);top:-1.1em;}
  .sh .eb{font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--tc-fg-muted);margin-top:3px;}
  .sh .count{text-align:right;}
  .sh .count .n{font-size:24px;font-weight:var(--tc-weight-display);letter-spacing:-.02em;line-height:1;color:var(--tc-accent);}
  .sh .count .l{font-size:9px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--tc-fg-faint);margin-top:4px;}

  /* camera */
  .cam{position:relative;width:100%;aspect-ratio:1/1;background:var(--tc-ink-900,#050507);border:1px solid var(--tc-border);border-radius:14px;overflow:hidden;}
  #reader{width:100%;height:100%;}
  #reader video{width:100%!important;height:100%!important;object-fit:cover!important;}
  .cam-frame{position:absolute;inset:0;pointer-events:none;z-index:3;display:flex;align-items:center;justify-content:center;}
  .cam-frame::before{content:"";width:62%;height:62%;border:2px solid rgba(255,255,255,.5);border-radius:18px;box-shadow:0 0 0 2000px rgba(0,0,0,.35);}
  .cam-line{position:absolute;left:19%;right:19%;height:2px;background:var(--tc-blue);box-shadow:var(--tc-glow-blue);z-index:4;top:19%;animation:scanline 2.4s var(--tc-ease) infinite;}
  @keyframes scanline{0%,100%{top:19%;}50%{top:81%;}}
  .cam-hint{position:absolute;bottom:14px;left:0;right:0;text-align:center;z-index:4;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.7);}
  .cam-msg{position:absolute;inset:0;z-index:5;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:24px;text-align:center;}
  .cam-msg p{font-size:13px;font-weight:500;line-height:1.5;color:var(--tc-fg-muted);max-width:36ch;}

  /* controls */
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;font-weight:700;font-size:14px;letter-spacing:.01em;padding:15px 22px;border-radius:var(--tc-radius-sm);border:1px solid transparent;cursor:pointer;font-family:inherit;width:100%;transition:background .15s,border-color .15s,box-shadow .15s,color .15s;}
  .btn-primary{background:var(--tc-blue);color:#fff;box-shadow:var(--tc-glow-blue-sm);}
  .btn-primary:active{background:var(--tc-blue-700);}
  .btn-ghost{background:transparent;color:var(--tc-fg);border-color:var(--tc-border-strong);}
  .controls{margin-top:16px;display:flex;flex-direction:column;gap:10px;}
  .manual{display:flex;gap:8px;}
  .manual input{flex:1;background:var(--tc-surface);border:1px solid var(--tc-border-strong);border-radius:var(--tc-radius-sm);padding:14px 14px;font-family:inherit;font-weight:600;font-size:15px;color:var(--tc-fg);text-transform:uppercase;}
  .manual input::placeholder{color:var(--tc-fg-faint);text-transform:none;}
  .manual input:focus{outline:none;border-color:var(--tc-blue);box-shadow:var(--tc-glow-blue-sm);}
  .manual button{width:auto;padding:14px 18px;white-space:nowrap;}
  .foot-link{margin-top:auto;padding-top:20px;text-align:center;font-size:11px;font-weight:600;letter-spacing:.06em;color:var(--tc-fg-faint);}
  .foot-link a{color:var(--tc-fg-muted);text-decoration:none;}

  /* result overlay */
  .res{position:fixed;inset:0;z-index:60;background:rgba(0,0,0,.82);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:flex-end;justify-content:center;padding:0;opacity:0;pointer-events:none;transition:opacity .2s var(--tc-ease);}
  .res.open{opacity:1;pointer-events:auto;}
  @media(min-width:600px){.res{align-items:center;padding:20px;}}
  .res-card{position:relative;width:100%;max-width:520px;background:var(--tc-surface);border:1px solid var(--tc-border-strong);border-top-width:5px;border-radius:16px 16px 0 0;padding:34px 28px 26px;transform:translateY(40px);transition:transform .26s var(--tc-ease-out);}
  .res.open .res-card{transform:translateY(0);}
  @media(min-width:600px){.res-card{border-radius:16px;}}
  .res-card.ok{border-top-color:var(--tc-blue);}
  .res-card.dup{border-top-color:#E6A609;}
  .res-card.bad{border-top-color:#E5484D;}
  .res-icon{width:66px;height:66px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:20px;color:#fff;}
  .ok .res-icon{background:var(--tc-blue);box-shadow:var(--tc-glow-blue);}
  .dup .res-icon{background:#E6A609;box-shadow:0 0 30px rgba(230,166,9,.4);}
  .bad .res-icon{background:#E5484D;box-shadow:0 0 30px rgba(229,72,77,.4);}
  .res-status{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;margin-bottom:10px;}
  .ok .res-status{color:var(--tc-accent);}
  .dup .res-status{color:#E6A609;}
  .bad .res-status{color:#E5484D;}
  .res-title{font-size:32px;font-weight:var(--tc-weight-display);letter-spacing:-.03em;line-height:1;color:var(--tc-fg);}
  .res-name{font-size:20px;font-weight:var(--tc-weight-bold);color:var(--tc-fg);margin-top:18px;}
  .res-rows{margin-top:18px;border-top:1px solid var(--tc-border);}
  .res-row{display:flex;justify-content:space-between;gap:14px;padding:13px 0;border-bottom:1px solid var(--tc-border);}
  .res-row .k{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--tc-fg-muted);}
  .res-row .v{font-size:15px;font-weight:700;color:var(--tc-fg);text-align:right;}
  .res-note{font-size:12px;font-weight:600;line-height:1.5;color:var(--tc-fg-muted);margin-top:16px;}
  .res-actions{margin-top:24px;}
</style>
</head>
<body>
<div class="scan-wrap">
  <div class="sh">
    <div>
      <div class="wm">TeensClub<sup>®</sup></div>
      <div class="eb">Control de acceso · Vol.01</div>
    </div>
    <div class="count"><div class="n" id="scanCount">0</div><div class="l">Escaneados</div></div>
  </div>

  <div class="cam">
    <div id="reader"></div>
    <div class="cam-frame"></div>
    <div class="cam-line" id="camLine"></div>
    <div class="cam-hint" id="camHint">Apunta al código QR del boleto</div>
    <div class="cam-msg" id="camMsg" style="display:none;">
      <p id="camMsgText">Toca “Iniciar cámara” y permite el acceso para empezar a escanear.</p>
      <button class="btn btn-primary" style="width:auto;" onclick="startCam()">Iniciar cámara</button>
    </div>
  </div>

  <div class="controls">
    <div class="manual">
      <input type="text" id="manualFolio" placeholder="O escribe el folio: TC1-…" autocomplete="off" />
      <button class="btn btn-ghost manual-btn" onclick="checkManual()">Validar</button>
    </div>
    <button class="btn btn-ghost" id="resetCount" onclick="resetCount()">Reiniciar conteo de la noche</button>
  </div>

  <div class="foot-link"><a href="index.html">← Volver al sitio</a></div>
</div>

<!-- RESULTADO -->
<div class="res" id="res">
  <div class="res-card" id="resCard">
    <div class="res-icon" id="resIcon"></div>
    <div class="res-status" id="resStatus"></div>
    <div class="res-title" id="resTitle"></div>
    <div class="res-name" id="resName"></div>
    <div class="res-rows" id="resRows"></div>
    <div class="res-note" id="resNote"></div>
    <div class="res-actions">
      <button class="btn btn-primary" onclick="nextScan()">Escanear siguiente</button>
    </div>
  </div>
</div>

<template id="__bundler_thumbnail">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#000000"/><rect x="34" y="34" width="32" height="32" rx="4" fill="none" stroke="#1F1FFF" stroke-width="6"/></svg>
</template>

<script src="https://cdn.jsdelivr.net/npm/html5-qrcode@2.3.8/html5-qrcode.min.js"></script>
<script>
let html5qr = null;
let scanning = false;

const SCAN_KEY = 'tc_scanned_v1';
function getScanned() { try { return JSON.parse(localStorage.getItem(SCAN_KEY) || '{}'); } catch (e) { return {}; } }
function setScanned(o) { try { localStorage.setItem(SCAN_KEY, JSON.stringify(o)); } catch (e) {} }
function updateCount() { document.getElementById('scanCount').textContent = Object.keys(getScanned()).length; }
updateCount();

// ---- parse del contenido del QR ----
function parsePayload(text) {
  if (!text || !/TEENSCLUB/i.test(text)) return null;
  const get = (label) => { const m = text.match(new RegExp(label + ':\\s*(.+)')); return m ? m[1].trim() : ''; };
  return { folio: get('Folio'), nombre: get('Nombre'), cover: get('Cover'), rp: get('RP') };
}

// ---- arranque de cámara ----
async function startCam() {
  document.getElementById('camMsg').style.display = 'none';
  if (!window.Html5Qrcode) { showCamMsg('No se pudo cargar el lector. Revisa tu conexión.'); return; }
  html5qr = new Html5Qrcode('reader', { verbose: false });
  try {
    await html5qr.start(
      { facingMode: 'environment' },
      { fps: 12, qrbox: { width: 240, height: 240 } },
      onScanSuccess,
      () => {}
    );
    scanning = true;
  } catch (e) {
    showCamMsg('No pudimos abrir la cámara. Da permiso de cámara en el navegador o usa el folio manual.');
  }
}
function showCamMsg(t) {
  document.getElementById('camMsgText').textContent = t;
  document.getElementById('camMsg').style.display = 'flex';
}

let lastText = '', lastTime = 0;
function onScanSuccess(decodedText) {
  const now = Date.now();
  if (decodedText === lastText && now - lastTime < 2500) return; // anti-rebote
  lastText = decodedText; lastTime = now;
  handle(decodedText);
}

function handle(text) {
  const data = parsePayload(text);
  if (!data || !data.folio) { showResult('bad', null, text); navigator.vibrate && navigator.vibrate(200); return; }
  const scanned = getScanned();
  if (scanned[data.folio]) { showResult('dup', data, scanned[data.folio]); navigator.vibrate && navigator.vibrate([100, 60, 100]); return; }
  // marcar como usado
  scanned[data.folio] = new Date().toLocaleString('es-MX');
  setScanned(scanned); updateCount();
  showResult('ok', data, null);
  navigator.vibrate && navigator.vibrate(60);
}

function checkManual() {
  const v = document.getElementById('manualFolio').value.trim().toUpperCase();
  if (!v) return;
  // construir payload mínimo para reusar el flujo
  handle('TEENSCLUB VOL.01\nFolio: ' + v + '\nNombre: —\nCover: —\nRP: —');
  document.getElementById('manualFolio').value = '';
}

function showResult(type, data, extra) {
  if (html5qr && scanning) { try { html5qr.pause(true); } catch (e) {} }
  const card = document.getElementById('resCard');
  card.className = 'res-card ' + type;
  const icon = document.getElementById('resIcon');
  const status = document.getElementById('resStatus');
  const title = document.getElementById('resTitle');
  const name = document.getElementById('resName');
  const rows = document.getElementById('resRows');
  const note = document.getElementById('resNote');

  if (type === 'ok') {
    icon.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M20 6L9 17l-5-5"/></svg>';
    status.textContent = 'Acceso válido';
    title.textContent = 'Déjalo pasar';
  } else if (type === 'dup') {
    icon.innerHTML = '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>';
    status.textContent = 'Folio ya escaneado';
    title.textContent = 'Ya entró';
  } else {
    icon.innerHTML = '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M18 6L6 18M6 6l12 12"/></svg>';
    status.textContent = 'No reconocido';
    title.textContent = 'Boleto inválido';
  }

  name.textContent = data && data.nombre && data.nombre !== '—' ? data.nombre : '';
  let html = '';
  if (data && data.folio) html += rowHtml('Folio', data.folio);
  if (data && data.cover && data.cover !== '—') html += rowHtml('Cover', data.cover);
  if (data && data.rp && data.rp !== '—') html += rowHtml('RP', data.rp);
  rows.innerHTML = html;

  if (type === 'dup') note.textContent = 'Este folio ya se usó el ' + extra + '. No permitir doble entrada.';
  else if (type === 'bad') note.textContent = 'El código no corresponde a un boleto de TeensClub. Pide ver la confirmación de compra.';
  else note.textContent = 'Verifica que el nombre coincida con una identificación con foto.';

  document.getElementById('res').classList.add('open');
}

function rowHtml(k, v) { return '<div class="res-row"><span class="k">' + k + '</span><span class="v">' + v + '</span></div>'; }

function nextScan() {
  document.getElementById('res').classList.remove('open');
  lastText = '';
  if (html5qr && scanning) { try { html5qr.resume(); } catch (e) {} }
}

function resetCount() {
  if (!confirm('¿Reiniciar el conteo de escaneados de esta noche? Los folios volverán a poder entrar.')) return;
  setScanned({}); updateCount();
}

// mostrar mensaje inicial para pedir permiso (autostart suele requerir gesto)
window.addEventListener('load', () => {
  showCamMsg('Toca “Iniciar cámara” y permite el acceso para empezar a escanear.');
});
</script>
</body>
</html>
