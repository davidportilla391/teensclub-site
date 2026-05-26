// netlify/functions/create-preference.js
// Crea una preferencia de pago en Mercado Pago

const fetch = require('node-fetch');

exports.handler = async (event) => {
  // Solo aceptar POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { cover, price, title } = JSON.parse(event.body);

    // Validar datos
    const covers = {
      early: { name: 'Early Bird', price: 350 },
      general: { name: 'General', price: 450 }
    };

    if (!covers[cover]) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Cover inválido' }) };
    }

    const coverData = covers[cover];

    // Crear preferencia en Mercado Pago
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        items: [{
          title: `TeensClub® VOL.01 — Cover ${coverData.name}`,
          quantity: 1,
          unit_price: coverData.price,
          currency_id: 'MXN',
          description: 'Domingo 14 de Junio 2026 · 2:00 PM · Green Plaza Satélite'
        }],
        back_urls: {
          success: 'https://teensclub.mx/gracias',
          failure: 'https://teensclub.mx?pago=fallido',
          pending: 'https://teensclub.mx?pago=pendiente'
        },
        auto_return: 'approved',
        statement_descriptor: 'TEENSCLUB',
        notification_url: 'https://teensclub.mx/api/webhook',
        payment_methods: {
          installments: 1
        },
        metadata: {
          cover_type: cover,
          cover_name: coverData.name
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
