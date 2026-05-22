---
name: Precision Finance
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#464555'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#005338'
  on-tertiary: '#ffffff'
  tertiary-container: '#006e4b'
  on-tertiary-container: '#67f4b7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is engineered for a premium personal finance experience that balances high-utility data density with a sophisticated, trustworthy aesthetic. The brand personality is professional yet modern, designed to evoke feelings of security, clarity, and financial empowerment.

The visual direction follows a **Corporate Modern** approach enhanced by **Glassmorphism**. It utilizes a structured layout and a crisp color palette to ensure legibility, while translucent overlays and subtle background blurs add a sense of depth and "premium" craft. This aesthetic ensures the product feels like a high-end tool rather than a casual consumer app.

## Colors

The palette is anchored by a vibrant Indigo primary, symbolizing intelligence and stability. 

- **Primary (Indigo):** Used for primary actions, active states, and brand highlights.
- **Secondary (Slate):** Used for supporting text, icons, and non-critical UI elements.
- **Semantic Colors:** Emerald is strictly reserved for income, positive growth, and success states. Rose is used for expenses, negative trends, and destructive actions.
- **Surface Strategy:** In Light Mode, surfaces are pure white against a light gray background to create clear containment. In Dark Mode, surfaces use a deep navy-slate to maintain readability without harsh contrast.

## Typography

This design system relies exclusively on **Inter** to maintain a clean, systematic, and highly legible interface across all data-heavy views. 

The type scale is optimized for financial dashboards. Headlines use tighter letter-spacing and heavier weights to feel authoritative. Labels are used for metadata and table headers, often employing a slightly heavier weight to distinguish them from body text. Use `label-sm` with all-caps for utility navigation or category tags to create a clear visual hierarchy between data values and data descriptors.

## Layout & Spacing

The layout is built on a rigorous **8px grid system** to ensure mathematical harmony between elements. 

- **Desktop:** Uses a 12-column fluid grid with a maximum container width of 1280px. This prevents line lengths from becoming unreadable on ultra-wide monitors. 
- **Gutter & Margins:** A consistent 24px gutter is maintained between cards and major sections. 
- **Mobile:** Elements reflow to a single column. Horizontal page margins reduce to 16px to maximize screen real estate for data tables and charts.
- **Spacing Logic:** Use `md` (16px) for internal card padding and `lg` (24px) for spacing between distinct layout blocks.

## Elevation & Depth

Visual hierarchy is established through a combination of **Tonal Layers** and **Glassmorphism**.

1.  **Background Layer:** The base canvas (Light: #f3f4f6 / Dark: #111827).
2.  **Surface Layer:** Primary cards and content containers. These use a 1px subtle border (#e5e7eb in light / #374151 in dark) and a very soft, diffused shadow (0 4px 6px -1px rgba(0,0,0,0.1)).
3.  **Floating Layer:** Overlays, dropdowns, and sticky headers. These utilize a `backdrop-filter: blur(12px)` with a semi-transparent surface color (e.g., `rgba(255, 255, 255, 0.8)`). This allows background colors to bleed through, maintaining a sense of place.
4.  **Active State:** Critical buttons and active navigation items use the primary indigo color with a subtle outer glow to signify focus.

## Shapes

The design system adopts a **Rounded** shape language to soften the analytical nature of the application. 

The standard corner radius for all primary containers, cards, and input fields is **12px**. Small elements like chips or checkboxes may use a 4px (Soft) radius to maintain internal proportion. Buttons should follow the 12px standard to match the main UI containers, creating a unified and approachable visual rhythm.

## Components

- **Elevated Cards:** The core layout unit. Cards must have a 12px radius, a 1px border, and a subtle shadow. Internal padding is strictly 16px or 24px.
- **Sleek Buttons:** Primary buttons are Indigo with white text. They feature a slight hover transition that deepens the color. Secondary buttons use a ghost style with a 1px border.
- **Floating Labels:** Form inputs use floating labels that transition to a `label-md` style when focused. The border-color of the input changes to the primary Indigo on focus.
- **Financial Chips:** Used for categories. Income categories use a subtle Emerald tint (10% opacity) with Emerald text. Expense categories use a Rose tint.
- **Glassmorphic Header:** The top navigation bar is fixed, using a backdrop blur and a thin bottom border to separate it from the scrolling content without creating a heavy visual break.
- **Data Tables:** High-density rows with 1px dividers. Header rows use `label-md` with a Slate color to provide context without competing with the primary data.