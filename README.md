# Simulación de concientización de phishing — COTONEB

Proyecto Node que sirve una página de **una sola pantalla** para una charla interna y
autorizada de concientización sobre phishing. Los asistentes escanean un QR, "participan en
un quiz para ganar un premio" y, al enviar, ven de inmediato una pantalla que revela que era
una simulación.

> ⚠️ **Es un ejercicio educativo.** No es una campaña real ni debe usarse fuera del contexto
> autorizado de capacitación interna.

## Qué NO hace (por diseño)

- **No captura datos.** La página no usa `fetch`, `XHR`, `WebSocket`, `form action` ni API.
  El envío hace `preventDefault()` y solo cambia de pantalla.
- **El servidor tampoco captura nada.** Solo sirve archivos estáticos: no hay rutas `POST`,
  ni base de datos, ni logging de formularios.
- **No guarda nada.** No usa `localStorage`/`sessionStorage` con datos personales. Lo que la
  persona escribe vive **solo en memoria** del navegador y se descarta al reiniciar o cerrar.
- **No pide secretos.** Sin contraseñas, PIN, usuario/clave de banca, cuenta, tarjeta, CVV ni
  DPI/CUI. Solo nombre, agencia y preguntas triviales.
- **No clona** el login real de COTONEB ni de ningún banco. Es una "promo/quiz".

## Estructura

```
.
├─ public/
│  └─ index.html          # la página (HTML + CSS + JS inline, 100% offline)
├─ server.js              # servidor Express estático
├─ ecosystem.config.js    # configuración de PM2
├─ package.json
└─ logs/                  # logs de PM2 (ignorados por git)
```

## Requisitos

- Node.js >= 18

## Desarrollo

```bash
npm install
npm run dev        # nodemon, recarga al guardar cambios
```

Abre: http://localhost:8080

Variables opcionales: `PORT` (default 8080) y `HOST` (default `0.0.0.0`, escucha en toda la red).

```bash
# ejemplo: otro puerto
PORT=3000 npm run dev
```

## Producción local / charla

Inicio simple:

```bash
npm start
```

Con **PM2**:

```bash
npm install -g pm2          # si no lo tienes
pm2 start ecosystem.config.js
pm2 status
pm2 logs cotoneb-phishing-sim
pm2 restart cotoneb-phishing-sim
pm2 stop cotoneb-phishing-sim
pm2 delete cotoneb-phishing-sim

# que arranque al encender la máquina (opcional)
pm2 save
pm2 startup
```

## Cómo sacar tu IP local (para armar el QR)

- **Windows:** `ipconfig` → busca "Dirección IPv4" (ej. `192.168.1.73`).
- **macOS:** `ipconfig getifaddr en0` (Wi-Fi).
- **Linux:** `hostname -I`.

Arma el QR apuntando a: `http://TU_IP_LOCAL:8080`
(La laptop y los teléfonos deben estar en la **misma red Wi-Fi**.)

> En Windows, si el teléfono no carga, suele ser el **Firewall** bloqueando Node en la red
> privada: permite el acceso cuando aparezca el aviso, o abre el puerto manualmente.

## Healthcheck

`GET /health` → `{"ok":true,"service":"cotoneb-phishing-sim"}`

## Recordatorio

Ni la página ni el servidor **capturan, almacenan o transmiten** datos personales. El único
propósito es educativo: enseñar a reconocer las señales de un intento de phishing y a
**verificar siempre antes de dar tus datos**.

— Equipo de Seguridad, COTONEB
