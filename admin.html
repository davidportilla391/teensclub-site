<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>TeensClub® — Admin · Ventas</title>
<meta name="theme-color" content="#000000" />
<link rel="stylesheet" href="colors_and_type.css" />
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:var(--tc-black);color:var(--tc-fg);font-family:var(--tc-font-sans);font-weight:var(--tc-weight-medium);-webkit-font-smoothing:antialiased;}
  a{color:inherit;text-decoration:none;}
  .wrap{max-width:1080px;margin:0 auto;padding:22px 22px 80px;}

  /* top bar */
  .abar{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:6px 0 26px;border-bottom:1px solid var(--tc-border);margin-bottom:30px;}
  .abar .wm{font-weight:var(--tc-weight-display);letter-spacing:-.03em;font-size:19px;}
  .abar .wm sup{font-size:.34em;font-weight:700;top:-1.1em;}
  .abar .eb{font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--tc-fg-muted);margin-top:3px;}
  .abar-right{display:flex;align-items:center;gap:14px;}
  .live-dot{display:inline-flex;align-items:center;gap:8px;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--tc-fg-muted);}
  .live-dot i{width:7px;height:7px;border-radius:50%;background:#1FB55B;box-shadow:0 0 10px rgba(31,181,91,.7);animation:p 1.6s infinite;}
  @keyframes p{0%,100%{opacity:1;}50%{opacity:.3;}}
  .abtn{background:transparent;border:1px solid var(--tc-border-strong);border-radius:var(--tc-radius-sm);color:var(--tc-fg);font-family:inherit;font-weight:700;font-size:12px;letter-spacing:.02em;padding:10px 16px;cursor:pointer;transition:border-color .15s,color .15s,box-shadow .15s;}
  .abtn:hover{border-color:var(--tc-blue);color:var(--tc-blue);box-shadow:var(--tc-glow-blue-sm);}
  .abtn.primary{background:var(--tc-blue);color:#fff;border-color:var(--tc-blue);box-shadow:var(--tc-glow-blue-sm);}
  .abtn.primary:hover{background:var(--tc-blue-700);color:#fff;}

  /* section label */
  .alabel{font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--tc-fg-faint);margin:34px 0 14px;}
  .alabel:first-of-type{margin-top:0;}

  /* stat cards */
  .grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
  .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
  .stat{background:var(--tc-surface);border:1px solid var(--tc-border);border-radius:var(--tc-radius-md);padding:20px 20px 18px;position:relative;overflow:hidden;}
  .stat .k{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--tc-fg-muted);}
  .stat .bar{width:26px;height:3px;border-radius:2px;margin:12px 0 14px;background:var(--tc-fg-faint);}
  .stat.blue .bar{background:var(--tc-blue);box-shadow:var(--tc-glow-blue-sm);}
  .stat.green .bar{background:#1FB55B;}
  .stat.amber .bar{background:#E6A609;}
  .stat .v{font-size:30px;font-weight:var(--tc-weight-display);letter-spacing:-.02em;line-height:1;color:var(--tc-fg);font-variant-numeric:tabular-nums;}
  .stat .s{font-size:11px;font-weight:600;letter-spacing:.04em;color:var(--tc-fg-faint);margin-top:9px;}
  .stat .v.money{color:var(--tc-fg);}
  .stat.pos .v{color:#1FB55B;}
  .stat.pos.cash .v{color:#FAFAFA;}
  .stat.pos.term .v{color:#E6A609;}

  /* cover occupancy */
  .occ{background:var(--tc-surface);border:1px solid var(--tc-border);border-radius:var(--tc-radius-md);padding:24px 24px 22px;}
  .occ.soon{opacity:.6;}
  .occ h3{font-size:20px;font-weight:var(--tc-weight-display);letter-spacing:-.02em;color:var(--tc-fg);}
  .occ .price{font-size:12px;font-weight:600;letter-spacing:.04em;color:var(--tc-fg-muted);margin-top:6px;}
  .occ .track{height:6px;border-radius:3px;background:var(--tc-ink-700,#1a1a22);margin:20px 0 12px;overflow:hidden;}
  .occ .fill{height:100%;border-radius:3px;background:var(--tc-blue);box-shadow:var(--tc-glow-blue-sm);width:0;transition:width .8s var(--tc-ease);}
  .occ .row{display:flex;justify-content:space-between;align-items:baseline;}
  .occ .sold{font-size:13px;font-weight:700;color:var(--tc-fg);}
  .occ .pct{font-size:13px;font-weight:700;color:var(--tc-fg-muted);font-variant-numeric:tabular-nums;}

  /* tables */
  .table{background:var(--tc-surface);border:1px solid var(--tc-border);border-radius:var(--tc-radius-md);overflow:hidden;}
  .table table{width:100%;border-collapse:collapse;}
  .table th{text-align:left;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--tc-fg-faint);padding:16px 20px;border-bottom:1px solid var(--tc-border);}
  .table td{padding:15px 20px;border-bottom:1px solid var(--tc-border);font-size:13px;font-weight:500;color:var(--tc-fg);}
  .table tr:last-child td{border-bottom:none;}
  .table .mono{font-variant-numeric:tabular-nums;font-weight:700;letter-spacing:.02em;}
  .table .muted{color:var(--tc-fg-muted);}
  .table .right{text-align:right;}
  .table .empty{padding:42px 20px;text-align:center;color:var(--tc-fg-faint);font-size:13px;font-weight:600;letter-spacing:.04em;}
  .pillst{display:inline-flex;align-items:center;gap:6px;font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:4px 10px;border-radius:var(--tc-radius-pill);background:rgba(31,181,91,.14);color:#3DD37F;}
  .pillst.rp{background:rgba(31,31,255,.16);color:#9b9bff;}

  /* RP breakdown chips */
  .rpwrap{display:flex;flex-wrap:wrap;gap:10px;}
  .rpchip{display:flex;align-items:center;gap:10px;background:var(--tc-surface);border:1px solid var(--tc-border);border-radius:var(--tc-radius-pill);padding:9px 15px;}
  .rpchip .n{font-size:13px;font-weight:700;color:var(--tc-fg);}
  .rpchip .c{font-size:12px;font-weight:700;color:var(--tc-accent);font-variant-numeric:tabular-nums;}

  @media(max-width:820px){.grid4{grid-template-columns:repeat(2,1fr);}.grid3{grid-template-columns:1fr;}}
  @media(max-width:560px){.grid4{grid-template-columns:1fr;}.abar-right .hidemob{display:none;}.table{overflow-x:auto;}}

  /* lock screen */
  .lock{position:fixed;inset:0;z-index:80;background:var(--tc-black);display:flex;align-items:center;justify-content:center;padding:24px;}
  .lock-card{width:100%;max-width:360px;text-align:center;}
  .lock-orb{position:absolute;top:50%;left:50%;width:760px;max-width:150vw;transform:translate(-50%,-50%);pointer-events:none;opacity:.5;}
  .lock-card .wm{position:relative;font-weight:var(--tc-weight-display);letter-spacing:-.03em;font-size:24px;margin-bottom:8px;}
  .lock-card .wm sup{font-size:.34em;font-weight:700;top:-1.1em;}
  .lock-card .eb{position:relative;font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--tc-fg-muted);margin-bottom:30px;}
  .lock-card input{position:relative;width:100%;background:var(--tc-surface);border:1px solid var(--tc-border-strong);border-radius:var(--tc-radius-sm);padding:16px;font-family:inherit;font-weight:600;font-size:16px;color:var(--tc-fg);text-align:center;letter-spacing:.1em;}
  .lock-card input:focus{outline:none;border-color:var(--tc-blue);box-shadow:var(--tc-glow-blue-sm);}
  .lock-card button{position:relative;width:100%;margin-top:12px;background:var(--tc-blue);color:#fff;border:none;border-radius:var(--tc-radius-sm);padding:16px;font-family:inherit;font-weight:700;font-size:14px;cursor:pointer;box-shadow:var(--tc-glow-blue-sm);}
  .lock-err{position:relative;font-size:12px;font-weight:600;color:#E5484D;margin-top:14px;height:16px;}

  /* POS modal */
  .modal{position:fixed;inset:0;z-index:70;background:rgba(0,0,0,.8);backdrop-filter:blur(8px);display:flex;align-items:flex-end;justify-content:center;opacity:0;pointer-events:none;transition:opacity .2s;}
  .modal.open{opacity:1;pointer-events:auto;}
  @media(min-width:640px){.modal{align-items:center;padding:20px;}}
  .modal-card{width:100%;max-width:560px;max-height:92vh;overflow-y:auto;background:var(--tc-surface);border:1px solid var(--tc-border-strong);border-radius:14px 14px 0 0;padding:28px 24px 24px;}
  @media(min-width:640px){.modal-card{border-radius:14px;}}
  .modal-card h3{font-size:24px;font-weight:var(--tc-weight-display);letter-spacing:-.02em;margin-bottom:4px;}
  .modal-sub{font-size:12px;font-weight:600;color:var(--tc-fg-muted);margin-bottom:20px;}
  .prod{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;border-top:1px solid var(--tc-border);}
  .prod .pn{font-size:14px;font-weight:600;color:var(--tc-fg);}
  .prod .pp{font-size:12px;font-weight:600;color:var(--tc-fg-muted);margin-top:2px;}
  .qty{display:flex;align-items:center;gap:12px;}
  .qty button{width:30px;height:30px;border-radius:8px;border:1px solid var(--tc-border-strong);background:var(--tc-ink-800);color:var(--tc-fg);font-size:18px;font-weight:700;cursor:pointer;line-height:1;}
  .qty span{min-width:20px;text-align:center;font-weight:700;font-variant-numeric:tabular-nums;}
  .seg{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:18px 0;}
  .seg button{padding:14px;border-radius:var(--tc-radius-sm);border:1px solid var(--tc-border-strong);background:var(--tc-ink-800);color:var(--tc-fg-muted);font-family:inherit;font-weight:700;font-size:14px;cursor:pointer;}
  .seg button.sel{border-color:var(--tc-blue);color:#fff;background:rgba(31,31,255,.12);box-shadow:var(--tc-glow-blue-sm);}
  .modal-foot{border-top:1px solid var(--tc-border);margin-top:8px;padding-top:18px;}
  .modal-total{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:16px;}
  .modal-total span{font-size:13px;font-weight:600;color:var(--tc-fg-muted);}
  .modal-total strong{font-size:28px;font-weight:var(--tc-weight-display);letter-spacing:-.02em;}
  .modal-actions{display:flex;gap:10px;}
  .modal-actions button{flex:1;padding:15px;border-radius:var(--tc-radius-sm);font-family:inherit;font-weight:700;font-size:14px;cursor:pointer;border:1px solid transparent;}
  .modal-actions .cancel{background:transparent;border-color:var(--tc-border-strong);color:var(--tc-fg);}
  .modal-actions .save{background:var(--tc-blue);color:#fff;box-shadow:var(--tc-glow-blue-sm);}
</style>
</head>
<body>

<!-- LOCK -->
<div class="lock" id="lock">
  <img class="orb lock-orb" src="assets/orb.png" alt="" aria-hidden="true" />
  <div class="lock-card">
    <div class="wm">TeensClub<sup>®</sup></div>
    <div class="eb">Panel de administración</div>
    <input type="password" id="lockPass" placeholder="Contraseña" onkeydown="if(event.key==='Enter')tryUnlock()" />
    <button onclick="tryUnlock()">Entrar</button>
    <div class="lock-err" id="lockErr"></div>
  </div>
</div>

<div class="wrap" id="app" style="display:none;">
  <div class="abar">
    <div>
      <div class="wm">TeensClub<sup>®</sup></div>
      <div class="eb">Admin · Vol.01 · Ventas en vivo</div>
    </div>
    <div class="abar-right">
      <span class="live-dot hidemob"><i></i> En vivo</span>
      <button class="abtn" onclick="loadTickets()">Actualizar</button>
      <button class="abtn primary" onclick="openPos()">+ Venta POS</button>
    </div>
  </div>

  <!-- RESUMEN -->
  <div class="alabel">Resumen general</div>
  <div class="grid4">
    <div class="stat blue"><div class="k">Boletos vendidos</div><div class="bar"></div><div class="v" id="stBoletos">—</div><div class="s" id="stBoletosSub">de 500 disponibles</div></div>
    <div class="stat green"><div class="k">Ingresos totales</div><div class="bar"></div><div class="v money" id="stIngresos">—</div><div class="s">MXN recaudados (boletos)</div></div>
    <div class="stat"><div class="k">Barra libre</div><div class="bar"></div><div class="v" id="stBarra">—</div><div class="s">cover único · $250 MXN</div></div>
    <div class="stat amber"><div class="k">Cupo restante</div><div class="bar"></div><div class="v" id="stRestante">—</div><div class="s">lugares disponibles</div></div>
  </div>

  <!-- OCUPACIÓN -->
  <div class="alabel">Ocupación</div>
  <div class="grid3">
    <div class="occ" id="occBarra" style="grid-column:span 2;">
      <h3>Barra libre</h3><div class="price">$250 MXN · Cupo: 500</div>
      <div class="track"><div class="fill" id="fillBarra"></div></div>
      <div class="row"><span class="sold" id="soldBarra">0 vendidos</span><span class="pct" id="pctBarra">0%</span></div>
    </div>
    <div class="occ soon">
      <h3>VIP Zone</h3><div class="price">— · Próximamente</div>
      <div class="track"><div class="fill" style="width:0;"></div></div>
      <div class="row"><span class="sold">0 vendidos</span><span class="pct">0%</span></div>
    </div>
  </div>

  <!-- ÚLTIMAS VENTAS -->
  <div class="alabel">Últimas ventas · boletos</div>
  <div class="table">
    <table>
      <thead><tr><th>Folio</th><th>Comprador</th><th>Cover</th><th>RP</th><th class="right">Monto</th></tr></thead>
      <tbody id="salesBody"><tr><td class="empty" colspan="5" id="salesEmpty">Conectando con tu hoja de Google…</td></tr></tbody>
    </table>
  </div>

  <!-- RP -->
  <div class="alabel">Ventas por RP</div>
  <div class="rpwrap" id="rpWrap"><span class="table empty" style="border:none;padding:8px;color:var(--tc-fg-faint);font-size:13px;">Sin datos aún</span></div>

  <!-- POS -->
  <div class="alabel">Ventas en evento · POS (caja)</div>
  <div class="grid4">
    <div class="stat pos"><div class="k">Ingresos POS</div><div class="bar" style="background:#1FB55B;"></div><div class="v" id="posTotal">$0</div><div class="s">consumos del evento</div></div>
    <div class="stat pos cash"><div class="k">Efectivo</div><div class="bar"></div><div class="v" id="posCash">$0</div><div class="s">cobrado en caja</div></div>
    <div class="stat pos term"><div class="k">Terminal</div><div class="bar" style="background:#E6A609;"></div><div class="v" id="posCard">$0</div><div class="s">cobrado con tarjeta</div></div>
    <div class="stat"><div class="k">Ticket promedio</div><div class="bar"></div><div class="v" id="posAvg">$0</div><div class="s">por orden</div></div>
  </div>

  <div class="alabel">Productos más vendidos</div>
  <div class="table">
    <table>
      <thead><tr><th>Producto</th><th class="right">Unidades</th><th class="right">Total</th></tr></thead>
      <tbody id="topBody"><tr><td class="empty" colspan="3">Sin ventas POS aún</td></tr></tbody>
    </table>
  </div>

  <div class="alabel">Últimas órdenes POS</div>
  <div class="table">
    <table>
      <thead><tr><th>Orden</th><th>Estación</th><th>Método</th><th class="right">Total</th></tr></thead>
      <tbody id="posBody"><tr><td class="empty" colspan="4">Sin órdenes aún</td></tr></tbody>
    </table>
  </div>
</div>

<!-- POS MODAL -->
<div class="modal" id="posModal">
  <div class="modal-card">
    <h3>Nueva venta POS</h3>
    <div class="modal-sub">Registra un consumo cobrado en caja.</div>
    <div id="posProducts"></div>
    <div class="seg" id="posMethod" style="margin-top:18px;">
      <button data-m="Efectivo" class="sel">Efectivo</button>
      <button data-m="Tarjeta">Tarjeta</button>
    </div>
    <input type="text" id="posStation" placeholder="Estación / cajero (ej. Barra 1)" autocomplete="off" style="width:100%;background:var(--tc-ink-800);border:1px solid var(--tc-border-strong);border-radius:var(--tc-radius-sm);padding:13px 14px;font-family:inherit;font-weight:600;font-size:14px;color:var(--tc-fg);" />
    <div class="modal-foot">
      <div class="modal-total"><span>Total</span><strong id="posModalTotal">$0</strong></div>
      <div class="modal-actions">
        <button class="cancel" onclick="closePos()">Cancelar</button>
        <button class="save" onclick="savePos()">Cobrar y registrar</button>
      </div>
    </div>
  </div>
</div>

<template id="__bundler_thumbnail">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#000000"/><rect x="26" y="30" width="48" height="10" rx="2" fill="#1F1FFF"/><rect x="26" y="46" width="34" height="8" rx="2" fill="#3DD37F"/><rect x="26" y="60" width="42" height="8" rx="2" fill="#E6A609"/></svg>
</template>

<script src="admin.js"></script>
</body>
</html>
