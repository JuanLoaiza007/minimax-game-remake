## Purpose

Renders the game board as a responsive CSS Grid with colored placeholder pieces, handles click-based piece selection and movement, and displays the game version in the interface.

## ADDED Requirements

### Requirement: Responsive CSS Grid layout
The board SHALL be rendered as a CSS Grid with equal-sized square cells. The grid SHALL scale proportionally: on viewports <480px it SHALL occupy nearly the full width; on viewports >768px it SHALL have a maximum size. No horizontal scroll SHALL occur at any viewport width.

#### Scenario: Mobile layout
- **WHEN** the viewport is 375px wide
- **THEN** the board grid SHALL span the full available width with minimal margin
- **THEN** cells SHALL be square

#### Scenario: Desktop layout
- **WHEN** the viewport is 1024px wide
- **THEN** the board grid SHALL be centered and capped at a maximum size (< viewport width)
- **THEN** cells SHALL be square

#### Scenario: No overflow
- **WHEN** the board is rendered at any viewport width
- **THEN** no horizontal scrollbar SHALL appear

### Requirement: Colored placeholder pieces
Active player pieces SHALL be displayed as colored circles or shapes inside their cells without images. Player 1 and player 2 SHALL use distinct, distinguishable colors. Empty cells SHALL be visually distinct from occupied cells.

#### Scenario: Player piece visible
- **WHEN** a cell has value `"p1"`
- **THEN** a colored circle SHALL appear in that cell
- **WHEN** a cell has value `"p2"`
- **THEN** a circle of a different color SHALL appear

#### Scenario: Empty cell appearance
- **WHEN** a cell has value `"0"`
- **THEN** the cell SHALL show no piece and SHALL look different from cells with pieces

### Requirement: Trail visualization
Trail cells SHALL be visually distinguishable from both empty cells and active player pieces. Each player's trail SHALL use a color related to their active piece color.

#### Scenario: Trail rendering
- **WHEN** a cell has value `"t1"`
- **THEN** it SHALL display a trail marker visually distinct from `"p1"` and `"0"`
- **WHEN** a cell has value `"t2"`
- **THEN** it SHALL display a trail marker visually distinct from `"p2"` and `"0"`

### Requirement: Piece selection
Clicking on a player's own piece SHALL select it. The selected cell SHALL be highlighted with a visual indicator (border, shadow, or different background). Clicking on the opponent's piece SHALL do nothing.

#### Scenario: Select own piece
- **WHEN** the user clicks on their own piece
- **THEN** the cell SHALL display a selection highlight

#### Scenario: Cannot select opponent piece
- **WHEN** the user clicks on the opponent's piece
- **THEN** no selection SHALL occur

### Requirement: Valid-move display
When a piece is selected, all valid destination cells SHALL be visually highlighted. Only empty cells reachable via a knight move from the selected piece SHALL be highlighted.

#### Scenario: Show valid moves
- **WHEN** a piece at (3,2) is selected on an otherwise empty 7x5 board
- **THEN** 8 cells SHALL be highlighted as valid destinations

#### Scenario: No highlight for blocked moves
- **WHEN** a valid destination is occupied
- **THEN** that cell SHALL NOT be highlighted

### Requirement: Click behavior
The system SHALL respond to clicks as follows:
- Click on a valid highlighted destination → move the piece there (update board, show trail)
- Click on another own piece → switch selection to that piece
- Click on an empty non-highlighted cell → deselect
- Click on an invalid cell → ignored or subtle feedback

#### Scenario: Move to destination
- **WHEN** a piece is selected and the user clicks a highlighted valid destination
- **THEN** the piece SHALL move: origin becomes trail, destination becomes player position
- **THEN** selection SHALL be cleared

#### Scenario: Switch selection
- **WHEN** a piece is selected and the user clicks another own piece
- **THEN** the new piece SHALL become selected and valid moves SHALL update

#### Scenario: Deselect on empty
- **WHEN** a piece is selected and the user clicks an empty non-highlighted cell
- **THEN** the selection SHALL be cleared

### Requirement: Version display
The game version `0.1.0` SHALL be visible somewhere in the interface (e.g., footer or corner).

#### Scenario: Version visible
- **WHEN** the game board is rendered
- **THEN** the version string SHALL be displayed