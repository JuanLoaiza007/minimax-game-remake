## Why

The original Yoshi's World game exists only as a Python/PyQt5 desktop application. A web remake makes it accessible on any device without installation. Ronda 1 establishes the foundational layer: a pure game model, a responsive board UI, piece selection with movement validation, and PWA readiness. Subsequent rounds will add the game loop, AI, and customization.

## What Changes

- Create `lib/game/` with pure TypeScript model: `Board`, `Position`, `Move`, `CellState`, move generation
- Create React components: `BoardGrid`, `BoardCell` with responsive CSS Grid layout
- Implement piece selection with visual highlight and valid-move indicators
- Add PWA manifest, icons, and meta tags
- Show version `0.1.0` in the UI
- Replace default Next.js page with the game board

## Capabilities

### New Capabilities
- `game-model`: Core game types (`CellState`, `Position`, `Move`, `Player`), `Board` class with deep clone and cell manipulation, and knight-move generation/validation. Pure TypeScript, no DOM dependencies.
- `board-ui`: Responsive CSS Grid rendering of the board, colored placeholder pieces, piece selection with highlight states, and valid-move indicators.
- `pwa`: PWA manifest with name, description, icons, theme color, and `manifest` + `theme-color` meta tags in the Next.js layout.

### Modified Capabilities
None — first round, no existing specs.

## Impact

- **New files**: `lib/game/types.ts`, `lib/game/board.ts`, `lib/game/moves.ts`, reusable React components, `public/` icons, `manifest.json`
- **Modified files**: `app/page.tsx` (replaced with game board), `app/layout.tsx` (meta tags), `package.json` (no new deps expected)
- **No external dependencies added** — pure TS model, Tailwind for styling