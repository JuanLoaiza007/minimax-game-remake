## Why

Ronda 1 construyó un tablero interactivo donde el usuario puede mover piezas libremente, pero no hay un juego real: no hay turnos, no hay oponente, no hay puntuación, no hay fin de partida. Ronda 2 convierte ese tablero en el modo de juego principal "Clásico": un jugador humano contra la IA, con menú, game engine, puntuación y dificultad seleccionable.

## What Changes

- Sistema de navegación por pantallas (menú → dificultad → juego → resultado → menú) sin router de Next.js, usando estado local en `page.tsx`
- Componente `MainMenu` con título, versión, opciones de menú, y placeholder "Próximamente" para modos futuros
- Componente `DifficultySelect` con 3 niveles: Principiante (profundidad 2), Amateur (4), Experto (6)
- Componente `GameScreen` que orquesta la partida completa con turnos, IA, puntuación visible, e indicador "Pensando..."
- Componente `ResultScreen` con ganador, puntuación final, y botón para volver al menú
- Componente `AboutScreen` con información del proyecto
- Clase `GameEngine` pura (sin React) en `lib/game/engine.ts` que maneja: alternancia de turnos, validación de movimientos, detección de fin de partida, y puntuación
- Puerto del minimax original Python a TypeScript en `lib/game/minimax.ts`: clases `Problema`, `Nodo`, `Heuristica`, funciones `minimax()` y `mejorJugada()`, adaptadas al encoding de celdas string (`"p1"`, `"p2"`, `"t1"`, `"t2"`)
- Movimiento completo con trail: ya implementado en Ronda 1, se marca como cumplido
- La IA juega su turno con `setTimeout` para no congelar la interfaz
- Versión actualizada a `0.2.0`
- Botón "Volver al Menú" desde cualquier pantalla del juego

## Capabilities

### New Capabilities
- `menu`: Sistema de navegación por pantallas con menú principal, selector de dificultad, pantalla "Sobre Nosotros", y placeholders para modos futuros
- `game-scoring`: Puntuación que cuenta casillas ocupadas (`"p"` + `"t"`), detección de fin de partida cuando ningún jugador puede mover, y pantalla de resultado con ganador/empate
- `ai-minimax`: Puerto del algoritmo minimax con poda alfa-beta desde el Python original a TypeScript, incluyendo las clases `Problema`, `Nodo`, `Heuristica` y las funciones `minimax()`, `mejorJugada()`, adaptadas al encoding string y parametrizadas por `PlayerId` para soporte futuro de N jugadores

### Modified Capabilities
*(Ninguna — los specs existentes game-model, board-ui y pwa no cambian su comportamiento)*

## Impact

- `lib/game/` — se agregan `engine.ts` y `minimax.ts` (nuevos archivos, no modifican los existentes)
- `components/` — se agregan `MainMenu.tsx`, `DifficultySelect.tsx`, `GameScreen.tsx`, `ResultScreen.tsx`, `AboutScreen.tsx`, `ScoreDisplay.tsx`, `ThinkingIndicator.tsx`
- `app/page.tsx` — se reemplaza el render directo de `GameBoard` por un state machine de pantallas
- `lib/constants.ts` — se actualiza `APP_VERSION` a `"0.2.0"`
- No se agregan dependencias externas
- No se modifican `Board`, `types`, `moves`, `BoardCell`, `BoardGrid` (excepto `useGameBoard` que será reemplazado por `useGameEngine`)