// netlify/functions/create-preference.js
// Crea preferencia de pago en Mercado Pago y regresa init_point

const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { cover, price, title, buyerName, folio, rp } = JSON.parse(event.body);

    // Validar covers permitidos
    const covers = {
      barra: { name: 'Barra libre', price: 250 }
    };
    if (!covers[cover]) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Cover inválido' }) };
    }

    const coverData = covers[cover];

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        items: [{
          title: `TeensClub® VOL.01 — ${coverData.name}`,
          quantity: 1,
          unit_price: coverData.price,
          currency_id: 'MXN',
          description: 'Viernes 26 de Junio 2026 · 2:00 PM · La Calle de las Sirenas, Satélite'
        }],
        payer: {
          name: buyerName || ''
        },
        back_urls: {
          success: 'https://teensclub.mx/gracias.html',
          failure: 'https://teensclub.mx/error.html',
          pending: 'https://teensclub.mx/gracias.html'
        },
        auto_return: 'approved',
        statement_descriptor: 'TEENSCLUB',
        notification_url: 'https://teensclub.mx/api/webhook',
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

    const data = await response.json();

    if (!data.init_point) {
      throw new Error('No se obtuvo init_point de Mercado Pago');
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        init_point: data.init_point,
        preference_id: data.id
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' })
    };
  }
};
