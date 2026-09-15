export type CellState =
  | "0"    // empty
  | "p1"   // player 1 position
  | "p2"   // player 2 position
  | "t1"   // player 1 trail
  | "t2";  // player 2 trail

export type PlayerId = 1 | 2;

export interface Player {
  id: PlayerId;
  label: string;
}

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  from: Position;
  to: Position;
}

export type BoardState = CellState[][];