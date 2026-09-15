## Purpose

Provides a navigation system between game screens (menu, difficulty selection, game, result, about) using client-side state rather than URL routes, so the user can start games, learn about the project, and navigate freely without server dependencies.

## ADDED Requirements

### Requirement: Main menu screen
The system SHALL display a main menu as the initial screen. It SHALL show the game title, current version (`0.2.0`), and at least the following options: "Clásico" (1 vs IA), "Próximamente" placeholders for other modes, and "Sobre Nosotros".

#### Scenario: Menu renders with title and version
- **WHEN** the app loads
- **THEN** the main menu SHALL be displayed
- **THEN** the title SHALL be visible
- **THEN** the version string SHALL be `"0.2.0"`

#### Scenario: Classic option navigates to difficulty
- **WHEN** the user selects "Clásico"
- **THEN** the screen SHALL change to the difficulty selector

#### Scenario: About option shows info
- **WHEN** the user selects "Sobre Nosotros"
- **THEN** the screen SHALL change to the about screen

#### Scenario: Placeholder modes shown
- **WHEN** the menu displays
- **THEN** modes not yet implemented SHALL show a "Próximamente" label
- **THEN** those options SHALL NOT be clickable or SHALL show a non-blocking notice

### Requirement: Difficulty selector
The system SHALL present a difficulty selector when the user chooses "Clásico". Three levels SHALL be available: Principiante (profundidad 2), Amateur (profundidad 4), Experto (profundidad 6). Each SHALL display its name and a short description.

#### Scenario: Select difficulty
- **WHEN** the user selects a difficulty level
- **THEN** the game SHALL start with that difficulty
- **THEN** the selected difficulty SHALL be displayed during the game

#### Scenario: Back to menu from difficulty
- **WHEN** the user clicks "Volver al Menú" on the difficulty screen
- **THEN** the main menu SHALL be displayed

### Requirement: About screen
The system SHALL provide an "Sobre Nosotros" screen with basic project information: name, description, credits, and a link back to the menu.

#### Scenario: About screen displays
- **WHEN** the user navigates to "Sobre Nosotros"
- **THEN** project information SHALL be displayed

#### Scenario: Back to menu from about
- **WHEN** the user clicks "Volver al Menú" on the about screen
- **THEN** the main menu SHALL be displayed

### Requirement: Back to menu during game
The system SHALL provide a way to return to the main menu from any game screen (difficulty selection, game in progress, result).

#### Scenario: Return during game
- **WHEN** the user clicks "Volver al Menú" during an active game
- **THEN** the game SHALL end and the main menu SHALL be displayed

### Requirement: Responsive menu
All menu screens SHALL be responsive: no broken layout on mobile viewports, all options tappable.

#### Scenario: Mobile menu
- **WHEN** the viewport is 375px wide
- **THEN** all menu options SHALL be visible and tappable
- **THEN** no horizontal scroll SHALL appear