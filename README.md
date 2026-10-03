# Bárbara Tejero Fotografía

Web de Bárbara Tejero, fotógrafa de newborn, embarazo, bebés, familia y comuniones en Jerez de la Frontera.
Dominio: https://barbaratejerofotografia.es · Despliegue: Vercel (auto-deploy desde `main`).

Sitio estático en HTML, CSS y JavaScript, sin dependencias ni `npm install`.

## Estructura

```
├── index.html                 Inicio
├── contacto.html              Formulario + datos de contacto + mapa
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

## Activar el formulario (Web3Forms, gratis)

1. Entra en https://web3forms.com, escribe **hola@barbaratejerofotografia.es** y pulsa *Create Access Key*.
2. Te llega la clave por email a ese buzón.
3. En `contacto.html` sustituye `TU_ACCESS_KEY_DE_WEB3FORMS` por la clave.
4. `git push` y listo: los mensajes llegarán a ese email (con *responder* directo al cliente).

Mientras no se ponga la clave, el formulario avisa e invita a escribir por WhatsApp.

## Cookies

La web no usa cookies de terceros: las fuentes están en local y los mapas/redes son enlaces, no incrustados.
El aviso guarda la elección en `localStorage` (`bt_cookie_consent`, 12 meses).
Si en el futuro se añade Google Analytics, va dentro de `loadAnalytics()` en `js/main.js` (solo se carga si se acepta) y hay que añadirlo a la tabla de `politica-cookies.html`.

## Sustituir las fotos

Guarda la foto real en `assets/img/` (mejor `.webp` o `.jpg` de 200–400 KB) y cambia el `src` en `index.html`:

| Placeholder           | Uso                          | Medida      |
|-----------------------|------------------------------|-------------|
| hero.svg              | Cabecera principal           | 1200×900    |
| sesion-*.svg          | Tarjetas de sesiones (×5)    | 600×760     |
| banner-newborn.svg    | Banner "Pequeños detalles"   | 1600×600    |
| sobre-mi.svg          | Sección Sobre mí             | 1000×800    |
| cta-manos.svg         | Banner final                 | 1600×400    |

## Pendiente

- [ ] Dirección completa del estudio (aviso legal y privacidad: buscar `Jerez de la Frontera (Cádiz), España`)
- [ ] Confirmar titular legal (`Bárbara Tejero Perea`)
- [ ] Clave de Web3Forms
- [ ] Fotos reales
- [ ] Páginas: Newborn, Embarazo, Bebés, Familia, Comuniones, Galería, Blog
