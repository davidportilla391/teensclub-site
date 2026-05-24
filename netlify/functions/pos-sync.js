// netlify/functions/pos-sync.js
// Recibe órdenes del POS y las guarda en Netlify Blobs para que el admin las lea

const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const store = getStore('pos-orders');

    // POST — guardar nueva orden
    if (event.httpMethod === 'POST') {
      const order = JSON.parse(event.body);
      if (!order.id || !order.total) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Datos inválidos' }) };
      }
      await store.set(order.id, JSON.stringify(order));
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, id: order.id }) };
    }

    // GET — obtener todas las órdenes para el admin
    if (event.httpMethod === 'GET') {
      const { blobs } = await store.list();
      const orders = await Promise.all(
        blobs.map(async (blob) => {
          const data = await store.get(blob.key);
          return JSON.parse(data);
        })
      );

      // Calcular resumen
      const summary = orders.reduce((acc, order) => {
        acc.totalRevenue += order.total;
        acc.totalOrders++;
        if (order.method === 'efectivo') acc.cashRevenue += order.total;
        else acc.terminalRevenue += order.total;

        order.items.forEach(item => {
          if (!acc.productSales[item.name]) acc.productSales[item.name] = { qty: 0, revenue: 0 };
          acc.productSales[item.name].qty += item.qty;
          acc.productSales[item.name].revenue += item.subtotal;
        });
        return acc;
      }, {
        totalRevenue: 0, totalOrders: 0,
        cashRevenue: 0, terminalRevenue: 0,
        productSales: {}
      });

      summary.avgTicket = summary.totalOrders > 0
        ? Math.round(summary.totalRevenue / summary.totalOrders)
        : 0;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ orders: orders.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)), summary })
      };
    }

    return { statusCode: 405, headers, body: 'Method Not Allowed' };

  } catch (error) {
    console.error('Error pos-sync:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Error interno' }) };
  }
};
