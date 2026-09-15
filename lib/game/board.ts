import { type CellState, type Position, type BoardState } from "./types";

export class Board {
  readonly rows: number;
  readonly cols: number;
  private grid: CellState[][];

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => "0" as CellState)
    );
  }

  getCell(pos: Position): CellState {
    return this.grid[pos.row][pos.col];
  }

  setCell(pos: Position, state: CellState): void {
    this.grid[pos.row][pos.col] = state;
  }

  clone(): Board {
    const b = new Board(this.rows, this.cols);
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        b.grid[r][c] = this.grid[r][c];
      }
    }
    return b;
  }

  getState(): BoardState {
    return this.grid.map((row) => [...row]);
  }

  setupPlayers(p1Pos: Position, p2Pos: Position): void {
    this.setCell(p1Pos, "p1");
    this.setCell(p2Pos, "p2");
  }
}