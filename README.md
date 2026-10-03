# Bárbara Tejero Fotografía

Web de Bárbara Tejero, fotógrafa de newborn, embarazo, bebés, familia y comuniones en Jerez de la Frontera.

Sitio estático en HTML, CSS y JavaScript sin dependencias ni proceso de build.

## Estructura

```
├── index.html          Página de inicio
├── css/styles.css      Estilos (variables de color y tipografía en :root)
├── js/main.js          Menú móvil, cabecera al hacer scroll, animaciones de entrada
└── assets/
    ├── img/            Imágenes (ahora mismo placeholders .svg)
    └── icons/          Favicon
```

## Ver en local

Abre `index.html` en el navegador, o levanta un servidor:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Sustituir las fotos

Cada placeholder indica la medida recomendada. Guarda la foto real en `assets/img/` (mejor en `.webp` o `.jpg`, ~200–400 KB) y cambia la ruta del `src` en `index.html`:

| Archivo placeholder       | Uso                          | Medida      |
|---------------------------|------------------------------|-------------|
| hero.svg                  | Cabecera principal           | 1200×900    |
| sesion-*.svg              | Tarjetas de sesiones (×5)    | 600×760     |
| banner-newborn.svg        | Banner "Pequeños detalles"   | 1600×600    |
| sobre-mi.svg              | Sección Sobre mí             | 1000×800    |
| cta-manos.svg             | Banner final                 | 1600×400    |

## Pendiente

- [ ] Páginas: Sobre mí, Newborn, Embarazo, Bebés, Familia, Comuniones, Galería, Blog, Contacto
- [ ] Fotos reales
- [ ] Confirmar teléfono de WhatsApp (ahora `34666006207`), email e Instagram
- [ ] Formulario de contacto

## Publicar

Funciona tal cual en GitHub Pages, Netlify o Vercel (carpeta raíz, sin build).
