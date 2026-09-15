## 1. Foundation — CSS & Layout

- [ ] 1.1 Set `--radius: 0` in globals.css — replace `--radius: 0.625rem` with `--radius: 0` and verify the button component uses `rounded-none` (already hardcoded), and that Card/Dialog will inherit `--radius: 0` after they are added
- [ ] 1.2 Convert to dark-only mode — move `.dark` class CSS variables to replace `:root` values, remove the `.dark` selector, delete the `@custom-variant dark` line, add `dark` class to `<html>` in `layout.tsx`, and verify the app renders dark by default with no light flash
- [ ] 1.3 Install `card` and `dialog` shadcn components — run `npx shadcn@latest add card dialog` and verify both files exist at `components/ui/card.tsx` and `components/ui/dialog.tsx`
- [ ] 1.4 Verify yellow button text contrast — inspect `--primary` (`oklch(0.795 0.184 86.047)`) and `--primary-foreground` (`oklch(0.421 0.095 57.708)`) produce ≥ 4.5:1 contrast ratio; adjust `--primary-foreground` if needed (expected to pass per design.md)

## 2. Navigation Components — MainMenu & DifficultySelect

- [ ] 2.1 Update MainMenu — import `Button` from `@/components/ui/button`, replace Clásico with `<Button variant="default" size="lg">`, Personalizado with `<Button variant="default" size="lg" disabled>`, Sobre Nosotros with `<Button variant="ghost" size="lg">`, and verify navigation still works and buttons render square with yellow primary
- [ ] 2.2 Update DifficultySelect — import `Button` and `Card`/`CardHeader`/`CardContent`, wrap each difficulty option in a `<Card>`, replace the selection `<button>` with `<Button variant="outline" size="lg">`, replace the back link with `<Button variant="link">`, and verify difficulty selection works and cards render square

## 3. Game Screen — Score, Dialog, & Back Button

- [ ] 3.1 Update ScoreDisplay — import `Card`/`CardContent`, wrap the score area in a minimal `<Card>`, preserve the existing score text layout and colors (green for P1, red for P2), and verify scores still display correctly during gameplay
- [ ] 3.2 Replace result modal with shadcn Dialog — import `Dialog`/`DialogContent`/`DialogHeader`/`DialogTitle`/`DialogDescription`, replace the fixed overlay `<div>` with `<Dialog open={resultVisible}>`, move the result text and final scores into Dialog components, replace the "Volver al Menú" button with `<Button variant="default">`, and verify the dialog opens on game end with proper focus trap and closes on Escape
- [ ] 3.3 Update back button in GameScreen — replace "← Volver al Menú" with `<Button variant="link">` and verify it navigates to menu

## 4. About Screen

- [ ] 4.1 Update AboutScreen — replace hand-rolled white card with `<Card>`/`<CardContent>`, replace back link with `<Button variant="link">`, and verify content renders correctly in dark mode

## 5. Dark Theme Board Cell Adjustment

- [ ] 5.1 Adjust BoardCell background for dark mode — replace `bg-white` with `bg-card` or a dark-friendly color, replace `bg-emerald-50` (trail) with a darker tint like `bg-emerald-950/20`, and verify cells are visible and distinguishable on the dark background

## 6. Verification

- [ ] 6.1 Full visual walkthrough — navigate Menu → Difficulty → Game → play through a game → see result dialog → return to menu → view About screen, and confirm every screen uses shadcn components with square corners, yellow primary buttons, and dark background throughout
- [ ] 6.2 Run `npm run build` and confirm no TypeScript or lint errors