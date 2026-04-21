# Antigravity Agent Rules: Chef-Coder Edition (v4.0)

# AGENTS.md - Reglas para Agentes de IA

## 1. Core Stack Context
- **Framework:** Next.js 16.2.1 (App Router) + React 19.
- **Styling:** Tailwind CSS 4.
- **Icons:** Lucide-React (única librería de iconos — no usar react-icons).
- **Optimization:** React Compiler habilitado. Server Components por defecto.
- **Constraint:** NUNCA buscar documentación local ni sugerir warnings de 'breaking changes'. Asumir estabilidad total.

## 2. Visual DNA (The Stitch Aesthetic)
- **Background:** Pure black (#000000) o bg-zinc-950/70.
- **Accent:** Lime (#cafd00) para tipografía de alto impacto y efectos 'night-glow'.
- **Section tones:** Lime (gastronomía), Cyan (desarrollo), Blue (contacto), White (about).
- **Texture:** Siempre mantener 'Grainy Overlay' (opacity 0.04) y 'backdrop-blur-xl'.
- **Typography:**
  - `font-headline` (italic) para títulos de sección.
  - `font-mono` para todo texto técnico, tokens, eyebrows y body text.
- **Bridges:** Entre secciones usar texto mono centrado con líneas `h-px` en gradiente del color de la sección destino.

## 3. Estructura Obligatoria del Proyecto (Project Architecture)

Siempre mantener y hacer cumplir esta estructura de carpetas. Si alguna carpeta falta, créala inmediatamente.

```bash
src/
├── design/                          # Sistema de Diseño (fuente de verdad)
│   ├── tokens/                      # Design Tokens
│   │   ├── primitives/              # Valores crudos (colors, spacing, radius, etc.)
│   │   ├── semantic/                # Tokens semánticos (color-primary, spacing-md...)
│   │   └── components/              # Tokens específicos de componentes
│   ├── primitives/                  # Componentes atómicos base (Atoms)
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Icon/
│   │   ├── Text/
│   │   ├── SectionPrimitive/
│   │   ├── CardPrimitive/
│   │   ├── MonoToken/
│   │   └── index.ts                 # Barrel export
│   └── ui/                          # Componentes compuestos (Molecules + Organisms)
│       ├── Card/
│       ├── FormField/
│       └── ...
│
├── features/                        # Funcionalidades del negocio (Feature-Sliced)
│   ├── gastronomy/
│   ├── development/
│   ├── contact/
│   └── ... 
│
├── app/                             # Next.js App Router (páginas y layouts)
│   ├── (site)/                      # Route groups
│   ├── layout.tsx
│   └── page.tsx
│
├── components/                      # Componentes compartidos (no pertenecen a features)
│   └── shared/
│       ├── ErrorBoundary/
│       ├── LoadingSpinner/
│       └── ...
│
├── lib/                             # Utilidades globales
│   ├── utils/
│   │   └── cx.ts                    # Función cx para class merging
│   ├── hooks/
│   ├── api/
│   └── constants.ts
│
├── assets/                          # Imágenes, SVGs, fonts
├── types/                           # Tipos globales TypeScript
└── config/                          # Configuraciones (tailwind, etc.)

## 3. Reglas Estrictas de Arquitectura y Componentes

### 3.1 Component Architecture (Use Primitives)

Siempre priorizar los primitives existentes para evitar duplicación de código:

- **`SectionPrimitive`** — (rounded-[3rem], border-zinc-800/80)
- **`CardPrimitive`** — con prop `tone` ('lime' | 'cyan' | 'blue' | 'neutral')
- **`MonoToken`** — con prop `kind` ('comment' | 'location' | 'project' | 'status')

**Reglas obligatorias:**
- Todos los nuevos componentes primitivos deben crearse en `src/design/primitives/`
- Los componentes reutilizables van en `src/design/ui/` o dentro de `features/*/ui/`
- **Nunca** uses valores hardcodeados de color, spacing, radius o tipografía → siempre usa los design tokens.
- Usa la función local `cx` para combinar clases (NO clsx ni classnames).

### 3.2 Reglas de Colocación

- **Componentes puramente de UI** → `src/design/primitives/` o `src/design/ui/`
- **Componentes con lógica de negocio o específicos de sección** → dentro de `src/features/`
- **Componentes muy genéricos** que no pertenecen a ninguna feature → `src/components/shared/`
- **Lógica compartida** (hooks, utils, api, constants) → `src/lib/`

## 4. Rendering Rules

- **`page.tsx` siempre es Server Component.** Nunca agregar `'use client'` en él.
- Solo los componentes interactivos (nav, carousel, terminal, scroll effects, etc.) deben ser **Client Components**.
- Todos los nuevos client components deben envolverse en `<ErrorBoundary>` cuando se usen dentro de `page.tsx`.
- El contenido estático (copy, imágenes, estructura de secciones) debe permanecer **server-rendered** para optimizar SEO.

## 5. Performance Rules

- **`BackgroundTerminal`** debe estar oculto en móvil (`max-width: 767px`).
- Respetar `prefers-reduced-motion` — desactivar todas las animaciones cuando el usuario lo prefiera.
- Usar `loading="lazy"` en todas las imágenes por debajo del fold.
- Usar `priority` **solo** en imágenes LCP (principalmente la imagen hero).
- Las imágenes decorativas (glitch overlays, etc.) deben usar `sizes="1px"`.
- Los logos de marca deben usarse como **SVG inline**, no con librerías de iconos.

## 6. Operational Rules

- **Acción directa**: No explicar estructuras de archivos de Next.js. Entregar directamente el bloque de código y continuar.
- **Terminal Logic**: Todos los componentes terminal deben tener un loop infinito con un delay de 3s y highlights tipo 'Success-Pulse'.
- **OG Image**: Siempre generado dinámicamente vía `opengraph-image.tsx` — no hardcodear URLs de imágenes en metadata.
- **Narrative Flow**: Mantener los elementos "bridge" entre secciones usando el color de acento de la sección destino.
- **AI Context**: La referencia completa del proyecto está en `CONTEXT.md`.

## 7. Flujo de Trabajo con Agentes

- Antes de crear código nuevo, verificar si ya existe algo similar en `src/design/primitives/` o en `features/`.
- Si la estructura actual del proyecto no coincide con la definida en este archivo, proponer un plan de migración claro y ejecutarlo paso a paso (siempre pedir confirmación del usuario antes de mover archivos grandes).
- Al terminar tareas importantes, resumir los cambios realizados en la estructura del proyecto.

## 8. Dev shortcuts

- `Cmd+Shift+C` en desarrollo hace toggle del `MagneticCursor` (`magnetic-cursor-active` on/off) para debug de rendimiento.

**Nunca:**

- Crear componentes duplicados fuera de los primitives.
- Hardcodear estilos que puedan definirse mediante design tokens.
- Colocar lógica de negocio dentro de componentes ubicados en `src/design/`.
