## Purpose

Defines the core data types, Board representation, and movement rules for the Yoshi's World game — the pure logic layer that all game modes build upon.

## ADDED Requirements

### Requirement: CellState encoding
The board SHALL use short string values for cell states: `"0"` for empty, `"p1"` and `"p2"` for player positions, `"t1"` and `"t2"` for player trails. The type SHALL be a TypeScript union of these five values, designed to be extended with `"p3"`, `"p4"`, `"t3"`, `"t4"` for future player support.

#### Scenario: CellState values are set correctly
- **WHEN** a player occupies a cell
- **THEN** the cell value SHALL be `"p1"` for player 1 and `"p2"` for player 2
- **WHEN** a player vacates a cell by moving
- **THEN** the old cell SHALL be `"t1"` for player 1 and `"t2"` for player 2
- **WHEN** a cell has never been occupied
- **THEN** the cell value SHALL be `"0"`

### Requirement: Position type
A position SHALL be represented as a `{ row: number; col: number }` object. Row and col SHALL be non-negative integers.

#### Scenario: Position creation
- **WHEN** a Position is created with row 3 and col 2
- **THEN** `row` SHALL be 3 and `col` SHALL be 2

### Requirement: Player type
Players SHALL be identified by a numeric ID (1 or 2 initially, expandable to 1–4). A Player type SHALL encapsulate the ID and label.

#### Scenario: Player identification
- **WHEN** player 1 is referenced
- **THEN** its ID SHALL be 1
- **WHEN** player 2 is referenced
- **THEN** its ID SHALL be 2

### Requirement: Move type
A move SHALL be represented with `from: Position` and `to: Position`.

#### Scenario: Move creation
- **WHEN** a Move is created from (1,1) to (3,2)
- **THEN** `from` SHALL be (1,1) and `to` SHALL be (3,2)

### Requirement: Board class
The Board SHALL encapsulate a 2D array of CellState values. It SHALL support:
- Constructor accepting row and column dimensions
- `getCell(pos): CellState` to read a cell
- `setCell(pos, state): void` to write a cell
- `clone(): Board` for deep copy
- Access to dimensions via `rows` and `cols` properties
- Default empty board on construction (all `"0"`)

#### Scenario: Create empty board
- **WHEN** a Board is created with 7 rows and 5 columns
- **THEN** all 35 cells SHALL be `"0"`
- **THEN** `rows` SHALL be 7 and `cols` SHALL be 5

#### Scenario: Deep clone independence
- **WHEN** a Board is cloned and the clone's cell is modified
- **THEN** the original board's corresponding cell SHALL remain unchanged

### Requirement: Knight move generation
The system SHALL generate valid knight moves from a given position. Valid moves are the 8 L-shaped offsets: (±2, ±1) and (±1, ±2). Only moves within board bounds and landing on empty cells (`"0"`) SHALL be returned.

#### Scenario: Center position move generation
- **WHEN** generating moves from position (3,2) on a 7x5 board
- **THEN** the result SHALL include positions (1,1), (1,3), (5,1), (5,3), (2,0), (2,4), (4,0), (4,4)
- **THEN** all returned positions SHALL be within bounds

#### Scenario: Corner position move generation
- **WHEN** generating moves from position (0,0) on a 7x5 board
- **THEN** only moves within bounds SHALL be returned: (1,2) and (2,1)

#### Scenario: Occupied destination excluded
- **WHEN** a destination cell is occupied by any player or trail
- **THEN** that destination SHALL NOT be included in valid moves

### Requirement: Move validation
The system SHALL validate whether a move from one position to another is legal. A move is legal if the destination is a valid knight move from the origin AND the destination is empty.

#### Scenario: Legal move accepted
- **WHEN** checking if move from (0,0) to (1,2) is valid on an empty board
- **THEN** the result SHALL be true

#### Scenario: Illegal move rejected
- **WHEN** checking if move from (0,0) to (0,1)
- **THEN** the result SHALL be false

### Requirement: Model purity
The entire game model SHALL have zero dependencies on DOM APIs, React, or browser APIs. It SHALL be importable and testable with Node.js directly.

#### Scenario: Model imports in Node
- **WHEN** importing the Board and move functions in a Node.js test
- **THEN** no errors or warnings SHALL occur

### Requirement: Player placement
For Ronda 1, player positions SHALL be fixed at construction time rather than random. The specific positions SHALL be configurable at Board creation.

#### Scenario: Fixed position placement
- **WHEN** a Board is created with player 1 at (0,0) and player 2 at (6,4)
- **THEN** cell (0,0) SHALL be `"p1"` and cell (6,4) SHALL be `"p2"`
- **THEN** all other cells SHALL be `"0"`