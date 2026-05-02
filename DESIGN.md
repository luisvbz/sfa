---
name: Colegio SFA Design System
colors:
  surface: '#f7f9f4'
  surface-dim: '#d8dbcf'
  surface-bright: '#f8fbee'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f5e8'
  surface-container: '#ecefe3'
  surface-container-high: '#e7e9dd'
  surface-container-highest: '#e1e4d7'
  on-surface: '#191d15'
  on-surface-variant: '#42493a'
  inverse-surface: '#2e3229'
  inverse-on-surface: '#eff2e5'
  outline: '#727a69'
  outline-variant: '#c2c9b6'
  surface-tint: '#376b05'
  primary: '#244c00'
  on-primary: '#ffffff'
  primary-container: '#336600'
  on-primary-container: '#a6e375'
  inverse-primary: '#9cd76b'
  secondary: '#7f5616'
  on-secondary: '#ffffff'
  secondary-container: '#fcc57b'
  on-secondary-container: '#775010'
  tertiary: '#751e5f'
  on-tertiary: '#ffffff'
  tertiary-container: '#923778'
  on-tertiary-container: '#ffbfe5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b7f484'
  primary-fixed-dim: '#9cd76b'
  on-primary-fixed: '#0c2000'
  on-primary-fixed-variant: '#275000'
  secondary-fixed: '#ffddb4'
  secondary-fixed-dim: '#f3bd74'
  on-secondary-fixed: '#291800'
  on-secondary-fixed-variant: '#633f00'
  tertiary-fixed: '#ffd8ed'
  tertiary-fixed-dim: '#ffade0'
  on-tertiary-fixed: '#3b002e'
  on-tertiary-fixed-variant: '#7a2263'
  background: '#f8fbee'
  on-background: '#191d15'
  surface-variant: '#e1e4d7'
  primary-mid: '#4d8f00'
  primary-dark: '#254d00'
  primary-light: '#e8f0d9'
  secondary-mid: '#c49050'
  secondary-dark: '#7a5720'
  secondary-light: '#f5eadb'
  border: rgba(51, 102, 0, 0.12)
  text-main: '#1a1a1a'
  text-muted: '#6b6b6b'
typography:
  display:
    fontFamily: DM Serif Display
    fontSize: 36px
    fontWeight: '400'
    lineHeight: '1.15'
  h1:
    fontFamily: DM Serif Display
    fontSize: 28px
    fontWeight: '400'
    lineHeight: '1.2'
  h2:
    fontFamily: DM Sans
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.3'
  h3:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: '1.4'
  body:
    fontFamily: DM Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.65'
  small:
    fontFamily: DM Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
  caption:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '400'
    letterSpacing: 0.02em
  label:
    fontFamily: DM Sans
    fontSize: 11px
    fontWeight: '600'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
---

# Design System

> Paleta verde & dorada · DM Sans · Bordes redondeados · Fondo blanco

---

## Fuente

```
Display:  DM Serif Display — títulos y hero text
Cuerpo:   DM Sans — interfaz, párrafos, etiquetas
```

**Import (Google Fonts)**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap"
  rel="stylesheet"
/>
```

---

## Colores

### Primario — Verde

| Token                  | Valor     | Uso                              |
|------------------------|-----------|----------------------------------|
| `--c-primary`          | `#336600` | Botones, íconos activos, énfasis |
| `--c-primary-mid`      | `#4d8f00` | Hover de botón primario          |
| `--c-primary-dark`     | `#254d00` | Texto sobre fondos claros        |
| `--c-primary-light`    | `#e8f0d9` | Fondos de badges, alertas, cards |

### Secundario — Dorado

| Token                  | Valor     | Uso                                |
|------------------------|-----------|------------------------------------|
| `--c-secondary`        | `#a77937` | Botones secundarios, acentos       |
| `--c-secondary-mid`    | `#c49050` | Hover de botón secundario          |
| `--c-secondary-dark`   | `#7a5720` | Texto sobre fondos claros dorados  |
| `--c-secondary-light`  | `#f5eadb` | Fondos suaves, alertas secundarias |

### Neutros

| Token          | Valor     | Uso                      |
|----------------|-----------|--------------------------|
| `--c-bg`       | `#ffffff` | Fondo general            |
| `--c-surface`  | `#f7f9f4` | Superficies, cards       |
| `--c-border`   | `rgba(51,102,0,0.12)` | Bordes suaves |
| `--c-text`     | `#1a1a1a` | Texto principal          |
| `--c-text-muted` | `#6b6b6b` | Texto secundario        |

---

## Variables CSS

```css
:root {
  /* Primario */
  --c-primary:         #336600;
  --c-primary-mid:     #4d8f00;
  --c-primary-dark:    #254d00;
  --c-primary-light:   #e8f0d9;

  /* Secundario */
  --c-secondary:       #a77937;
  --c-secondary-mid:   #c49050;
  --c-secondary-dark:  #7a5720;
  --c-secondary-light: #f5eadb;

  /* Neutros */
  --c-bg:              #ffffff;
  --c-surface:         #f7f9f4;
  --c-border:          rgba(51, 102, 0, 0.12);
  --c-text:            #1a1a1a;
  --c-text-muted:      #6b6b6b;

  /* Tipografía */
  --font-display:      'DM Serif Display', serif;
  --font-sans:         'DM Sans', sans-serif;

  /* Radios */
  --radius-sm:         8px;
  --radius-md:         12px;
  --radius-lg:         20px;
  --radius-xl:         28px;
  --radius-full:       9999px;
}
```

---

## Tipografía

| Estilo    | Fuente              | Tamaño | Peso | Uso                         |
|-----------|---------------------|--------|------|-----------------------------|
| Display   | DM Serif Display    | 36px   | 400  | Hero, portadas, títulos     |
| H1        | DM Serif Display    | 28px   | 400  | Encabezados de sección      |
| H2        | DM Sans             | 20px   | 500  | Sub-encabezados             |
| H3        | DM Sans             | 16px   | 500  | Títulos de componente       |
| Body      | DM Sans             | 15px   | 400  | Texto de párrafo            |
| Small     | DM Sans             | 13px   | 400  | Descripciones, hints        |
| Caption   | DM Sans             | 11-12px| 400  | Etiquetas, metadatos        |
| Label     | DM Sans             | 11px   | 600  | Labels en mayúscula, badge  |

```css
.text-display {
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 400;
  color: var(--c-primary-dark);
  line-height: 1.15;
}

.text-h1 {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 400;
  color: var(--c-primary-dark);
}

.text-h2 {
  font-family: var(--font-sans);
  font-size: 20px;
  font-weight: 500;
}

.text-body {
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.65;
  color: var(--c-text-muted);
}

.text-caption {
  font-family: var(--font-sans);
  font-size: 12px;
  letter-spacing: 0.02em;
  color: var(--c-text-muted);
}

.text-label {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--c-text-muted);
}
```

---

## Bordes y radio

Todos los elementos usan bordes redondeados. Escoge el radio según el tamaño del componente:

| Token           | Valor   | Uso típico                             |
|-----------------|---------|----------------------------------------|
| `--radius-sm`   | 8px     | Inputs, badges pequeños                |
| `--radius-md`   | 12px    | Inputs estándar, tooltips              |
| `--radius-lg`   | 20px    | Cards medianas, alertas                |
| `--radius-xl`   | 28px    | Cards grandes, paneles                 |
| `--radius-full` | 9999px  | Botones, pills, chips, avatares        |

---

## Botones

```css
/* Base */
.btn {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: var(--radius-full);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: opacity 0.15s, transform 0.12s;
}
.btn:active { transform: scale(0.97); }

/* Primario */
.btn-primary {
  background: var(--c-primary);
  color: #ffffff;
}
.btn-primary:hover { background: var(--c-primary-mid); }

/* Secundario */
.btn-secondary {
  background: var(--c-secondary);
  color: #ffffff;
}
.btn-secondary:hover { background: var(--c-secondary-mid); }

/* Outline */
.btn-outline {
  background: transparent;
  color: var(--c-primary);
  border: 1.5px solid var(--c-primary);
}
.btn-outline:hover { background: var(--c-primary-light); }

/* Ghost */
.btn-ghost {
  background: transparent;
  color: var(--c-text-muted);
  border: 1px solid var(--c-border);
}
.btn-ghost:hover { background: var(--c-surface); }

/* Tamaños */
.btn-sm  { font-size: 12px; padding: 6px 14px; }
.btn-lg  { font-size: 16px; padding: 13px 28px; }
```

| Variante     | Fondo      | Texto   | Uso                         |
|--------------|------------|---------|---------------------------  |
| `btn-primary`   | `#336600`  | blanco  | Acción principal            |
| `btn-secondary` | `#a77937`  | blanco  | Acción secundaria           |
| `btn-outline`   | transparente | verde | Acción alternativa          |
| `btn-ghost`     | transparente | gris  | Acciones neutras / cancelar |

---

## Badges / Etiquetas

```css
.badge {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  display: inline-block;
}

.badge-primary        { background: var(--c-primary);        color: #ffffff; }
.badge-primary-soft   { background: var(--c-primary-light);  color: var(--c-primary-dark); }
.badge-secondary      { background: var(--c-secondary);      color: #ffffff; }
.badge-secondary-soft { background: var(--c-secondary-light);color: var(--c-secondary-dark); }
.badge-neutral        { background: var(--c-surface); color: var(--c-text-muted);
                        border: 0.5px solid var(--c-border); }
```

---

## Inputs / Formularios

```css
.input-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-muted);
  margin-bottom: 5px;
  display: block;
}

.input-field {
  font-family: var(--font-sans);
  font-size: 14px;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--c-border);
  background: var(--c-bg);
  color: var(--c-text);
  outline: none;
  width: 100%;
  transition: border-color 0.15s;
}

.input-field:focus {
  border-color: var(--c-primary);
  box-shadow: 0 0 0 3px rgba(51, 102, 0, 0.1);
}
```

---

## Cards

```css
.card {
  background: var(--c-bg);
  border-radius: var(--radius-xl);
  border: 1px solid var(--c-border);
  padding: 1.25rem;
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.card-icon-primary   { background: var(--c-primary-light); }
.card-icon-secondary { background: var(--c-secondary-light); }

.card-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--c-text);
  margin-bottom: 4px;
}

.card-desc {
  font-size: 12px;
  color: var(--c-text-muted);
  line-height: 1.5;
}
```

---

## Alertas

```css
.alert {
  display: flex;
  gap: 12px;
  padding: 14px 16px;
  border-radius: var(--radius-lg);
  align-items: flex-start;
}

.alert-primary {
  background: var(--c-primary-light);
  border-left: 3px solid var(--c-primary);
  color: var(--c-primary-dark);
}

.alert-secondary {
  background: var(--c-secondary-light);
  border-left: 3px solid var(--c-secondary);
  color: var(--c-secondary-dark);
}
```

---

## Chips de usuario

```css
.chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 14px 6px 6px;
  border-radius: var(--radius-full);
  border: 1px solid var(--c-border);
  background: var(--c-bg);
  font-family: var(--font-sans);
  font-size: 13px;
}

.chip-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: #ffffff;
}

.chip-avatar-primary   { background: var(--c-primary); }
.chip-avatar-secondary { background: var(--c-secondary); }
```

---

## Barras de progreso

```css
.progress-track {
  height: 6px;
  background: var(--c-primary-light);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: var(--radius-full);
}

.progress-bar-primary   { background: var(--c-primary); }
.progress-bar-secondary { background: var(--c-secondary); }
```

---

## Espaciado

| Escala | Valor  | Uso                         |
|--------|--------|-----------------------------|
| `xs`   | 4px    | Gap entre íconos y texto    |
| `sm`   | 8px    | Padding interno pequeño     |
| `md`   | 12px   | Gap entre elementos         |
| `lg`   | 16px   | Padding de componente       |
| `xl`   | 24px   | Separación entre secciones  |
| `2xl`  | 32px   | Márgenes de layout          |
| `3xl`  | 48px   | Espaciado de página         |

---

## Resumen de decisiones de diseño

- **Fondo base:** blanco `#ffffff` — limpio, sin distracciones
- **Primario verde** `#336600` — autoridad, naturaleza, confianza
- **Secundario dorado** `#a77937` — calidez, premium, contraste
- **Bordes redondeados en todo** — `border-radius` desde 8px (inputs) hasta 9999px (pills)
- **DM Serif Display** para títulos — elegante, con personalidad
- **DM Sans** para UI — moderna, legible, neutral
- **Variantes suaves** (light) derivadas de cada color — para fondos y estados de hover
