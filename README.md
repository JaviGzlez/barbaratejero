# Bárbara Tejero Fotografía

Web de Bárbara Tejero, fotógrafa de newborn, embarazo, bebés, familia y comuniones en Jerez de la Frontera.
Dominio: https://barbaratejerofotografia.es · Despliegue: Vercel (auto-deploy desde `main`).

Sitio estático en HTML, CSS y JavaScript, sin dependencias ni `npm install`.

## Estructura

```
├── index.html                 Inicio
├── contacto.html              Formulario de WhatsApp + datos de contacto + mapa
├── embarazo.html, newborn.html, seguimiento-bebe.html, smash-cake.html,
│   familia.html, comuniones.html, navidad.html   Páginas de sesión (con preguntas frecuentes)
├── blog.html + blog-*.html    Blog: un artículo por sesión
├── aviso-legal.html           Textos legales
├── politica-privacidad.html
├── politica-cookies.html
├── 404.html                   Página de error (Vercel la usa sola)
├── css/styles.css             Estilos (colores y fuentes en :root)
├── js/main.js                 Menú, aviso de cookies, formulario
├── assets/
│   ├── img/                   Logo + fotos (ahora placeholders .svg)
│   ├── icons/                 Favicons e iconos de app
│   └── fonts/                 Fuentes alojadas en local (sin Google Fonts)
├── favicon.ico
├── site.webmanifest
└── vercel.json                URLs limpias (/contacto) y caché de assets
```

## Ver en local

VS Code → extensión **Live Server** → clic derecho en `index.html` → *Open with Live Server*.

## Reservas por WhatsApp

Todos los botones "Reserva tu sesión" / "Escríbeme" (atributo `data-booking`) abren una ventana con un formulario corto.
Al enviarlo se abre WhatsApp (686 80 62 07) con el mensaje ya redactado. La página de contacto tiene el mismo formulario fijo.
No se envía ni guarda nada en servidores. El número está en `js/main.js` (`WA_NUMBER`).

## Cookies

La web no usa cookies de terceros: las fuentes están en local y los mapas/redes son enlaces, no incrustados.
El aviso guarda la elección en `localStorage` (`bt_cookie_consent`, 12 meses).
Si en el futuro se añade Google Analytics, va dentro de `loadAnalytics()` en `js/main.js` (solo se carga si se acepta) y hay que añadirlo a la tabla de `politica-cookies.html`.

## Fotos

Las fotos reales están en `assets/img/fotos/` en WebP, en dos tamaños (`-800` y `-1600`).
Siguen con placeholder: tarjeta y página de Comuniones (`sesion-comuniones.svg`).

## Pendiente

- [ ] Texto de "Sobre mí" (Bárbara lo envía en un documento)
- [ ] Precio promo del Pack Crece Conmigo (ahora: botón "Pregunta por el precio promo")
- [ ] Revisar respuestas de preguntas frecuentes (borrador) — sobre todo la tarta del smash cake
- [ ] Fechas y precio de las mini sesiones de Navidad
- [ ] Fotos de comuniones
- [ ] Colores de redes (verde agua y rosa): pendiente de decidir
- [ ] Dirección completa del estudio (aviso legal y privacidad)
