# Yoshi's World Remake — Product Backlog

## Stack Técnico

- **Frontend:** Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript
- **Modelo:** Lógica pura del juego en `lib/game/` (sin DOM, testeable con Node)
- **AI:** Minimax con poda alfa-beta (traducción del original Python → TypeScript)
- **Despliegue:** Online sin backend ni base de datos (estático / Vercel)
- **PWA:** Manifest + etiquetas meta para instalación en navegador
- **Versionado:** Semver (`0.x.y` durante desarrollo). La versión se muestra en la interfaz desde Ronda 1.

## Encoding de celdas

El tablero se representa como `CellState[][]`. Cada celda es un string corto:

| Valor | Significado       |
|-------|-------------------|
| `"0"` | Vacía             |
| `"p1"`| Posición jugador 1 |
| `"p2"`| Posición jugador 2 |
| `"t1"`| Trail jugador 1   |
| `"t2"`| Trail jugador 2   |

Expansión futura: `"p3"`, `"p4"`, `"t3"`, `"t4"`, y otros trails especiales según se necesiten.

## Convención

Cada **Ronda** es un change de OpenSpec. Dentro de cada ronda, los **Objetivos** definen
incrementos usables con sus **Criterios de Aceptación**. Las **Tareas** son los módulos
técnicos concretos.

Ver `docs/BACKLOG_CONVENTION.md` para la convención completa.

---

## Ronda 1 — Tablero, Movimientos y PWA — `0.1.0`

**Objetivo:** Construir el núcleo del juego como componentes reutilizables:
modelo OOP del tablero, grid responsive, validación de movimientos de caballo,
y preparar la app para PWA. Sin game loop ni menú todavía.

### Objetivo: Modelo OOP del juego
**Como** desarrollador, **quiero** una representación orientada a objetos del tablero,
jugadores, posiciones y movimientos **para** que todo el sistema de juego (2 jugadores, IA,
variantes) se construya sobre una base sólida y testeable.

**Criterios de Aceptación:**
- [ ] Existe un tipo `CellState` con valores `"0" | "p1" | "p2" | "t1" | "t2"`, expandible a más jugadores
- [ ] Existe un tipo `Player` con identificador único (1 y 2 inicialmente, hasta 4 en el type)
- [ ] Existe un tipo `Position` con fila y columna
- [ ] Existe un tipo `Move` con origen y destino
- [ ] Existe una clase `Board` que encapsula la matriz `CellState[][]` y su manipulación
- [ ] El modelo es puro (sin dependencias del DOM, sin React) y se puede probar con Node

**Tareas:**
- [ ] Definir tipos: `Position`, `Player`, `Move`, `CellState`, `BoardState` → `lib/game/types.ts`
- [ ] Implementar `Board`: constructor con dimensiones, get/set de celdas, clonación profunda → `lib/game/board.ts`
- [ ] Implementar `generateHorseMoves`, `isValidMove`, `isFreePosition` → `lib/game/moves.ts`
- [ ] Las piezas se colocan en posiciones fijas para Ronda 1 (configurable a futuro)
- [ ] Escribir tests básicos: crear tablero, colocar jugadores, clonar, leer

### Objetivo: Grid responsive del tablero
**Como** jugador, **quiero** ver el tablero en mi dispositivo con las piezas colocadas
**para** empezar a familiarizarme con la interfaz del juego.

**Criterios de Aceptación:**
- [ ] El tablero se renderiza como cuadrícula de celdas (CSS Grid)
- [ ] Las celdas son cuadradas y escalan proporcionalmente al ancho disponible
- [ ] En móvil (<480px), el tablero ocupa todo el ancho con un margen mínimo
- [ ] En escritorio (>768px), el tablero tiene un tamaño máximo (no ocupa todo el viewport)
- [ ] No hay scroll horizontal bajo ninguna circunstancia
- [ ] Las piezas (player1, player2) se muestran con placeholders circulares de color (no sprites)
- [ ] Las casillas vacías se ven distintas a las ocupadas
- [ ] La versión (`0.1.0`) se muestra en la interfaz (footer o esquina)

### Objetivo: Selección de pieza y validación de movimientos
**Como** jugador, **quiero** tocar mi pieza y ver a dónde puede moverse
**para** entender las reglas del juego antes de que exista un game loop.

**Criterios de Aceptación:**
- [ ] Al hacer clic/tocar una pieza, la celda se resalta (borde, sombra o color diferente)
- [ ] Al seleccionar una pieza, las casillas destino válidas se resaltan (color distinto)
- [ ] Al hacer clic en una casilla inválida, se ignora o se muestra feedback sutil
- [ ] Al hacer clic en otra pieza, la selección cambia a esa pieza
- [ ] Al hacer clic en una celda vacía no resaltada (no es destino válido), se deselecciona
- [ ] Los movimientos válidos se generan con el algoritmo de caballo (8 direcciones en L)
- [ ] No se resaltan movimientos que salen del tablero ni hacia casillas ocupadas
- [ ] La pieza del oponente no se puede seleccionar

### Objetivo: PWA configurada
**Como** jugador, **quiero** que el juego sea detectable como app instalable
**para** agregarlo a mi pantalla de inicio.

**Criterios de Aceptación:**
- [ ] El proyecto incluye un manifest.json con nombre, descripción, iconos y tema
- [ ] El layout de Next.js incluye las etiquetas `<link rel="manifest">` y `<meta name="theme-color">`
- [ ] Lighthouse reporta "Instalable" sin errores críticos
- [ ] Los iconos placeholder existen en `public/` (192px y 512px) — SVG generados o colores sólidos

---

## Ronda 2 — Clásico (1 vs IA) — `0.2.0`

**Requiere:** Ronda 1 (tablero responsive, selección, validación de movimientos, PWA configurada).

**Objetivo:** Convertir el tablero en el modo de juego principal "Clásico":
un jugador humano contra la IA, con menú, game engine, puntuación y dificultad seleccionable.

### Objetivo: Menú principal con navegación
**Como** jugador, **quiero** un menú donde navegar entre modos de juego e información
**para** iniciar partidas y conocer el proyecto.

**Criterios de Aceptación:**
- [ ] Pantalla de inicio con título, versión, y opciones de menú
- [ ] Opción "Clásico" (1 vs IA) → lleva al selector de dificultad
- [ ] Otras opciones de menú existen pero muestran "Próximamente"
- [ ] Opción "Sobre Nosotros" con info básica del proyecto
- [ ] Botón "Volver al Menú" desde cualquier pantalla del juego
- [ ] El menú es responsive (no se rompe en móvil)
- [ ] La versión (`0.2.0`) se muestra en el menú

**Tareas:**
- [ ] Implementar sistema de rutas/pantallas (menú → juego → resultado → menú)
- [ ] Componente `MainMenu` con navegación
- [ ] Componentes placeholder para modos futuros (etiqueta "Próximamente")
- [ ] Pantalla "Sobre Nosotros"
- [ ] Indicador de versión visible en menú y juego

### Objetivo: Game Engine con bucle de turnos
**Como** jugador, **quiero** que el juego alterne turnos y aplique las reglas automáticamente
**para** poder jugar una partida sin intervención manual.

**Criterios de Aceptación:**
- [ ] Existe `GameEngine` (clase o conjunto de funciones) que orquesta el estado de la partida
- [ ] `currentPlayer` alterna después de cada movimiento válido
- [ ] Un movimiento inválido se rechaza sin cambiar turno ni tablero
- [ ] Se detecta cuándo un jugador no tiene movimientos disponibles

### Objetivo: Movimiento completo con trail
**Como** jugador, **quiero** que al mover una pieza, el tablero se actualice:
la pieza se coloca en el destino, la casilla anterior pasa a ser "rastro"
**para** ver el progreso de la partida.

**Criterios de Aceptación:**
- [ ] Al mover, la celda origen cambia a `"t1"` (humano) o `"t2"` (máquina)
- [ ] Al mover, la celda destino recibe `"p1"` o `"p2"`
- [ ] El rastro se distingue visualmente de las piezas activas y de las celdas vacías
- [ ] La selección se limpia después del movimiento

### Objetivo: Puntuación y fin de partida
**Como** jugador, **quiero** ver mi puntuación actualizada y saber quién ganó al final
**para** tener retroalimentación del resultado.

**Criterios de Aceptación:**
- [ ] La puntuación cuenta las casillas que cada jugador ha ocupado (`"p"` + `"t"` del jugador)
- [ ] La UI muestra la puntuación de ambos jugadores, visible siempre
- [ ] Cuando ningún jugador puede mover, se muestra pantalla de resultado
- [ ] El resultado indica ganador con puntuación final, o empate
- [ ] Desde el resultado se puede volver al menú

### Objetivo: Port del Minimax original a TypeScript
**Como** jugador, **quiero** que la IA juegue usando el mismo algoritmo que el juego original
**para** tener partidas desafiantes.

**Criterios de Aceptación:**
- [ ] `minimax(nodo, profundidad, maximizando, alpha, beta)` existe en TypeScript
- [ ] `mejorJugada(tablero, profundidad)` devuelve la mejor jugada para la máquina
- [ ] La heurística usa coeficientes a=1.0, b=1.5, c=0.5, d=0.5
- [ ] La heurística considera: movimientos propios, movimientos del oponente, control del centro
- [ ] Poda alfa-beta funciona (se podan ramas demostrablemente)
- [ ] Las clases `Problema`, `Nodo`, `Heuristica` existen con la misma lógica del original
- [ ] Sin dependencias del DOM — función pura, testeable con Node
- [ ] Traducido a TypeScript manteniendo la lógica, con los nuevos tipos de celda (`"p1"`, `"p2"`, etc.)

### Objetivo: Selector de dificultad
**Como** jugador, **quiero** elegir entre 3 niveles de dificultad
**para** ajustar el reto de la IA.

**Criterios de Aceptación:**
- [ ] Dificultades: Principiante (profundidad 2), Amateur (4), Experto (6)
- [ ] El menú muestra selector de dificultad al seleccionar "Clásico"
- [ ] La dificultad se muestra durante la partida

### Objetivo: Modo 1 jugador completo
**Como** jugador, **quiero** seleccionar "Clásico", elegir dificultad, y jugar contra la IA
**para** partidas individuales.

**Criterios de Aceptación:**
- [ ] Flujo: Menú → Clásico → Elegir dificultad → Jugar
- [ ] La IA juega automáticamente en su turno
- [ ] El turno de la IA no congela la interfaz (setTimeout, requestAnimationFrame o similar)
- [ ] Durante el turno de la IA, se muestra indicador "Pensando..."

---

## Ronda 3 — Personalizado (N Jugadores) — `0.3.0`

**Requiere:** Ronda 2 (menú, game engine, IA funcional).

**Objetivo:** Permitir partidas configuradas con hasta 4 jugadores,
cada uno pudiendo ser humano o IA, y tablero de tamaño configurable.

### Objetivo: Ampliar modelo a N jugadores
**Como** jugador, **quiero** jugar partidas con más de 2 participantes
**para** partidas con amigos o múltiples IAs.

**Criterios de Aceptación:**
- [ ] Los tipos soportan hasta 4 jugadores: `"p3"`, `"p4"`, `"t3"`, `"t4"`
- [ ] El turno circula secuencialmente entre los jugadores activos
- [ ] El juego termina cuando todos los jugadores no pueden moverse
- [ ] La puntuación es individual por jugador
- [ ] Los placeholders tienen colores distintos para cada jugador (4 colores)

### Objetivo: Configuración de partida
**Como** jugador, **quiero** configurar cuántos jugadores participan y quién es IA
**para** crear partidas variadas.

**Criterios de Aceptación:**
- [ ] Pantalla de configuración antes de iniciar partida personalizada
- [ ] Se puede elegir número de jugadores (2 a 4)
- [ ] Cada jugador puede ser "Humano" o "IA"
- [ ] Las IAs usan el minimax con dificultad seleccionable por IA
- [ ] Se puede configurar el tamaño del tablero (ancho y alto)

### Objetivo: Múltiples IAs en una partida
**Como** jugador, **quiero** que varias IAs jueguen entre sí o contra humanos
**para** partidas con múltiples oponentes automatizados.

**Criterios de Aceptación:**
- [ ] Cada IA juega su turno automáticamente
- [ ] Las IAs no se bloquean entre sí ni congelan la interfaz
- [ ] Durante turnos IA, se muestra indicador "Pensando..." (con qué IA)
- [ ] El minimax funciona correctamente con más de 2 jugadores (la heurística se adapta)

---

## Ronda 4 — Polimento Visual — `0.4.0`

**Requiere:** Ronda 3.

### Objetivo: Sprites definitivos
**Como** jugador, **quiero** que las piezas tengan diseño visual final
**para** una experiencia atractiva.

**Criterios de Aceptación:**
- [ ] Los placeholders son reemplazados por sprites finales (SVG, PNG o lo que decidas)
- [ ] Los sprites distinguen claramente a cada jugador
- [ ] Escalan correctamente en todos los tamaños

### Objetivo: Animaciones de movimiento
**Como** jugador, **quiero** ver transiciones animadas al mover piezas
**para** que el juego se sienta fluido.

**Criterios de Aceptación:**
- [ ] Animación visible al mover piezas (CSS transition o keyframes)
- [ ] No bloquea la interacción
- [ ] Funciona en móvil sin lag

---

## Ronda 5+ — Extras (sin priorizar)

- Historial de partidas en localStorage
- Sonidos
- Tableros de diferentes tamaños (variante opcional — ya preparado desde Ronda 3)
- Temas visuales (dark mode incluido)
- Pantalla "Sobre Nosotros" completa
- Compartir resultado de partida
- Replay (animación del historial de movimientos)