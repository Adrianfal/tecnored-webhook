# 🚀 TecnoRed - Webhook MercadoPago

Webhook serverless para procesar notificaciones de pago de MercadoPago y activar suscripciones automáticamente.

## 📁 Estructura
```
├── package.json          # Configuración del proyecto
├── api/
│   └── mercadopago.js    # Función serverless del webhook
└── README.md             # Este archivo
```

## 🔗 URL del Webhook
`https://tecnored-webhook.vercel.app/api/mercadopago`

## ⚡ Funcionalidad
- Recibe notificaciones POST de MercadoPago
- Procesa solo eventos tipo "payment" 
- Envía datos a Supabase para activar suscripciones
- Registra logs completos para debugging

## 🛠️ Deployment
Desplegado automáticamente en Vercel desde este repositorio.
