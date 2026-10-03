# Bárbara Tejero Fotografía

Web de Bárbara Tejero, fotógrafa de newborn, embarazo, bebés, familia y comuniones en Jerez de la Frontera.
Dominio: https://barbaratejerofotografia.es · Despliegue: Vercel (auto-deploy desde `main`).

Sitio estático en HTML, CSS y JavaScript, sin dependencias ni `npm install`.

## Estructura

```
├── index.html                 Inicio
├── contacto.html              Formulario de WhatsApp + datos de contacto + mapa
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
Siguen con placeholder: tarjetas de Embarazo, Bebés y Comuniones (`sesion-*.svg`, vertical 4:5).

## Pendiente

- [ ] Dirección completa del estudio (aviso legal y privacidad: buscar `Jerez de la Frontera (Cádiz), España`)
- [ ] Confirmar titular legal (`Bárbara Tejero Perea`)
- [ ] Fotos de embarazo, bebés y comuniones
- [ ] Páginas: Newborn, Embarazo, Bebés, Familia, Comuniones, Galería, Blog
