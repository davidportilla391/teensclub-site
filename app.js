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

    const body = JSON.parse(event.body);
    const { cover, buyerName, folio, rp } = body;

    const covers = { barra: { name: 'Barra libre', price: 250 } };
    if (!covers[cover]) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Cover inválido: ' + cover }) };

    const coverData = covers[cover];

    const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        items: [{
          title: `TeensClub® VOL.01 — ${coverData.name}`,
          quantity: 1,
          unit_price: coverData.price,
          currency_id: 'MXN',
          description: 'Sábado 11 de Julio 2026 · 2:00 PM · La Calle de las Sirenas, Satélite'
        }],
        payer: { name: buyerName || '' },
        back_urls: {
          success: 'https://teensclub.mx/gracias.html',
          failure: 'https://teensclub.mx/index.html',
          pending: 'https://teensclub.mx/gracias.html'
        },
        auto_return: 'approved',
        statement_descriptor: 'TEENSCLUB',
        external_reference: folio || '',
        metadata: {
          cover_type: cover,
          cover_name: coverData.name,
          buyer_name: buyerName,
          folio: folio,
          rp: rp
        }
      })
    });

    const data = await mpRes.json();
    if (!data.init_point) {
      console.error('MP error:', JSON.stringify(data));
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'MP no devolvió init_point', detail: data }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ init_point: data.init_point }) };

  } catch (err) {
    console.error('Error:', err.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
