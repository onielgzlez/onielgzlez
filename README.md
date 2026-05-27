# onidevti.dev

Portafolio personal de Oniel González — Senior Full-Stack Developer & Tech Lead. Construido con [Astro](https://astro.build) y [Tailwind CSS v4](https://tailwindcss.com).

## Stack

- **Astro 6** — framework de sitios estáticos con islands architecture
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
│   └── index.astro          # página principal
└── styles/
    └── global.css           # estilos globales y tema
public/                      # assets estáticos (favicon, etc.)
astro.config.mjs             # configuración de Astro + Tailwind
```

## Despliegue

El sitio se publica en [onidevti.dev](https://onidevti.dev). El comando `pnpm build` produce los archivos estáticos en `dist/`, listos para servir desde cualquier hosting estático.
