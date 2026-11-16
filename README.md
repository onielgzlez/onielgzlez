# onidevti.dev

Portafolio personal de Oniel González — Senior Full-Stack Developer & Tech Lead. Construido con [Astro](https://astro.build) y [Tailwind CSS v4](https://tailwindcss.com).

## Stack

- **Astro 7** — framework de sitios estáticos con islands architecture
- **Tailwind CSS v4** — vía el plugin de Vite (`@tailwindcss/vite`)
- **pnpm** — gestor de paquetes

## Desarrollo

```bash
pnpm install      # instala dependencias
pnpm dev          # servidor de desarrollo en http://localhost:4321
pnpm build        # genera el sitio en dist/
pnpm preview      # previsualiza el build de producción
```

## Estructura

```
src/
├── components/
│   └── ProjectCard.astro    # tarjeta de proyecto
├── pages/
│   ├── index.astro          # entrada con detección de idioma
│   └── [locale].astro       # rutas /en/, /es/ y /pt-br/
├── layouts/
│   └── Portfolio.astro      # plantilla compartida
├── i18n/                    # diccionarios y tipos de locales
└── styles/
    └── global.css           # estilos globales y tema
public/                      # assets estáticos (favicon, etc.)
astro.config.mjs             # configuración de Astro + Tailwind
```

## Despliegue

El sitio se publica en [onidevti.dev](https://onidevti.dev). El comando `pnpm build` produce los archivos estáticos en `dist/`, listos para servir desde cualquier hosting estático.

## Idiomas

El sitio genera `/en/`, `/es/` y `/pt-br/` como páginas estáticas completas.
La entrada `/` consulta `navigator.languages` (o `navigator.language`) en orden
de preferencia: `es-*` corresponde a español, `en-*` a inglés y `pt-*` a
portugués de Brasil. Si no encuentra un idioma compatible, utiliza inglés.
Sin JavaScript, la entrada muestra inglés y permite cambiar de idioma mediante enlaces.

Los enlaces directos a un locale respetan su idioma; la detección solo ocurre en `/`.
El selector permite cambiar de idioma sin guardar una preferencia persistente.
Las redirecciones conservan los parámetros de consulta y el fragmento de la URL.
Los PDF descargables conservan sus archivos originales.

Para editar textos, utiliza `src/i18n/{en,es,pt-br}.json`. Cada página incluye
`lang`, canonical y alternativas `hreflang`.

Verificación de rutas, contenido y detección de idioma:

```bash
pnpm build
node --test tests/locales.test.mjs
```
