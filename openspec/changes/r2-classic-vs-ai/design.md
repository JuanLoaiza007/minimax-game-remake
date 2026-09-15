## Context

Ronda 1 creó un tablero interactivo sin game loop (sandbox de movimientos libres). Ronda 2 lo convierte en el modo "Clásico" 1vsIA. El Python original con minimax existe en `../Proyecto-2-IA-2024-I/models/shared/` como referencia directa para el puerto.

Ver proposal.md para motivación y specs/ para requisitos de comportamiento.

## Goals / Non-Goals

**Goals:**
- Navegación por pantallas con estado cliente (sin App Router, sin context)
- `GameEngine` clase pura que orquesta turnos, validación, puntuación, game-over
- Puerto exacto del minimax Python a TypeScript con encoding string y `PlayerId` paramétrico
- IA no bloqueante con `setTimeout` para mostrar "Pensando..." antes del cómputo
- Movimiento completo con trail ya implementado en R1 — no se reimplementa

**Non-Goals:**
- Navegación por URL o ruteo de Next.js
- Soporte multijugador o N jugadores (Ronda 3)
- Sprites, animaciones, sonidos (Ronda 4)
- Historial de partidas o persistencia (Ronda 5+)
- Web Workers (se evalúa si profundidad 6 resulta muy lenta en la práctica)

## Decisions

### Screen switching: `useState` en page.tsx (sin router)

Alternativas consideradas: App Router pages, hash router, context provider, biblioteca externa.

Elegido: un `useState<View>` en `app/page.tsx` con 5 valores: `"menu" | "difficulty" | "game" | "result" | "about"`. Cada pantalla es un componente independiente en `components/` que recibe `onNavigate: (view: View) => void` y datos específicos (dificultad, resultado). No hay context, no hay provider, no hay dependencias.

```
page.tsx                                      estado: view, difficulty, gameResult
  ├── MainMenu        ← onSelect → "difficulty" | "about"
  ├── DifficultySelect ← onConfirm → "game" + difficulty; onBack → "menu"
  ├── GameScreen      ← onGameOver → "result"; onMenu → "menu"
  ├── ResultScreen    ← onMenu → "menu"
  └── AboutScreen     ← onBack → "menu"
```

### GameEngine: clase pura en lib/game/ + hook thin en components/

Se sigue el mismo patrón de `Board`: lógica pura testeable con Node, envuelta en un hook React para estado y re-renders.

```
lib/game/engine.ts        → GameEngine(board, difficulty)
  - currentPlayer, scores, gameOver
  - applyMove(move): void       — ejecuta el trail + pos, actualiza scores
  - switchTurn(): void          — alterna jugador, chequea game over
  - getAIMove(): Move           — llama a mejorJugada() (la IA mismísima es parte del engine)
  - getScores(): [number, number]
  - isGameOver(): boolean
  - getWinner(): PlayerId | null

components/useGameEngine.ts  → hook
  - crea GameEngine en useRef (no useState — no queremos re-render por el engine interno)
  - estado React: grid, scores, currentPlayer, isThinking, gameOver
  - handlePlayerClick(row, col): valida, applyMove, switchTurn, si es turno IA → setTimeout
  - en turno IA: setThinking(true), setTimeout 50ms, compute AI move, applyMove, switchTurn, setThinking(false)
```

El hook expone hacia `GameScreen`: `grid`, `scores`, `currentPlayer`, `validMoves`, `isThinking`, `isGameOver`, `handleCellClick`, `winner`.

Alternativa considerada: extender `useGameBoard` directamente. Descartado porque mezcla lógica de presentación (selección, clicks) con lógica de juego (turnos, IA, puntuación). Separar engine + hook mantiene el modelo testeable.

### Turno IA: setTimeout(50ms) para non-blocking

Alternativas consideradas: Web Worker, requestIdleCallback, chunked computation con yielding.

Elegido: `setTimeout(() => computeAIMove(), 50)`. El 50ms permite que React pinte "Pensando..." antes de que el hilo se bloquee con el cómputo del minimax. Para profundidad 2-4 es instantáneo (< 50ms total). Para profundidad 6 puede tardar ~1-3s, pero el usuario ya vio el indicador.

Riesgo mitigado: si profundidad 6 resulta incómoda en la práctica, se migra a Web Worker en Ronda 4 sin cambiar la API de `GameEngine` (solo el hook).

### Puerto del minimax: clases Problema, Nodo, Heuristica con encoding string

El Python original usa enteros: `1=Machine`, `2=Human`, `3=Machine trail`, `4=Human trail`. El TypeScript port usa strings: `"p1"`, `"p2"`, `"t1"`, `"t2"`.

Cambios clave respecto al original:
- `Problema(playerId: PlayerId)` recibe qué jugador es "nosotros" — dinámico para futuro N jugadores
- `searchCoords` busca `"p{id}"` en lugar de valor entero
- `expandir(playerId)` usa `"t{id}"` para trail y `"p{id}"` para nueva posición
- Para 2 jugadores, el oponente es el otro `PlayerId`. La heurística original asume oponente único — se conserva igual

```
lib/game/minimax.ts
  Problema(board, playerId)
  Nodo(problema)
    · expandir(playerId) → Nodo[]
    · calcular_heuristica() → number
  Heuristica(problema)
    · coeficientes a=1.0, b=1.5, c=0.5, d=0.5
  minimax(nodo, profundidad, maximizando, alpha, beta) → number
  mejorJugada(board, playerId, depth) → Move | null
```

### Dificultad: depth como parámetro, no clases separadas

No se crean clases `Principiante`, `Amateur`, `Experto`. La dificultad es simplemente un `number` (profundidad 2, 4, 6) que se pasa a `mejorJugada`. El selector de dificultad en la UI mapea nombre → número.

### Trail: ya implementado en Ronda 1

El movimiento con trail (origin→trail, destination→player, visualización de trail) se completó en `useGameBoard.ts` y `BoardCell.tsx` de Ronda 1. `GameEngine.applyMove()` reutiliza la misma lógica sobre el `Board`. No se requieren cambios.

### Archivos nuevos (no se modifican los de R1)

```
NUEVOS:
  lib/game/engine.ts
  lib/game/minimax.ts
  lib/game/engine.test.ts
  lib/game/minimax.test.ts
  components/GameScreen.tsx
  components/MainMenu.tsx
  components/DifficultySelect.tsx
  components/ResultScreen.tsx
  components/AboutScreen.tsx
  components/ScoreDisplay.tsx
  components/ThinkingIndicator.tsx
  components/useGameEngine.ts

MODIFICADOS:
  app/page.tsx              — reemplazar <GameBoard /> por state machine
  lib/constants.ts          — APP_VERSION → "0.2.0"

NO TOCADOS (R1 intacto):
  lib/game/types.ts, board.ts, moves.ts, game.test.ts
  components/BoardCell.tsx, BoardGrid.tsx, VersionBadge.tsx
  public/manifest.json, app/layout.tsx
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Profundidad 6 puede congelar la UI varios segundos | `setTimeout(50)` muestra "Pensando..." antes. Si es muy lento, Web Worker en R4 |
| Next.js 16 tiene APIs que difieren del training data | Leer `node_modules/next/dist/docs/` antes de escribir código |
| `useGameEngine` hook puede crecer en complejidad | La lógica de juego está en `GameEngine` (testeable). El hook solo orquesta estado React y setTimeout |
| El puerto del minimax puede tener diferencias sutiles del original | Test de regresión: mismos inputs → mismos outputs que el Python original |
| El encoding string es menos eficiente que enteros para el minimax (comparaciones vs números) | Costo irrelevante para tablero 7×5 con profundidad máxima 6 (~10⁵ nodos) |