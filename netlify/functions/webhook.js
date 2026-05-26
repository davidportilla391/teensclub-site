// netlify/functions/webhook.js
// Recibe notificación de Mercado Pago → genera boleto PDF → envía por correo

const fetch = require('node-fetch');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

// Genera número de boleto único
function generateTicketNumber() {
  const rand = Math.floor(Math.random() * 99999).toString().padStart(5, '0');
  return `TC-001-${rand}`;
}

// Genera PDF del boleto
async function generateTicketPDF(ticketData) {
  return new Promise(async (resolve, reject) => {
    try {
      // Generar QR
      const qrDataURL = await QRCode.toDataURL(
        JSON.stringify({
          id: ticketData.ticketNumber,
          event: 'TC-VOL01',
          cover: ticketData.cover,
          buyer: ticketData.buyerName,
          valid: true
        }),
        {
          width: 200,
          margin: 2,
          color: { dark: '#0a1330', light: '#e6e1cf' }
        }
      );

      const qrBuffer = Buffer.from(qrDataURL.split(',')[1], 'base64');

      // Crear PDF
      const doc = new PDFDocument({
        size: [400, 600],
        margin: 0
      });

      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // Fondo navy
      doc.rect(0, 0, 400, 600).fill('#0a1330');

      // Franja superior cream
      doc.rect(0, 0, 400, 8).fill('#e6e1cf');

      // Header
      doc.fontSize(28)
         .font('Helvetica-Bold')
         .fillColor('#e6e1cf')
         .text('TeensClub', 0, 30, { align: 'center' });

      doc.fontSize(9)
         .font('Helvetica')
         .fillColor('#e6e1cf')
         .opacity(0.45)
         .text('BOLETO OFICIAL · VOL.01', 0, 62, { align: 'center', characterSpacing: 3 });

      // Línea divisoria
      doc.opacity(0.15)
         .moveTo(40, 88).lineTo(360, 88).stroke('#e6e1cf');

      // Nombre del evento
      doc.opacity(1)
         .fontSize(22)
         .font('Helvetica-Bold')
         .fillColor('#e6e1cf')
         .text('TARDEADA JUNIO', 0, 105, { align: 'center' });

      // Fecha y lugar
      doc.fontSize(10)
         .font('Helvetica')
         .fillColor('#e6e1cf')
         .opacity(0.6)
         .text('DOM 14 · JUN · 2026 · 2:00 PM', 0, 132, { align: 'center', characterSpacing: 1.5 });

      doc.opacity(0.6)
         .text('GREEN PLAZA SATÉLITE · NAUCALPAN', 0, 148, { align: 'center', characterSpacing: 1.5 });

      // Línea divisoria
      doc.opacity(0.15)
         .moveTo(40, 172).lineTo(360, 172).stroke('#e6e1cf');

      // Tipo de cover
      doc.opacity(1)
         .fontSize(9)
         .font('Helvetica')
         .fillColor('#e6e1cf')
         .opacity(0.4)
         .text('TIPO DE ACCESO', 0, 188, { align: 'center', characterSpacing: 2 });

      doc.opacity(1)
         .fontSize(32)
         .font('Helvetica-Bold')
         .fillColor('#ffb84d')
         .text(ticketData.cover.toUpperCase(), 0, 202, { align: 'center' });

      // Nombre comprador
      doc.opacity(0.4)
         .fontSize(9)
         .font('Helvetica')
         .fillColor('#e6e1cf')
         .text('NOMBRE', 0, 248, { align: 'center', characterSpacing: 2 });

      doc.opacity(1)
         .fontSize(16)
         .font('Helvetica-Bold')
         .fillColor('#e6e1cf')
         .text(ticketData.buyerName.toUpperCase(), 0, 262, { align: 'center' });

      // QR Code
      const qrSize = 140;
      const qrX = (400 - qrSize) / 2;
      doc.image(qrBuffer, qrX, 300, { width: qrSize, height: qrSize });

      // Número de boleto
      doc.opacity(0.4)
         .fontSize(9)
         .font('Helvetica')
         .fillColor('#e6e1cf')
         .text('N° DE BOLETO', 0, 454, { align: 'center', characterSpacing: 2 });

      doc.opacity(1)
         .fontSize(14)
         .font('Helvetica-Bold')
         .fillColor('#e6e1cf')
         .text(ticketData.ticketNumber, 0, 468, { align: 'center', characterSpacing: 1 });

      // Franja inferior
      doc.opacity(0.15)
         .moveTo(40, 498).lineTo(360, 498).stroke('#e6e1cf');

      doc.opacity(0.35)
         .fontSize(8)
         .font('Helvetica')
         .fillColor('#e6e1cf')
         .text('Presenta este boleto en la entrada · No es reembolsable · Solo válido con ID', 0, 510, { align: 'center' });

      doc.opacity(0.2)
         .fontSize(7)
         .text('teensclub.mx · teensclubmx@gmail.com', 0, 530, { align: 'center' });

      // Franja inferior cream
      doc.opacity(1)
         .rect(0, 592, 400, 8).fill('#e6e1cf');

      doc.end();

    } catch (err) {
      reject(err);
    }
  });
}

// Envía correo con el boleto
async function sendTicketEmail(ticketData, pdfBuffer) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,      // teensclubmx@gmail.com
      pass: process.env.EMAIL_PASSWORD   // App password de Gmail
    }
  });

  await transporter.sendMail({
    from: '"TeensClub®" <teensclubmx@gmail.com>',
    to: ticketData.buyerEmail,
    subject: `🎫 Tu boleto TeensClub VOL.01 — ${ticketData.ticketNumber}`,
    html: `
      <div style="background:#0a1330;padding:40px 20px;font-family:Arial,sans-serif;max-width:500px;margin:0 auto">
        <h1 style="color:#e6e1cf;font-size:24px;margin:0 0 8px;letter-spacing:-1px">TeensClub<sup style="font-size:12px">®</sup></h1>
        <p style="color:#e6e1cf;opacity:.4;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 32px">VOL.01 · Boleto oficial</p>

        <div style="background:rgba(230,225,207,.06);border:1px solid rgba(230,225,207,.12);border-radius:16px;padding:24px;margin-bottom:24px">
          <p style="color:#e6e1cf;opacity:.4;font-size:10px;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px">¡Hola!</p>
          <p style="color:#e6e1cf;font-size:18px;font-weight:700;margin:0 0 20px">${ticketData.buyerName}</p>

          <div style="border-top:1px solid rgba(230,225,207,.1);padding-top:16px">
            <p style="color:#e6e1cf;opacity:.4;font-size:9px;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px">Evento</p>
            <p style="color:#e6e1cf;font-weight:700;margin:0 0 16px">Tardeada Junio · VOL.01</p>

            <p style="color:#e6e1cf;opacity:.4;font-size:9px;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px">Fecha</p>
            <p style="color:#e6e1cf;font-weight:700;margin:0 0 16px">Dom 14 de Junio 2026 · 2:00 PM</p>

            <p style="color:#e6e1cf;opacity:.4;font-size:9px;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px">Lugar</p>
            <p style="color:#e6e1cf;font-weight:700;margin:0 0 16px">Green Plaza Satélite · Naucalpan</p>

            <p style="color:#e6e1cf;opacity:.4;font-size:9px;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px">Cover</p>
            <p style="color:#ffb84d;font-size:20px;font-weight:700;margin:0 0 16px">${ticketData.cover}</p>

            <p style="color:#e6e1cf;opacity:.4;font-size:9px;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px">N° de boleto</p>
            <p style="color:#e6e1cf;font-weight:700;font-size:16px;margin:0">${ticketData.ticketNumber}</p>
          </div>
        </div>

        <div style="background:rgba(255,184,77,.08);border:1px solid rgba(255,184,77,.2);border-radius:12px;padding:16px;margin-bottom:24px">
          <p style="color:#ffb84d;font-size:12px;margin:0;font-weight:700">📎 Tu boleto está adjunto a este correo</p>
          <p style="color:#e6e1cf;font-size:12px;opacity:.6;margin:6px 0 0">Descárgalo y preséntalo en la entrada desde tu celular. Se escaneará el código QR.</p>
        </div>

        <p style="color:#e6e1cf;opacity:.3;font-size:10px;text-align:center;margin:0">© 2026 TeensClub · México · teensclub.mx</p>
      </div>
    `,
    attachments: [{
      filename: `TeensClub-VOL01-${ticketData.ticketNumber}.pdf`,
      content: pdfBuffer,
      contentType: 'application/pdf'
    }]
  });
}

// Handler principal
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);

    // Solo procesar pagos aprobados
    if (body.type !== 'payment' || !body.data?.id) {
      return { statusCode: 200, body: 'OK' };
    }

    // Obtener detalles del pago desde MP
    const paymentRes = await fetch(`https://api.mercadopago.com/v1/payments/${body.data.id}`, {
      headers: { 'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}` }
    });
    const payment = await paymentRes.json();

    // Solo continuar si el pago fue aprobado
    if (payment.status !== 'approved') {
      return { statusCode: 200, body: 'Payment not approved yet' };
    }

    // Datos del comprador
    const ticketData = {
      ticketNumber: generateTicketNumber(),
      buyerName: payment.payer?.first_name
        ? `${payment.payer.first_name} ${payment.payer.last_name || ''}`.trim()
        : 'Asistente',
      buyerEmail: payment.payer?.email || '',
      cover: payment.metadata?.cover_name || 'General',
      amount: payment.transaction_amount
    };

    // Generar PDF
    const pdfBuffer = await generateTicketPDF(ticketData);

    // Enviar correo
    if (ticketData.buyerEmail) {
      await sendTicketEmail(ticketData, pdfBuffer);
    }

    console.log(`Boleto generado: ${ticketData.ticketNumber} para ${ticketData.buyerEmail}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, ticket: ticketData.ticketNumber })
    };

  } catch (error) {
    console.error('Error en webhook:', error);
    return { statusCode: 500, body: 'Error interno' };
  }
};
