# Design System Document: Institutional Intelligence

## 1. Overview & Creative North Star
This design system is built to transform enterprise management from a utilitarian task into a curated editorial experience. Moving away from the "standard dashboard" fatigue, our system adopts a **Creative North Star: The Digital Architect.** 

The goal is to communicate authority through silence. We achieve a premium feel by prioritizing structural breathing room, intentional asymmetry, and a rigorous tonal hierarchy. By replacing traditional borders with sophisticated surface stacking, the interface feels less like a software tool and more like a high-end physical workspace. The experience is professional, minimal, and driven by iconography that acts as a focal point rather than just an ornament.

---

## 2. Colors & Tonal Architecture
Our palette is rooted in deep architectural blues and neutral grays, designed to reduce cognitive load while maintaining a commanding presence.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders to define sections. Layout boundaries must be established exclusively through:
*   **Background Shifts:** Using `surface-container-low` (#f2f4f7) to house elements against a `background` (#f7f9fc).
*   **Tonal Transitions:** Defining functional areas by nesting `surface-container` tiers.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Hierarchy is not built by adding lines, but by "lifting" surfaces:
*   **Base:** `surface` (#f7f9fc)
*   **Structural Sections:** `surface-container-low` (#f2f4f7)
*   **Primary Interaction Cards:** `surface-container-lowest` (#ffffff)
*   **Overlays/Popovers:** `surface-bright` (#f7f9fc)

### The Glass & Texture Principle
To elevate the system above "generic" enterprise tools, use **Glassmorphism** for floating elements (e.g., sticky headers or navigation rails). Use semi-transparent surface tokens with a `backdrop-blur` of 12px to 20px. 

While the core components remain flat as requested, main CTAs can utilize a **Micro-Depth Tone**: transitioning from `primary` (#002c56) to `primary_container` (#094279) across a subtle diagonal to provide a "soul" to the button without creating a distracting glow.

---

## 3. Typography: Editorial Authority
We use **Inter** as a Geometric Sans to bridge the gap between technical precision and human readability.

*   **Display (lg/md):** Reserved for high-level data summaries or welcome states. These should use a tighter letter-spacing (-0.02em) to mimic high-end editorial magazines.
*   **Headlines (lg/md/sm):** Use `on_surface` (#191c1e). These are the anchors of your layout. Use them to create asymmetrical "Editorial Headers" where the headline is offset from the main content grid.
*   **Body (lg/md):** Primary text uses `#1A2A3A`. This high-contrast blue-black ensures accessibility and an authoritative tone.
*   **Label (md/sm):** Secondary information uses `#6B7D93`. Use these for metadata and non-critical descriptions.

**Tone of Voice:** All system microcopy must be in **pt-BR**, maintaining a tone that is professional, direct, and helpful (e.g., "Visão Geral" instead of "Overview").

---

## 4. Elevation & Depth
Depth is a functional tool, not a stylistic choice. We convey hierarchy through **Tonal Layering** and **Ambient Light**.

*   **The Layering Principle:** Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f2f4f7) section. This "natural lift" is the primary way to define a container.
*   **Ambient Shadows:** For elements that truly float (Modals, Hovered Cards), use the "Signature Elevation": `0px 2px 12px rgba(9, 66, 121, 0.07)`. The shadow color is a tinted version of our primary blue, making it feel like part of the environment rather than a gray smudge.
*   **The "Ghost Border" Fallback:** If a border is required for extreme accessibility needs, use `outline_variant` (#c2c6d1) at **15% opacity**. Never use 100% opaque borders.
*   **Soft Roundedness:** Follow a strict scale for organic feel:
    *   **Cards:** `lg` (1rem)
    *   **Buttons/Inputs:** `DEFAULT` (0.5rem)
    *   **Avatars/Pills:** `full` (9999px)

---

## 5. Components

### Buttons & Chips
*   **Primary Button:** Background `primary`, text `on_primary`. High-contrast, no border.
*   **Secondary Button:** Background `secondary_container`, text `on_secondary_container`.
*   **Chips:** Use for status ("Ativo", "Pendente"). Use `secondary_fixed` backgrounds with `on_secondary_fixed` text for a soft, professional tag.

### Input Fields (Entradas de Texto)
*   **Default State:** Background `surface_container_lowest`, ghost-border at 15% opacity.
*   **Focus State:** Border becomes `primary` at 50% opacity with a subtle 2px outer ring of `primary_fixed`.
*   **Validation:** Use `error` (#ba1a1a) for helper text, never for the entire background.

### Cards & Lists (Cartões e Listas)
*   **Forbid Dividers:** Do not use lines to separate list items. Use 16px (`spacing-4`) or 24px (`spacing-6`) of vertical whitespace.
*   **Data Visualization:** Intersperse icons as primary drivers. Icons should be sized at 24px and use `primary_container` tones to draw the eye.

### Navigation Rail (Barra de Navegação)
*   Instead of a top bar, prefer a sleek left-hand rail using `surface_container_low`. This creates a modern, application-centric layout that maximizes vertical space for enterprise data.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins to create "Editorial" breathing room (e.g., a wider left margin for titles).
*   **Do** use `on_surface_variant` (#424750) for icons to keep them present but not overwhelming.
*   **Do** lean on the Typography Scale to create hierarchy before reaching for color or bolding.
*   **Do** use `pt-BR` terminology that is industry-standard (e.g., "Configurações" instead of "Settings").

### Don't
*   **Don't** use 1px dividers to separate content. Use the Spacing Scale.
*   **Don't** use pure black (#000000) for text. Use our `on_surface` or Primary Text tokens.
*   **Don't** use "Glow" or "Neon" effects. All "light" must feel ambient and physical.
*   **Don't** crowd components. If in doubt, increase the spacing by one level on the scale (e.g., move from `16` to `20`).