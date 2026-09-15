## Purpose

Provides the AI opponent for the Classic game mode by porting the original Python minimax algorithm with alpha-beta pruning to TypeScript, adapted to the string-based cell encoding, and parameterized by player ID for future N-player support.

## ADDED Requirements

### Requirement: Minimax with alpha-beta pruning
The system SHALL implement the minimax algorithm with alpha-beta pruning as a pure function. It SHALL accept a `Problema` node, a search depth, a boolean for maximizing/minimizing phase, and alpha/beta parameters. The algorithm SHALL search the game tree to the given depth and return a heuristic score.

#### Scenario: Minimax returns score at leaf
- **WHEN** minimax is called with a terminal node (depth 0 or no moves for either player)
- **THEN** it SHALL return the heuristic value of that node

#### Scenario: Alpha-beta pruning prunes branches
- **WHEN** the beta value is less than or equal to alpha during search
- **THEN** the remaining branches SHALL be pruned (not evaluated)

### Requirement: Best move selection
The system SHALL provide a `mejorJugada(board, playerId, depth)` function that returns the best `Move` for the given player at the given depth. It SHALL evaluate all possible moves from the player's current position using minimax and return the move with the highest evaluation.

#### Scenario: Best move returned
- **WHEN** `mejorJugada` is called with a board and depth
- **THEN** it SHALL return a valid `Move`
- **THEN** the move SHALL be from the player's current position to a valid empty destination

### Requirement: Problema class
The system SHALL implement a `Problema` class that represents a game state for the search tree. It SHALL accept a board (`BoardState`) and a `PlayerId`. It SHALL compute and store: the player's current position, the opponent's current position, and all valid moves for both. For 2-player games, the opponent is the other player. The class SHALL be designed so `PlayerId` can be parameterized for future N-player support.

#### Scenario: Problema created for player
- **WHEN** a `Problema` is created with a board and player ID
- **THEN** it SHALL locate that player's position
- **THEN** it SHALL locate the opponent's position
- **THEN** it SHALL compute valid moves for both

### Requirement: Nodo class
The system SHALL implement a `Nodo` class for the search tree. Each `Nodo` SHALL hold a `Problema`, a reference to its parent `Nodo`, and its depth in the tree. It SHALL support `expandir(playerId)` which generates child nodes by applying each valid move: the origin becomes a trail (`"t{id}"`), the destination becomes the player position (`"p{id}"`), and a new `Problema` is created for the resulting board.

#### Scenario: Expand generates children
- **WHEN** a `Nodo` is expanded for a player with 3 valid moves
- **THEN** 3 child `Nodo` instances SHALL be created
- **THEN** each child SHALL have depth = parent depth + 1
- **THEN** each child's board SHALL reflect the move applied

### Requirement: Heuristica class
The system SHALL implement a `Heuristica` class that evaluates a `Problema` state. The heuristic SHALL use four coefficients: a=1.0 (own mobility), b=1.5 (opponent mobility penalty), c=0.5 (own center control), d=0.5 (opponent center control penalty). Center control SHALL be measured as negative Manhattan distance from the board center. The heuristic formula SHALL be: `a * ownMoves - b * oppMoves + c * ownCenter - d * oppCenter`.

#### Scenario: Heuristic computed
- **WHEN** a `Heuristica` evaluates a game state
- **THEN** the result SHALL be a number
- **THEN** more favorable states for the player SHALL yield higher values

### Requirement: Difficulty levels via search depth
The system SHALL provide three difficulty levels controlled by search depth: Principiante (depth 2), Amateur (depth 4), Experto (depth 6). The difficulty SHALL be passed to `mejorJugada` as the depth parameter.

#### Scenario: Difficulty affects search
- **WHEN** `mejorJugada` is called with depth 2
- **THEN** the search tree SHALL be limited to depth 2
- **WHEN** `mejorJugada` is called with depth 6
- **THEN** the search tree SHALL be limited to depth 6

### Requirement: Model purity
The minimax module SHALL have zero dependencies on DOM APIs, React, or browser APIs. It SHALL be importable and testable with Node.js directly.

#### Scenario: Node.js import
- **WHEN** importing the minimax module in a Node.js test
- **THEN** no errors or warnings SHALL occur