# Documentación del Proyecto — Golden Home Lloret

**Versión del documento:** 1.0  
**Fecha:** 20 de julio de 2026  
**Proyecto:** `golden-home`  
**Sitio web:** [https://goldenhomelloret.es](https://goldenhomelloret.es)  
**Empresa:** Golden Home Lloret S.L.

---

## Índice

1. [Resumen ejecutivo](#1-resumen-ejecutivo)
2. [Información de la empresa](#2-información-de-la-empresa)
3. [Objetivos del proyecto](#3-objetivos-del-proyecto)
4. [Stack tecnológico](#4-stack-tecnológico)
5. [Arquitectura del sistema](#5-arquitectura-del-sistema)
6. [Funcionalidades desarrolladas](#6-funcionalidades-desarrolladas)
7. [Páginas y rutas](#7-páginas-y-rutas)
8. [Componentes principales](#8-componentes-principales)
9. [Modelo de datos](#9-modelo-de-datos)
10. [Gestión de imágenes](#10-gestión-de-imágenes)
11. [Internacionalización (i18n)](#11-internacionalización-i18n)
12. [SEO y legal](#12-seo-y-legal)
13. [Estructura del repositorio](#13-estructura-del-repositorio)
14. [Scripts y despliegue](#14-scripts-y-despliegue)
15. [Guía de mantenimiento](#15-guía-de-mantenimiento)
16. [Limitaciones actuales](#16-limitaciones-actuales)
17. [Coste estimado del desarrollo](#17-coste-estimado-del-desarrollo)
18. [Costes de operación (hosting y dominio)](#18-costes-de-operación-hosting-y-dominio)
19. [Hoja de ruta recomendada](#19-hoja-de-ruta-recomendada)
20. [Anexos](#20-anexos)

---

## 1. Resumen ejecutivo

**Golden Home Lloret** es un sitio web inmobiliario premium (SPA estática) orientado a la venta y promoción de villas y propiedades de alto standing en la Costa Brava (Lloret de Mar, Blanes, Barcelona y alrededores).

La aplicación está construida con **React 19 + TypeScript + Vite**, sin backend propio: el catálogo de inmuebles y el blog se gestionan mediante archivos JSON locales. Incluye **4 idiomas** (español, catalán, inglés y francés), búsqueda avanzada, filtros, favoritos, comparador, mapas, blog, modo oscuro, SEO completo y despliegue estático en Vercel o Netlify.

| Aspecto | Detalle |
|--------|---------|
| Tipo de producto | Sitio web inmobiliario SPA (Single Page Application) |
| Propiedades en catálogo | 20 listados JSON |
| Idiomas | ES · CA · EN · FR |
| Backend | No (datos estáticos en build) |
| Autenticación | No |
| Hosting previsto | Vercel / Netlify (carpeta `dist/`) |
| Estado | Listo para producción como marketing site |

---

## 2. Información de la empresa

| Campo | Valor |
|-------|-------|
| Nombre comercial | Golden Home Lloret |
| Razón social | Golden Home Lloret S.L. |
| Dirección | Av. Pau Casals 38, 17310 Lloret de Mar, Girona, Spain |
| Teléfono | +34 601 901 275 |
| WhatsApp | https://wa.me/34601901275 |
| Email | goldenhomelloret@gmail.com |
| Web | https://goldenhomelloret.es |
| Horario | Lunes a viernes 9:30–19:00 · Sábados 10:00–14:00 |

---

## 3. Objetivos del proyecto

1. **Presencia digital premium** alineada con el segmento de lujo en Costa Brava.
2. **Captación de leads** mediante contacto directo (WhatsApp, teléfono, email y formulario).
3. **Catálogo consultable** con búsqueda, filtros, mapa y fichas detalladas.
4. **Alcance internacional** con 4 idiomas y SEO multilingüe (`hreflang`).
5. **Mantenimiento sencillo** del inventario: añadir propiedades vía JSON + carpeta de fotos, sin cambios de código.
6. **Rendimiento y SEO**: code splitting, meta tags, Schema.org, sitemap y robots.

---

## 4. Stack tecnológico

### 4.1 Frontend

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | ^19.2.7 | UI |
| React DOM | ^19.2.7 | Renderizado |
| TypeScript | ~6.0.2 | Tipado estático |
| Vite | ^8.1.1 | Build y dev server |
| React Router DOM | ^7.18.1 | Enrutado SPA |
| Tailwind CSS | ^4.3.2 | Estilos |
| Framer Motion | ^12.42.2 | Animaciones |
| Zustand | ^5.0.14 | Estado global (persistido) |

### 4.2 Librerías de producto

| Librería | Versión | Uso |
|----------|---------|-----|
| i18next / react-i18next | ^26.3.6 / ^17.0.9 | Traducciones |
| i18next-browser-languagedetector | ^8.2.1 | Detección de idioma |
| Fuse.js | ^7.5.0 | Búsqueda difusa |
| Swiper | ^14.0.5 | Carruseles / galerías |
| Leaflet / react-leaflet | ^1.9.4 / ^5.0.0 | Mapa de propiedades |
| react-hook-form | ^7.81.0 | Formulario de contacto |
| react-helmet-async | ^3.0.0 | Meta SEO |
| react-markdown + remark-gfm | ^10.1.0 / ^4.0.1 | Contenido del blog |
| lucide-react | ^1.24.0 | Iconografía |

### 4.3 Herramientas de desarrollo

| Herramienta | Uso |
|-------------|-----|
| Oxlint / ESLint | Linting |
| Prettier | Formato de código |
| `@vitejs/plugin-react` | Plugin React para Vite |
| Node scripts | Manifest de imágenes y logo |

### 4.4 Fuentes y diseño

- **Cormorant Garamond** (serif, marca / títulos)
- **Inter** (sans, UI)
- Paleta: oro (`#c9a962`), carbón (`#1a1a1a`), blanco cálido (`#faf8f5`)

### 4.5 Backend e integraciones externas

- **Sin API propia ni base de datos.**
- Integraciones externas (solo cliente):
  - Google Maps (embeds / direcciones)
  - WhatsApp / redes sociales
  - OpenStreetMap (tiles Leaflet)
  - Google Fonts
  - Imágenes Unsplash (algunos assets decorativos)

---

## 5. Arquitectura del sistema

```
┌─────────────────────────────────────────────────────────────┐
│                     Navegador del usuario                    │
│  React SPA (lazy routes) + Zustand (localStorage) + i18n    │
└───────────────────────────┬─────────────────────────────────┘
                            │
         ┌──────────────────┼──────────────────┐
         ▼                  ▼                  ▼
   JSON propiedades    JSON blog        Manifest imágenes
   (src/properties/)   (src/data/blog/) (src/generated/)
         │                  │                  │
         └──────────────────┴──────────────────┘
                            │
                    Build Vite → dist/
                            │
              Vercel / Netlify / hosting estático
```

**Flujo de datos de propiedades**

1. Archivos JSON en `src/properties/` se cargan con `import.meta.glob`.
2. El servicio `propertyService` los normaliza (títulos localizados, imágenes desde manifest).
3. Hooks (`useProperties`, `useProperty`) exponen datos a las páginas.
4. Filtros y ordenación viven en `useFilterStore` (Zustand).
5. Favoritos, comparador, moneda y tema se persisten en `localStorage`.

---

## 6. Funcionalidades desarrolladas

### 6.1 Catálogo inmobiliario

| Función | Descripción |
|---------|-------------|
| Listado de propiedades | Catálogo con paginación infinita (6 por carga) |
| Ficha de detalle | Galería, datos técnicos, descripción, mapa, relacionados |
| Tipos | Villa, apartamento, ático, adosada, terreno, comercial |
| Estados | En venta, alquiler, vendido, reservado |
| Banderas | Destacada, exclusiva, lujo, obra nueva, piscina, vistas al mar, etc. |
| Contenido localizado | Título, descripción y SEO en 4 idiomas |

### 6.2 Búsqueda y filtros

| Función | Descripción |
|---------|-------------|
| Búsqueda fuzzy | Fuse.js sobre título, descripción, ubicación, referencia, ciudad |
| Filtros | Precio, dormitorios, baños, tipo, ubicación, superficie, amenities |
| Ordenación | Más recientes, precio ↑↓, vistas, destacadas |
| Sticky search | Barra de búsqueda fija en el header tras scroll |

### 6.3 Experiencia de usuario

| Función | Descripción |
|---------|-------------|
| Favoritos | Guardado en `localStorage` (`golden-home-app`) |
| Comparador | Hasta 3 propiedades en vista lado a lado |
| Vistos recientemente | Hasta 10 propiedades |
| Conversor de moneda | EUR / USD / GBP (tasas estáticas en código) |
| Modo oscuro | Toggle + prevención de FOUC en `index.html` |
| Compartir | Web Share API, portapapeles, WhatsApp, email, Telegram, Facebook, X |
| Botones flotantes | WhatsApp, teléfono, contacto, volver arriba |
| Animaciones | Framer Motion + ScrollReveal |
| Responsive | Adaptado a móvil y escritorio |

### 6.4 Contenido y marketing

| Función | Descripción |
|---------|-------------|
| Home | Hero, búsqueda, destacadas, mapa, categorías, Instagram |
| Sobre nosotros | Historia, valores, timeline |
| Blog | 3 artículos Markdown con categorías y relacionados |
| Contacto | Formulario + datos de oficina + mapa embed |

### 6.5 Legal y cumplimiento

| Función | Descripción |
|---------|-------------|
| Consentimiento de cookies | Banner + store persistido |
| Modal legal | Aviso legal, privacidad, cookies |
| Documentos | Contenido en `src/data/legalDocuments.ts` |

### 6.6 SEO técnico

| Función | Descripción |
|---------|-------------|
| Meta tags | Title, description, Open Graph, Twitter Cards |
| Canonical + hreflang | Por idioma |
| JSON-LD | Schema.org (RealEstateAgent / propiedades) |
| sitemap.xml / robots.txt | En `public/` |

---

## 7. Páginas y rutas

Todas las rutas (salvo redirección raíz) van prefijadas por idioma: `/:lang` donde `lang ∈ {es, ca, en, fr}`.

| Ruta | Página | Archivo | Función |
|------|--------|---------|---------|
| `/` | Redirección | `App.tsx` | Detecta idioma del navegador → `/{lang}` (fallback `es`) |
| `/:lang` | Inicio | `HomePage.tsx` | Landing principal |
| `/:lang/properties` | Catálogo | `PropertiesPage.tsx` | Listado + filtros |
| `/:lang/properties/:slug` | Detalle | `PropertyDetailPage.tsx` | Ficha de inmueble |
| `/:lang/about` | Nosotros | `AboutPage.tsx` | Marca y valores |
| `/:lang/contact` | Contacto | `ContactPage.tsx` | Formulario y oficina |
| `/:lang/blog` | Blog | `BlogPage.tsx` | Listado de posts |
| `/:lang/blog/:slug` | Artículo | `BlogPostPage.tsx` | Post en Markdown |
| `/:lang/favorites` | Favoritos | `FavoritesPage.tsx` | Guardados del usuario |
| `/:lang/compare` | Comparar | `ComparePage.tsx` | Comparativa (máx. 3) |
| `*` | 404 | `NotFoundPage.tsx` | Página no encontrada |

Layout común: `MainLayout` (Header, Footer, FloatingButtons, CookieConsent, LegalModal).

---

## 8. Componentes principales

### 8.1 Layout (`src/components/layout/`)

| Componente | Rol |
|------------|-----|
| `MainLayout` | Shell de página, transiciones, scroll al cambiar ruta |
| `Header` | Navegación, mega-menú, idioma/moneda/tema, sticky search |
| `Footer` | Enlaces, redes, legales |
| `FloatingButtons` | CTA de contacto rápido |

### 8.2 Propiedades (`src/components/property/`)

| Componente | Rol |
|------------|-----|
| `PropertyCard` / `PropertyGrid` | Tarjetas y rejilla del catálogo |
| `PropertyCardGallery` / `PropertyDetailGallery` / `PropertyPhotoGallery` | Galerías |
| `PropertyBadges` | Etiquetas (destacada, exclusiva…) |
| `PropertiesMap` | Mapa Leaflet con marcadores |

### 8.3 Búsqueda (`src/components/search/`)

| Componente | Rol |
|------------|-----|
| `SearchBar` | Búsqueda del hero |
| `StickySearchBar` | Búsqueda fija + sugerencias Fuse |
| `FilterPanel` | Panel de filtros |
| `SortSelect` | Selector de orden |

### 8.4 UI, SEO y legal

- UI: `Button`, `Container`, `Logo`, `LanguageSelector`, `CurrencySelector`, `DarkModeToggle`, `Breadcrumbs`, `Skeleton`, etc.
- SEO: `SEO` (Helmet + JSON-LD)
- Legal: `CookieConsent`, `LegalModal`

### 8.5 Stores (Zustand)

| Store | Persistencia | Contenido |
|-------|--------------|-----------|
| `useAppStore` | `golden-home-app` | Favoritos, compare, recently viewed, moneda, dark mode |
| `useFilterStore` | Memoria | Filtros y sort activos |
| `useLegalStore` | `golden-home-legal` | Consentimiento de cookies |

### 8.6 Servicios

| Servicio | Funciones clave |
|----------|-----------------|
| `propertyService` | `getAllProperties`, `getPropertyBySlug`, `getFeaturedProperties`, `getRelatedProperties`, `searchPropertiesByQuery`, `filterProperties`, rangos de precio, ciudades/provincias únicas |
| `blogService` | `getAllPosts`, `getPostBySlug`, `getRelatedPosts`, `getPostsByCategory` |

### 8.7 Hooks

| Hook | Uso |
|------|-----|
| `useProperties` | Lista filtrada/ordenada según idioma |
| `useProperty` | Detalle por slug |
| `useLocalizedProperty` | Aplana campos localizados |
| `useInfiniteScroll` | Paginación por IntersectionObserver |
| `useScrollPosition` | Posición de scroll (sticky / parallax) |
| `useMediaQuery` | Breakpoints (filtros responsive) |

---

## 9. Modelo de datos

Definición principal: `src/types/property.ts`.

### 9.1 Tipos base

```ts
Language = 'es' | 'ca' | 'en' | 'fr'
Currency = 'EUR' | 'USD' | 'GBP'
LocalizedString = { es, ca, en, fr }
PropertyStatus = 'sale' | 'rent' | 'sold' | 'reserved'
PropertyType = 'villa' | 'apartment' | 'penthouse' | 'townhouse' | 'land' | 'commercial'
SortOption = 'newest' | 'price-asc' | 'price-desc' | 'views' | 'featured'
```

### 9.2 Entidad `Property` (campos principales)

| Campo | Descripción |
|-------|-------------|
| `id`, `reference`, `slug` | Identificación |
| `title`, `description`, `seo` | Textos localizados |
| `price` | Precio en EUR base |
| `location`, `province`, `city`, `coordinates` | Ubicación |
| `type`, `status` | Tipología y estado |
| `bedrooms`, `bathrooms`, `builtArea`, `plotArea` | Características |
| `features[]` | Amenities |
| `images[]` / `imageCount` | Resueltas en runtime desde manifest |
| `energyCertificate` | Calificación energética A–G |
| `virtualTour`, `youtube` | Opcionales |
| Flags booleanas | `featured`, `exclusive`, `luxury`, `pool`, `seaViews`, etc. |
| `views`, `createdAt` | Métricas / fecha |
| `listingDetails`, `nearbyPlaces` | Detalle ampliado (opcional) |

### 9.3 Blog

- Tipo `BlogPost` con título/contenido localizado, categoría, tags, slug.
- 3 posts actuales en `src/data/blog/`.

---

## 10. Gestión de imágenes

Sistema automático basado en el sistema de archivos:

1. Fotos en `public/properties/{slug}/` como `01.png`, `02.png`… (también jpg/jpeg/webp).
2. Script `scripts/generatePropertyImageManifest.mjs` escanea carpetas y genera `src/generated/propertyImages.manifest.ts`.
3. Se ejecuta en `npm run dev`, `npm run build` y `npm run sync:property-images`.
4. Plugin Vite vigila cambios en `public/properties/` y regenera el manifest.
5. Límite: **máximo 20 imágenes** por propiedad.
6. En runtime, `resolvePropertyImages(slug)` / `normalizeProperty` **prioriza el manifest** sobre el array `images` del JSON.

---

## 11. Internacionalización (i18n)

| Código | Archivo | Rol |
|--------|---------|-----|
| `es` | `src/locales/es.json` | Idioma por defecto |
| `ca` | `src/locales/ca.json` | Catalán |
| `en` | `src/locales/en.json` | Inglés |
| `fr` | `src/locales/fr.json` | Francés |

- Inicialización: `src/i18n/index.ts`
- Detección: `localStorage` → `navigator` → `htmlTag`
- Namespaces UI: `nav`, `hero`, `search`, `property`, `home`, `about`, `contact`, `blog`, `footer`, `common`, `floatingButtons`, `legal`, `seo`
- Contenído de propiedades y blog también multilenguaje vía `LocalizedString`

---

## 12. SEO y legal

### SEO

- Componente `SEO` + utilidades en `src/utils/seo.ts`
- Canonical, hreflang, Open Graph, Twitter
- Locales OG: `es_ES`, `ca_ES`, `en_GB`, `fr_FR`
- `public/sitemap.xml`, `public/robots.txt`

### Legal

- Cookie consent + documentos legales (aviso, privacidad, cookies)
- Sin panel de administración de consentimiento de terceros (solo store local)

---

## 13. Estructura del repositorio

```
Golden Home/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig*.json
├── vercel.json / netlify.toml
├── DOCUMENTACION.md          ← este documento
├── README.md
├── scripts/
│   ├── generatePropertyImageManifest.mjs
│   └── generate-logo-light.mjs
├── public/
│   ├── logo*.png, favicon, robots.txt, sitemap.xml
│   └── properties/{slug}/01.png…N.png
└── src/
    ├── App.tsx, main.tsx
    ├── components/   # UI, layout, property, search, seo, legal, home
    ├── pages/        # Rutas lazy-loaded
    ├── hooks/
    ├── services/     # propertyService, blogService
    ├── stores/       # Zustand
    ├── locales/      # es, ca, en, fr
    ├── properties/   # 20 JSON de inmuebles
    ├── data/         # blog + legalDocuments
    ├── generated/    # propertyImages.manifest.ts (auto)
    ├── types/
    ├── utils/
    └── styles/
```

---

## 14. Scripts y despliegue

### Scripts npm

| Comando | Acción |
|---------|--------|
| `npm install` | Instalar dependencias |
| `npm run sync:property-images` | Regenerar manifest de fotos |
| `npm run dev` | Sync imágenes + servidor de desarrollo |
| `npm run build` | Sync + TypeScript + build de producción |
| `npm run preview` | Previsualizar `dist/` |
| `npm run lint` | Oxlint |

### Despliegue

1. `npm run build`
2. Publicar carpeta `dist/` en **Vercel** o **Netlify**
3. Ya configurado:
   - Fallback SPA → `index.html`
   - Redirect www → apex (`goldenhomelloret.es`)

**No se requieren variables de entorno** para el funcionamiento actual.  
(`VITE_SITE_URL` está tipado pero no se usa; la URL sale de `COMPANY.website`.)

---

## 15. Guía de mantenimiento

### Añadir una propiedad

1. Crear `src/properties/{slug}.json` con el esquema de las existentes (`id`, `slug`, `title` localizado, `price`, ubicación, etc.).
2. Crear carpeta `public/properties/{slug}/` con fotos `01.png`, `02.png`…
3. Ejecutar `npm run sync:property-images` (o `npm run dev` / `build`).
4. Verificar en `/:lang/properties/{slug}`.

### Añadir un post de blog

1. Crear JSON en `src/data/blog/` con campos localizados y Markdown.
2. El servicio lo carga automáticamente vía glob.

### Actualizar textos UI

Editar `src/locales/{es|ca|en|fr}.json`.

### Actualizar datos de empresa

Editar `src/utils/constants.ts` (`COMPANY`, `SOCIAL`, etc.).

---

## 16. Limitaciones actuales

| Área | Estado |
|------|--------|
| Backend / CMS | No existe; contenido solo por JSON/archivos |
| Formulario de contacto | Simulado (éxito tras timeout); **no envía email ni CRM** |
| Calculadora hipotecaria | Mencionado en README; **no implementada** |
| Tipo `TeamMember` | Definido; **sin uso en UI** |
| Tasas de cambio | Estáticas (no API FX en tiempo real) |
| Autenticación / área privada | No |
| Analítica (GA, Meta Pixel) | No integrada en código |
| Embla Carousel | En `package.json` pero no usado (se usa Swiper) |

---

## 17. Coste estimado del desarrollo

Estimación orientativa para el **mercado español (2026)**, basada en el alcance real del repositorio: SPA premium multilenguaje, catálogo, mapas, SEO, blog, favoritos/comparador y sistema de imágenes automático.

> Los importes son **estimaciones de mercado**, no una factura. Pueden variar según perfil del equipo (freelance junior / senior / agencia), plazos y revisiones de diseño.

### 17.1 Desglose por módulos (horas)

| Módulo | Horas estimadas | Descripción |
|--------|-----------------|-------------|
| Discovery, arquitectura y setup | 12–16 h | Vite, TS, Tailwind, routing, estructura |
| Diseño UI / sistema visual | 35–50 h | Marca, tipografía, tokens, responsive, dark mode |
| Layout (Header, Footer, floating) | 20–28 h | Mega-menú, sticky search, CTAs |
| Home + animaciones | 25–35 h | Hero, secciones, slideshow, motion |
| Catálogo + filtros + búsqueda Fuse | 40–55 h | Listado, infinite scroll, sort, panel filtros |
| Ficha de propiedad + galerías | 30–40 h | Detalle, compartir, relacionados |
| Mapa Leaflet + embeds Google | 12–18 h | Marcadores, popups, contacto |
| Favoritos / compare / recently viewed | 12–16 h | Zustand + persistencia |
| i18n completo (4 idiomas) | 28–40 h | Locales UI + contenido + rutas `/:lang` |
| Blog Markdown | 12–18 h | Listado, detalle, relacionados |
| SEO técnico + legal/cookies | 16–22 h | Helmet, schema, hreflang, legales |
| Sistema de imágenes (manifest) | 10–14 h | Script + plugin Vite |
| Contacto + páginas About / 404 | 12–16 h | Formulario RHF, contenido |
| QA, build, deploy, pulido | 20–30 h | Lint, preview, Vercel/Netlify, fixes |
| **Total** | **≈ 284 – 398 h** | |

**Valor de referencia adoptado:** **≈ 340 horas** de desarrollo productizado.

### 17.2 Tarifas horarias de referencia (España)

| Perfil | Tarifa orientativa | Coste total (~340 h) |
|--------|--------------------|----------------------|
| Freelance mid | 40–50 €/h | **13.600 – 17.000 €** |
| Freelance senior | 55–70 €/h | **18.700 – 23.800 €** |
| Agencia digital | 65–90 €/h | **22.100 – 30.600 €** |

### 17.3 Precio por paquetes (visión comercial)

| Escenario | Rango estimado | Incluye |
|-----------|----------------|---------|
| **Básico (freelance)** | **12.000 – 16.000 €** | Core SPA + catálogo + 2 idiomas + deploy |
| **Real del proyecto actual** | **16.000 – 24.000 €** | 4 idiomas, mapas, blog, SEO, favoritos/compare, sistema imágenes, UI premium |
| **Agencia / llave en mano** | **24.000 – 32.000 €** | Mismo alcance + gestión de proyecto, revisiones de diseño, documentación y puesta en marcha |

### 17.4 Coste estimado “oficial” para este deliverable

| Concepto | Importe estimado |
|----------|------------------|
| Desarrollo web (alcance actual) | **18.500 €** |
| Diseño UI/UX incluido en el paquete | Incluido |
| Documentación técnica | Incluida |
| **Total desarrollo (referencia)** | **18.500 € + IVA** |

*Nota:* Si se hubiera cotizado solo “MVP mínimo” (1 idioma, sin blog, sin comparador), el rango bajaría a ~10.000–13.000 €. El valor del proyecto actual se sitúa en la banda media-alta por i18n ×4, SEO y experiencia de catálogo.

### 17.5 Valor por funcionalidad (aproximado)

| Bloque | % del esfuerzo | Valor aprox. |
|--------|----------------|--------------|
| Diseño + layout + home | 25% | ~4.600 € |
| Catálogo, búsqueda, ficha, mapa | 30% | ~5.550 € |
| i18n + SEO + legal | 18% | ~3.330 € |
| Favoritos / compare / UX avanzada | 10% | ~1.850 € |
| Blog + contacto + about | 8% | ~1.480 € |
| Infra build, imágenes, deploy, QA | 9% | ~1.690 € |
| **Total** | 100% | **~18.500 €** |

---

## 18. Costes de operación (hosting y dominio)

Costes recurrentes típicos (sin IVA), una vez el sitio está en producción:

| Concepto | Coste mensual | Coste anual | Notas |
|----------|---------------|-------------|-------|
| Hosting Vercel / Netlify (hobby/pro light) | 0 – 20 € | 0 – 240 € | SPA estática; plan free suele bastar al inicio |
| Dominio `.es` | — | 8 – 15 € | Renovación anual |
| Email corporativo (opcional) | 0 – 6 € | 0 – 72 € | Google Workspace / Microsoft 365 |
| CDN / SSL | Incluido | Incluido | En Vercel/Netlify |
| **Total operativo típico** | **0 – 30 €/mes** | **≈ 50 – 350 €/año** | |

**No incluidos** (si se añaden más adelante): CMS headless, envío de emails transaccionales, CRM, analítica de pago, API de tipos de cambio, chatbot.

---

## 19. Hoja de ruta recomendada

Prioridades sugeridas para evolucionar el producto:

| Prioridad | Mejora | Beneficio | Esfuerzo | Coste aprox. |
|-----------|--------|-----------|----------|--------------|
| P1 | Envío real del formulario (EmailJS / Formspree / API) | Leads reales | 6–10 h | 400–700 € |
| P1 | Google Analytics / Meta Pixel | Medición | 3–5 h | 200–350 € |
| P2 | CMS (Sanity / Strapi / Contentful) | Autonomía del cliente | 40–70 h | 2.500–5.000 € |
| P2 | Calculadora hipotecaria | Conversión | 8–14 h | 500–900 € |
| P3 | Panel admin / autenticación | Gestión interna | 60–100 h | 4.000–7.500 € |
| P3 | Tasas FX en tiempo real | Precisión moneda | 4–8 h | 250–500 € |
| P3 | Página equipo real | Confianza | 6–10 h | 400–700 € |

---

## 20. Anexos

### A. Dependencias de producción (`package.json`)

React 19, React Router 7, Tailwind 4, Framer Motion, Zustand, i18next, Fuse.js, Swiper, Leaflet, react-hook-form, react-helmet-async, react-markdown, lucide-react.

### B. Contacto técnico del producto

- Repositorio local: `C:\Users\maxi_\Desktop\Projects\Golden Home`
- README operativo: `README.md`
- Constantes de marca: `src/utils/constants.ts`

### C. Cómo exportar este documento a PDF

1. Abrir `DOCUMENTACION.md` en VS Code / Cursor.
2. Usar extensión “Markdown PDF” / “Print” del preview, **o**
3. Abrir en GitHub / Typora / Pandoc:

```bash
pandoc DOCUMENTACION.md -o DOCUMENTACION.pdf --toc --pdf-engine=xelatex
```

---

## Control de cambios

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 1.0 | 2026-07-20 | Documentación de proyecto | Versión inicial completa |

---

*Documento generado a partir del estado actual del código del repositorio Golden Home Lloret.*
