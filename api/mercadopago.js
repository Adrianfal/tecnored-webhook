// 🚀 WEBHOOK DE MERCADOPAGO PARA TECNORED → VERCEL
export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  console.log('🔔 Webhook recibido:', req.body);

  // Verificar datos válidos
  if (!req.body || !req.body.type) {
    return res.status(400).json({ error: 'Datos de webhook no válidos' });
  }

  // Solo procesar eventos de pago
  if (req.body.type !== 'payment') {
    return res.json({
      exito: true,
      mensaje: 'Evento ignorado - no es un pago'
    });
  }

  try {
    // 🔗 Llamada a Supabase
    const supabaseResponse = await fetch(
      'https://jwzuqbyyblmajevteube.supabase.co/rest/v1/rpc/process_mp_webhook',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3enVxYnl5YmxtYWpldnRldWJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4NzAzNzksImV4cCI6MjA0MDQ0NjM3OX0.FgMHi_kfEVAGJpJHdUVW4pq-e2_ZrPGhzKe8v9onH24',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3enVxYnl5YmxtYWpldnRldWJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4NzAzNzksImV4cCI6MjA0MDQ0NjM3OX0.FgMHi_kfEVAGJpJHdUVW4pq-e2_ZrPGhzKe8v9onH24'
        },
        body: JSON.stringify({ webhook_payload: req.body })
      }
    );

    const resultado = await supabaseResponse.json();

    if (supabaseResponse.ok) {
      console.log('✅ Webhook procesado exitosamente:', resultado);
      return res.status(200).json({
        exito: true,
        mensaje: 'Webhook procesado correctamente',
        datos: resultado
      });
    } else {
      console.error('❌ Error en Supabase:', resultado);
      return res.status(500).json({
        exito: false,
        mensaje: 'Error al procesar webhook',
        error: resultado
      });
    }

  } catch (error) {
    console.error('💥 Error general:', error);
    return res.status(500).json({
      exito: false,
      mensaje: 'Error interno del servidor',
      error: error.message
    });
  }
}
