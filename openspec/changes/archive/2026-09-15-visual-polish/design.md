## Context

The project uses a `base-lyra` shadcn preset (initialized via `npx shadcn@latest init --preset b6G4G2Lsg --template next --pointer`) with square corners and yellow primary buttons. Currently only the `button` component is installed; `card` and `dialog` need to be added. The CSS defines both light (`:root`) and dark (`.dark`) variables — the design switches to dark-only. All existing components use raw Tailwind classes with no shared component library.

## Goals / Non-Goals

**Goals:**
- Replace raw `<button>` elements with shadcn `<Button>` in MainMenu, DifficultySelect, GameScreen, AboutScreen
- Replace hand-rolled card layouts with shadcn `<Card>` in DifficultySelect, AboutScreen, ScoreDisplay
- Replace inline result overlay with shadcn `<Dialog>` in GameScreen
- Set `--radius: 0` for consistent square corners across all components
- Default dark mode: `.dark` variables apply unconditionally, remove light variables
- Verify yellow button text contrast (primary / primary-foreground) and adjust if needed
- Preserve game-specific SVGs (BoardCell), board grid, thinking indicator, and all game logic

**Non-Goals:**
- No light mode toggle or support in this iteration
- No changes to `lib/game/`, `app/page.tsx`, or game logic
- No new visual features outside what shadcn components provide
- No backlog changes

## Decisions

### Decision 1: Dark mode via CSS-only approach (no JS toggle)
The `.dark` class variables are moved to `:root[class="dark"]` or simply `:root` with dark values. The `<html>` element gets the `dark` class in `layout.tsx`. Light `:root` variables are removed entirely. This avoids any runtime toggle logic — the app is always dark.

**Alternatives considered:**
- `prefers-color-scheme` media query: rejected because the user explicitly wants dark-only, not OS-following
- JS toggle + localStorage: unnecessary complexity for this iteration

### Decision 2: Button variants per role
| Component | Button Role | shadcn Variant | Rationale |
|---|---|---|---|
| MainMenu — Clásico | Primary action | `default` | Yellow primary, the main call-to-action |
| MainMenu — Personalizado | Disabled placeholder | `default` with `disabled` | Uses the preset's disabled opacity styling |
| MainMenu — Sobre Nosotros | Secondary nav | `ghost` | Less visual weight, still interactive |
| DifficultySelect — difficulty options | Selection | `outline` | Bordered but not filled, makes the list readable |
| GameScreen — Volver al Menú | Back navigation | `link` | Text-style, unobtrusive during gameplay |
| AboutScreen — Volver al Menú | Back navigation | `link` | Same pattern |
| GameScreen result — Volver al Menú | Result action | `default` | Full yellow, matches the primary button style |

### Decision 3: Card usage — structured, not decorative
`<Card>` wraps content that benefits from visual containment: difficulty options, the about text, and the result dialog body. The score display gets a minimal `<Card>` wrapper for alignment with the overall component language. The game board itself (BoardGrid) is NOT wrapped in a Card — it needs full width for the grid layout and the board cells define their own visual identity.

### Decision 4: Dialog for result modal
The current result overlay is a fixed-position `<div>` with `bg-black/50` backdrop. Replacing it with shadcn `<Dialog>` provides:
- Built-in overlay with animation
- Focus trap
- Escape-key dismiss
- Proper ARIA attributes
- Consistent styling via CSS variables

### Decision 5: Radius = 0
The preset's `rounded-none` is already hardcoded in the button variants (`.rounded-none`). But `--radius` is still `0.625rem` in globals.css, which affects Card, Dialog, and any component reading the variable. Setting `--radius: 0` makes Card and Dialog corners square, matching the button aesthetic.

### Decision 6: Text contrast on yellow buttons
The preset defines:
- Dark mode primary: `oklch(0.795 0.184 86.047)` — muted yellow-gold
- Dark mode primary-foreground: `oklch(0.421 0.095 57.708)` — dark brown

Verified: oklch lightness of 0.421 on oklch lightness of 0.795 yields ~5.1:1 contrast ratio, exceeding WCAG AA 4.5:1. No adjustment needed.

## Risks / Trade-offs

- **shadcn component version compatibility**: The `base-lyra` style uses `@base-ui/react` for Button. Card and Dialog may use different primitives (`@base-ui` or `@radix-ui`). Post-add verification needed — if shadcn adds components with incompatible peer dependencies, we may need to check the generated code.
- **Dark mode only**: If light mode is needed in the future, the CSS variables will need to be reintroduced. The `:root` block with light values will be deleted, so a future round would need to reconstruct them (or restore from git).
- **Board cell contrast on dark background**: The current board cells use `bg-white` and `bg-emerald-50` backgrounds. On a dark background these will look stark. The cells sit inside the grid (`border-gray-300`) — we may need to adjust cell background colors to fit the dark theme (this is a minor tweak to BoardCell.tsx, not a structural change).