## 1. Project Setup

- [x] 1.1 Create `lib/constants.ts` with `APP_VERSION = "0.1.0"` and verify it can be imported without errors
- [x] 1.2 Install Vitest as dev dependency and verify `vitest run` works with a passing dummy test
- [x] 1.3 Create `lib/game/` directory structure and verify empty `types.ts`, `board.ts`, `moves.ts` compile

## 2. Game Model (lib/game/)

- [x] 2.1 Define types `Position`, `Player`, `Move`, `CellState`, `BoardState` in `lib/game/types.ts` and verify TypeScript compiles
- [x] 2.2 Implement `Board` class with constructor (rows, cols), `getCell`, `setCell`, `clone`, `setupPlayers` in `lib/game/board.ts` and verify unit tests pass for creation, get/set, and deep clone independence
- [x] 2.3 Implement `generateHorseMoves`, `isValidMove`, `isFreePosition` in `lib/game/moves.ts` and verify unit tests pass for center moves, corner moves, and blocked destinations
- [x] 2.4 Test that all `lib/game/` modules import and run in a Node.js environment without DOM errors

## 3. Board UI Components

- [x] 3.1 Create `BoardCell` component that renders a colored circle for `"p1"`/`"p2"`, a dim trail marker for `"t1"`/`"t2"`, and empty space for `"0"`, with selection and valid-move highlight props; verify it renders all 5 states correctly
- [x] 3.2 Create `BoardGrid` component as a CSS Grid container with responsive sizing: full-width on mobile, capped on desktop, square cells, no horizontal scroll; verify at 375px and 1024px viewports
- [x] 3.3 Create `VersionBadge` component displaying `0.1.0`; verify it renders in a corner or footer position

## 4. Selection and Movement

- [x] 4.1 Create `useGameBoard` hook managing `selectedPos: Position | null`, computed `validMoves: Position[]`, and `board: Board` state; verify initial state has no selection and empty valid moves
- [x] 4.2 Implement click handlers in the hook: select own piece, switch selection, deselect on empty cell, move piece to valid destination (origin → trail, destination → player position); verify each flow through unit tests
- [x] 4.3 Add visual feedback: selected cell gets a highlight style, valid destination cells get a different highlight style, invalid clicks are silently ignored; verify via rendered DOM states
- [x] 4.4 Wire `useGameBoard` into `GameBoard` and verify that clicking cells produces correct visual and model changes

## 5. PWA Configuration

- [x] 5.1 Create `public/manifest.json` with name, short_name, description, start_url, display (standalone), theme_color, background_color, and two icon entries (192px, 512px); verify valid JSON at `/manifest.json`
- [x] 5.2 Add `<link rel=\"manifest\">` and `<meta name=\"theme-color\">` to `app/layout.tsx`; verify tags appear in rendered HTML
- [x] 5.3 Generate placeholder icon files `public/icon-192.png` and `public/icon-512.png` (colored squares, no design needed); verify files exist at expected paths

## 6. Integration and Verification

- [x] 6.1 Replace `app/page.tsx` content with `GameBoard` component and verify the board renders with both players at fixed positions (player1 at (0,0), player2 at (6,4))
- [x] 6.2 Run `npm run build` and verify zero compilation or lint errors
- [x] 6.3 Verify version `0.1.0` is visible in the rendered UI