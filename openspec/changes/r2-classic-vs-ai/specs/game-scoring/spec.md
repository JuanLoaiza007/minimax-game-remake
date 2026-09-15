## Purpose

Tracks each player's score during a game by counting their occupied cells (active position + trail), detects when no player can move, and presents the game result with winner and final scores.

## ADDED Requirements

### Requirement: Score calculation
The system SHALL calculate each player's score as the total number of cells they occupy: their active position (`"p1"` or `"p2"`) plus their trail cells (`"t1"` or `"t2"`). Score SHALL update after every move.

#### Scenario: Initial score
- **WHEN** a game starts
- **THEN** each player SHALL have a score of 1 (their starting position)

#### Scenario: Score increments on move
- **WHEN** a player moves to a new cell
- **THEN** the destination becomes their new position
- **THEN** the origin becomes their trail
- **THEN** the player's score SHALL increase by 1 (1 new trail cell)

### Requirement: Score display
The system SHALL display both players' scores at all times during the game. The score display SHALL update immediately after each move.

#### Scenario: Scores visible during game
- **WHEN** a game is in progress
- **THEN** both players' scores SHALL be visible on screen
- **THEN** the scores SHALL reflect the current board state

### Requirement: End-game detection
The system SHALL detect when the game ends. A game ends when the current player has no valid moves available. After detecting end of game, the system SHALL NOT switch turns — the game is over.

#### Scenario: No moves for current player
- **WHEN** it is a player's turn and they have zero valid moves
- **THEN** the game SHALL end
- **THEN** the result screen SHALL be shown

### Requirement: Result screen
The system SHALL display a result screen at the end of a game. The result SHALL show: the winner (player with highest score, or tie), the final scores for both players, and a button to return to the main menu.

#### Scenario: Player 1 wins
- **WHEN** the game ends and Player 1 has a higher score
- **THEN** the result SHALL indicate Player 1 as winner
- **THEN** final scores SHALL be displayed

#### Scenario: Tie game
- **WHEN** the game ends with equal scores
- **THEN** the result SHALL indicate a tie
- **THEN** final scores SHALL be displayed

#### Scenario: Back to menu from result
- **WHEN** the user clicks "Volver al Menú" on the result screen
- **THEN** the main menu SHALL be displayed