const fetch = require('node-fetch');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: 'Method Not Allowed' };

  try {
    const token = process.env.MP_ACCESS_TOKEN;
    if (!token) return { statusCode: 500, headers, body: JSON.stringify({ error: 'MP_ACCESS_TOKEN no configurado' }) };

    const { cover, buyerName, folio, rp } = JSON.parse(event.body);
    const covers = { barra: { name: 'Barra libre', price: 250 } };
    if (!covers[cover]) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Cover inválido' }) };

    const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        items: [{ title: 'TeensClub® VOL.01 — Barra libre', quantity: 1, unit_price: 250, currency_id: 'MXN' }],
        payer: { name: buyerName || '' },
        back_urls: { success: 'https://teensclub.mx/gracias.html', failure: 'https://teensclub.mx/index.html', pending: 'https://teensclub.mx/gracias.html' },
        auto_return: 'approved',
        statement_descriptor: 'TEENSCLUB',
        external_reference: folio || '',
        metadata: { cover_type: cover, buyer_name: buyerName, folio, rp }
      })
    });

    const data = await mpRes.json();
    if (!data.init_point) return { statusCode: 500, headers, body: JSON.stringify({ error: 'Sin init_point', detail: data }) };

    return { statusCode: 200, headers, body: JSON.stringify({ init_point: data.init_point }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};