## 1. Version and Setup

- [x] 1.1 Update `APP_VERSION` to `"0.2.0"` in `lib/constants.ts` and verify version badge shows `0.2.0`
- [x] 1.2 Create directory `lib/game/minimax/` or confirm single-file approach per design.md

## 2. Minimax Port (lib/game/minimax.ts)

- [x] 2.1 Implement `Problema` class: accepts `BoardState` + `PlayerId`, computes player/opponent positions via `searchCoords("p{id}")`, computes valid moves for both using existing `generateHorseMoves`, stores `movsPosibles` for both players; verify Node unit test passes for creation and move computation
- [x] 2.2 Implement `Nodo` class: holds `Problema`, parent `Nodo`, depth; implement `expandir(playerId)` that applies each valid move (origin → `"t{id}"`, destination → `"p{id}"`), creates child `Problema` and `Nodo`; verify Node unit test produces correct children with proper board mutations
- [x] 2.3 Implement `Heuristica` class: coefficients a=1.0, b=1.5, c=0.5, d=0.5; formula `a*ownMoves - b*oppMoves + c*ownCenter - d*oppCenter`; center control as negative Manhattan distance from board center; verify Node unit test computes expected values
- [x] 2.4 Implement `minimax(nodo, profundidad, maximizando, alpha, beta)` with alpha-beta pruning; verify Node unit test prunes branches and returns expected scores at leaf nodes
- [x] 2.5 Implement `mejorJugada(board, playerId, depth) → Move | null` that returns the best `Move` for the given player; verify Node unit test returns valid moves matching expected best move

## 3. GameEngine (lib/game/engine.ts)

- [x] 3.1 Implement `GameEngine` class: constructor receives `Board` + difficulty (`number`); exposes `currentPlayer: PlayerId`, `scores: [number, number]`, `gameOver: boolean`; verify Node unit test creates engine with correct initial state
- [x] 3.2 Implement `applyMove(move)` in engine: sets origin → `"t{id}"`, destination → `"p{id}"`, increments player score (1 per new trail cell); verify unit test score increments correctly after move
- [x] 3.3 Implement `getValidMoves(playerId)` returning `Position[]` using existing `generateHorseMoves`; implement `switchTurn()` that alternates `currentPlayer` between 1 and 2; verify unit test alternation
- [x] 3.4 Implement end-game detection in `switchTurn()`: if current player has no valid moves (via `canMoveFrom`), set `gameOver = true` and compute winner via `getWinner()` (higher score wins, tie if equal); verify unit test detects game over correctly
- [x] 3.5 Implement `getAIMove()` that calls `mejorJugada(board, currentPlayer, difficulty)` and returns the `Move`; verify unit test returns a valid move

## 4. Menu System (Components)

- [x] 4.1 Create `MainMenu` component: title, version (`0.2.0`), "Clásico" button, "Próximamente" placeholder(s), "Sobre Nosotros" button; verify renders at 375px without horizontal scroll
- [x] 4.2 Create `DifficultySelect` component: 3 difficulty options (Principiante/2, Amateur/4, Experto/6) with name + description, "Volver al Menú" button; verify all options visible and tappable
- [x] 4.3 Create `AboutScreen` component: project info, credits, "Volver al Menú" button; verify renders correctly
- [x] 4.4 Create `ResultScreen` component: winner label or tie, final scores for both players, "Volver al Menú" button; verify renders with mock data for win and tie scenarios

## 5. Game Screen and Hook

- [x] 5.1 Create `useGameEngine` hook: wraps `GameEngine` in `useRef`; React state for `grid`, `scores`, `currentPlayer`, `validMoves`, `isThinking`, `gameOver`, `winner`; implement `handleCellClick(row, col)` that validates move, calls `engine.applyMove()`, updates React state, calls `engine.switchTurn()`, and if AI's turn, sets `isThinking = true`
- [x] 5.2 Implement AI turn in hook: `setTimeout(() => { engine.getAIMove() → engine.applyMove() → switchTurn → updateReactState → isThinking = false }, 50)`; verify "Pensando..." appears before AI computation and disappears after
- [x] 5.3 Create `ScoreDisplay` component: shows both players' scores with player labels; verify updates reactively
- [x] 5.4 Create `ThinkingIndicator` component: shows "Pensando..." text during AI turn; verify appears/disappears with `isThinking` state
- [x] 5.5 Create `GameScreen` component: composes `BoardGrid`, `ScoreDisplay`, `ThinkingIndicator`, version badge, and "Volver al Menú" button; receives `difficulty` as prop; renders all elements

## 6. Navigation Integration (app/page.tsx)

- [x] 6.1 Rewrite `app/page.tsx` as a state machine: `useState<View>("menu")`; render `MainMenu`, `DifficultySelect`, `GameScreen`, `ResultScreen`, or `AboutScreen` based on view state; pass `onNavigate` callbacks to each screen
- [x] 6.2 Wire navigation: MainMenu "Clásico" → DifficultySelect → select difficulty → GameScreen; GameScreen "Volver al Menú" → MainMenu; GameScreen game over → ResultScreen; ResultScreen "Volver al Menú" → MainMenu; MainMenu "Sobre Nosotros" → AboutScreen → back to MainMenu
- [x] 6.3 Remove `GameBoard` direct import from page.tsx (no longer needed as root view); `GameBoard` is still used inside `GameScreen`

## 7. Integration and Verification

- [x] 7.1 Run `npm run test` (Vitest) and verify all new model tests pass (engine, minimax) alongside existing R1 tests
- [x] 7.2 Run `npm run build` and verify zero compilation or lint errors
- [x] 7.3 Manual verification: full game flow — Menu → Classic → select difficulty → play a few human moves → AI responds → finish game → see result → back to menu
- [x] 7.4 Verify version `0.2.0` displayed in menu and during game
- [ ] 7.3 Manual verification: full game flow — Menu → Classic → select difficulty → play a few human moves → AI responds → finish game → see result → back to menu
- [ ] 7.4 Verify version `0.2.0` displayed in menu and during game