'use strict';

/**
 * Servidor estático para la SIMULACIÓN de concientización de phishing — COTONEB.
 *
 * Solo sirve archivos estáticos desde /public. NO recibe, guarda ni transmite
 * datos personales: no hay rutas POST, ni base de datos, ni logging de formularios.
 * La página (public/index.html) sigue siendo 100% offline y sin captura de datos.
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0'; // escucha en toda la red local

// Cabeceras de seguridad básicas (sin dependencias externas)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  next();
});

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html'],
  index: 'index.html'
}));

// Healthcheck simple
app.get('/health', (req, res) => res.json({ ok: true, service: 'cotoneb-phishing-sim' }));

// Cualquier otra ruta devuelve la única página
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`\n  Simulación COTONEB corriendo:`);
  console.log(`   Local:   http://localhost:${PORT}`);
  console.log(`   Red:     http://<TU_IP_LOCAL>:${PORT}  (usa esta para el QR)\n`);
});
