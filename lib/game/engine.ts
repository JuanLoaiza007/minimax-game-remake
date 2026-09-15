import { Board } from "./board";
import { type Position, type Move, type PlayerId, type BoardState } from "./types";
import { generateHorseMoves, canMoveFrom } from "./moves";
import { mejorJugada } from "./minimax";

export function opponentId(playerId: PlayerId): PlayerId {
  return playerId === 1 ? 2 : 1;
}

function cellForPlayer(playerId: PlayerId, type: "p" | "t"): "p1" | "p2" | "t1" | "t2" {
  return `${type}${playerId}` as "p1" | "p2" | "t1" | "t2";
}

function getScore(playerId: PlayerId, board: BoardState): number {
  const p = cellForPlayer(playerId, "p");
  const t = cellForPlayer(playerId, "t");
  let count = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell === p || cell === t) count++;
    }
  }
  return count;
}

const DIFFICULTY_MAP: Record<string, number> = {
  Principiante: 2,
  Amateur: 4,
  Experto: 6,
};

export class GameEngine {
  readonly board: Board;
  readonly difficultyName: string;
  readonly depth: number;
  currentPlayer: PlayerId;
  gameOver: boolean;
  winner: PlayerId | null;
  tie: boolean;
  turnQueue: PlayerId[];

  constructor(difficultyName: string) {
    this.board = new Board(7, 5);
    this.board.setupPlayers({ row: 0, col: 0 }, { row: 6, col: 4 });
    this.difficultyName = difficultyName;
    this.depth = DIFFICULTY_MAP[difficultyName] ?? 4;
    this.currentPlayer = 1;
    this.gameOver = false;
    this.winner = null;
    this.tie = false;
    this.turnQueue = [1, 2];
  }

  get grid(): BoardState {
    return this.board.getState();
  }

  getScores(): [number, number] {
    const state = this.board.getState();
    return [getScore(1, state), getScore(2, state)];
  }

  applyMove(move: Move): void {
    if (this.gameOver) return;

    const playerId = this.currentPlayer;
    const trail = cellForPlayer(playerId, "t");
    const pos = cellForPlayer(playerId, "p");

    this.board.setCell(move.from, trail);
    this.board.setCell(move.to, pos);
  }

  getValidMoves(playerId: PlayerId): Position[] {
    const pos = this.findPlayerPosition(playerId);
    return generateHorseMoves(pos, this.board.getState());
  }

  findPlayerPosition(playerId: PlayerId): Position {
    const target = cellForPlayer(playerId, "p");
    const state = this.board.getState();
    for (let r = 0; r < state.length; r++) {
      for (let c = 0; c < state[0].length; c++) {
        if (state[r][c] === target) {
          return { row: r, col: c };
        }
      }
    }
    throw new Error(`Player ${playerId} position not found`);
  }

  private canPlayerMove(playerId: PlayerId): boolean {
    try {
      const pos = this.findPlayerPosition(playerId);
      return canMoveFrom(pos, this.board.getState());
    } catch {
      return false;
    }
  }

  advanceTurn(): void {
    if (this.gameOver) return;

    const previousPlayer = this.turnQueue.shift()!;

    if (this.canPlayerMove(previousPlayer)) {
      this.turnQueue.push(previousPlayer);
    }

    if (this.turnQueue.length === 0) {
      this.gameOver = true;
      const [s1, s2] = this.getScores();
      if (s1 > s2) {
        this.winner = 1;
      } else if (s2 > s1) {
        this.winner = 2;
      } else {
        this.tie = true;
      }
      return;
    }

    this.currentPlayer = this.turnQueue[0];

    if (!this.canPlayerMove(this.currentPlayer)) {
      this.advanceTurn();
    }
  }

  getAIMove(): Move | null {
    return mejorJugada(this.board.getState(), this.currentPlayer, this.depth);
  }
}