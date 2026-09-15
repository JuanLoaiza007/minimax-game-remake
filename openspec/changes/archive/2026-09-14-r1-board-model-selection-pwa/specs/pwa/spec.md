## Purpose

Configures the web app as a Progressive Web App so users can install it on their device's home screen and launch it like a native app.

## ADDED Requirements

### Requirement: Web app manifest
The project SHALL include a `manifest.json` at the root of the public directory with at minimum: `name`, `short_name`, `description`, `start_url`, `display` (standalone), `background_color`, `theme_color`, and `icons` array with 192px and 512px entries.

#### Scenario: Manifest exists and is valid
- **WHEN** the built site is served
- **THEN** `GET /manifest.json` SHALL return a valid JSON manifest
- **THEN** the manifest SHALL include `name`, `short_name`, `display`, and at least two icon entries

### Requirement: Meta tags
The root HTML layout SHALL include `<link rel="manifest" href="/manifest.json">` and `<meta name="theme-color" content="...">`.

#### Scenario: Head tags present
- **WHEN** inspecting the document head
- **THEN** a `link` element with `rel="manifest"` SHALL exist
- **THEN** a `meta` element with `name="theme-color"` SHALL exist

### Requirement: Placeholder icons
The project SHALL include placeholder icon files at `public/icon-192.png` and `public/icon-512.png`. These SHALL be simple colored or generated icons — not final sprites.

#### Scenario: Icon files present
- **WHEN** checking the `public/` directory
- **THEN** `icon-192.png` SHALL exist
- **THEN** `icon-512.png` SHALL exist

### Requirement: Lighthouse installability
The app SHALL pass Lighthouse's "Installable" audit with no critical errors.

#### Scenario: Lighthouse audit passes
- **WHEN** running a Lighthouse audit on the deployed or built app
- **THEN** the "Installable" audit SHALL show no critical failures