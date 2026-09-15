## Context

The project is a fresh Next.js 16 scaffold with a single "Hola mundo" page. Ronda 1 introduces the game model, UI components, and PWA setup. The Python original at `../Proyecto-2-IA-2024-I/` serves as reference for move logic and encoding patterns.

See proposal.md for motivation and specs/ for behavior requirements.

## Goals / Non-Goals

**Goals:**
- Pure TS game model in `lib/game/` with zero framework dependencies
- Board renders as responsive CSS Grid with colored placeholder pieces
- Click-to-select with visual valid-move indicators
- Move execution leaves trails on the origin cell
- PWA detection pass
- Version `0.1.0` visible in UI

**Non-Goals:**
- Game loop or turn alternation (Ronda 2)
- AI or minimax (Ronda 2)
- Menu navigation (Ronda 2)
- Scoring or game-over detection (Ronda 2)
- Sprites or animations (Ronda 4)

## Decisions

### CellState as string union (not enum)

Alternatives considered: numeric enum, const object, string enum.

Chosen: `type CellState = "0" | "p1" | "p2" | "t1" | "t2"`. Rationale: reading `board.getCell(pos) === "p1"` is self-documenting; the value *is* the meaning. Extending to 4 players only means adding `"p3"` `"p4"` `"t3"` `"t4"`. String comparison cost is negligible for a 7×5 board.

### File structure (flat over nested)

```
lib/game/
├── types.ts      # Position, Player, Move, CellState, BoardState
├── board.ts      # Board class (constructor, get/set/clone)
└── moves.ts      # generateHorseMoves, isValidMove, isFreePosition
```

Alternatives considered: single `game.ts` file (too crowded), deep by-feature nesting (over-engineering for this scope). Flat with 3 files gives clear separation without ceremony.

### Component tree

```
app/page.tsx
  └── GameBoard              ← client component, owns game state
       ├── VersionBadge      ← static version display
       └── BoardGrid         ← responsive CSS Grid
            └── BoardCell[]  ← individual cells, receives piece/trail/empty
```

Each `BoardCell` receives its `CellState`, `isSelected`, `isValidMove`, and an `onClick` handler. No global state library — a `useGameBoard` hook encapsulates `selectedPos`, `validMoves`, and click handlers. This keeps state local to the page and easily replaceable when Ronda 2 introduces a proper GameEngine.

Ronda 2 will lift state into a GameEngine and add navigation; the component structure is designed for that migration.

### Selection state machine

```
                    ┌──────────────┐
                    │   No piece   │
                    │   selected   │
                    └──────┬───────┘
                           │ click own piece
                    ┌──────▼───────┐
                    │   Piece      │
                    │   selected   │
                    └──────┬───────┘
               ┌───────────┼───────────┐
               │           │           │
        click dest     click own   click empty
        (valid)      (switch)     (deselect)
```

Implement with `useState<Position | null>(null)` for selection and derived `validMoves` (recomputed on selection change via `useMemo`).

### Fixed board positions

Player 1 starts at `(0,0)`, Player 2 at `(6,4)`. These are passed as constructor parameters to `Board.setupPlayers(p1Pos, p2Pos)`, keeping the option for future randomization without changing the Board API.

### Placeholder icons

Colored CSS circles inside cells (Tailwind `rounded-full` + `bg-*`). No image assets needed for Ronda 1. PWA icons are simple colored SVGs generated or placed as minimal PNGs.

PWA icons are separate from game pieces. For Lighthouse, any distinguishable icon files suffice.

### Version

Hardcoded `APP_VERSION = "0.1.0"` in a `lib/constants.ts` file. Imported and rendered in a footer or badge component.

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Next.js 16 has breaking APIs that differ from training data | Read `node_modules/next/dist/docs/` before writing code |
| Ronda 1 uses fixed positions; game engine later may need different init flow | Board constructor accepts any placement; GameEngine injects positions |
| Without a game loop, click behavior in Ronda 1 is "free move" — any player can move any piece | Spec explicitly scopes this as a sandbox; Ronda 2 enforces turn ownership |
| PWA icons may look poor if auto-generated | Acceptable for placeholder; final icons in Ronda 4