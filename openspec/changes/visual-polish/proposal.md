## Why

The current UI is functional but visually flat: raw `<button>` elements with mixed Tailwind classes, hand-rolled card layouts, a bare-modal result screen, and no consistent component language. The project has adopted a shadcn preset (`base-lyra`) that provides a cohesive square aesthetic with yellow primary buttons and full CSS variable theming — but none of the existing components use it yet. This change applies that preset across the UI, sets dark mode as default, and establishes a consistent component foundation without changing any game behavior.

## What Changes

- **Dark mode by default** — the app renders in `.dark` always; no light mode toggle in this iteration
- **Navigation buttons** — MainMenu, DifficultySelect, and AboutScreen replace raw `<button>` with shadcn `<Button>` (default variant for primary actions, ghost/link for secondary, disabled for placeholder modes)
- **Difficulty cards** — each difficulty option uses `<Card>` with `<CardHeader>` for structured layout
- **Result modal** — the game-over overlay becomes a shadcn `<Dialog>` with proper focus management, overlay animation, and keyboard handling
- **About content** — the hand-rolled white card becomes a `<Card>` component
- **Score container** — the score area wraps in a minimal `<Card>` for visual containment
- **Back links** — "Volver al Menú" links become `<Button variant="link">` for consistency
- **Board cells** — the game-specific SVGs and grid layout remain untouched (they define the project's visual identity)
- **Thinking indicator** — stays custom (no shadcn equivalent)
- **Radius** — `--radius` CSS variable set to `0` for consistent square corners matching the preset

## Capabilities

This is a pure visual refactor. No behavioral requirements change — buttons navigate to the same screens, the board renders the same state, and the game loop is identical. `skip_specs: true`.

## Impact

- **components/**: MainMenu, DifficultySelect, GameScreen, AboutScreen, ScoreDisplay updated to import shadcn components. BoardCell, BoardGrid, ThinkingIndicator, VersionBadge unchanged.
- **app/globals.css**: `--radius: 0`, `:root` replaced with `.dark` values for default dark mode. No light mode variables needed.
- **app/layout.tsx**: add `dark` class to `<html>` element for default dark mode.
- **components/ui/**: `button` already exists. Add `card` and `dialog` via `npx shadcn@latest add card dialog`.
- **No changes** to `lib/game/`, `app/page.tsx`, `lib/constants.ts`, `openspec/specs/`, `docs/BACKLOG.md`, or any game logic.