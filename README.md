# minimax-game-remake

A web remake of the **Proyecto-2-IA-2024-I** board game — a two-player strategy game where pieces move like knights in chess. Built from scratch as a Progressive Web App.

The original version was developed in Python/PyQt5 for an AI course at Universidad del Valle and lives in the adjacent `Proyecto-2-IA-2024-I` directory.

## The Game

- **Board:** 7×5 grid (configurable up to 4 players in future rounds)
- **Movement:** Knight moves — 8 L-shaped directions
- **Trail:** Leaving a cell turns it into territory (your trail)
- **Scoring:** Active piece position + all trail cells
- **End:** Game ends when no player can move
- **Winner:** Highest score

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 |
| UI | React 19 + Tailwind CSS 4 |
| Language | TypeScript |
| Game model | Pure TS (`lib/game/`) — no DOM dependencies |
| AI | Minimax with alpha-beta pruning (ported from Python) |
| Deployment | Static / Vercel |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
minimax-game-remake/
├── app/              # Next.js App Router pages and layouts
├── lib/
│   └── game/         # Pure game model (Board, types, moves)
├── public/           # Static assets (PWA icons, manifest)
└── docs/
    └── BACKLOG.md    # Product backlog by rounds
```

## Development Workflow

This project uses **OpenSpec** for structured change management. Each development round follows: explore → propose → apply → archive.

Rounds are tracked in `openspec/changes/`. See [docs/BACKLOG.md](docs/BACKLOG.md) for the full roadmap.

| Round | Version | Scope |
|-------|---------|-------|
| 1 | 0.1.0 | Board model, responsive grid, piece selection, PWA |
| 2 | 0.2.0 | Classic mode (1v1 AI), game engine, difficulty, menu |
| 3 | 0.3.0 | Custom mode (up to 4 players, mixed human/AI) |
| 4 | 0.4.0 | Final sprites, animations |
| 5+ | — | Extras: sound, history, themes, replay |