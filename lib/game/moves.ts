import { type Position, type BoardState } from "./types";

export function generateHorseMoves(
  pos: Position,
  board: BoardState
): Position[] {
  const rows = board.length;
  const cols = board[0].length;
  const offsets: [number, number][] = [
    [2, 1], [-2, 1], [2, -1], [-2, -1],
    [1, 2], [-1, 2], [1, -2], [-1, -2],
  ];
  const moves: Position[] = [];
  for (const [dr, dc] of offsets) {
    const nr = pos.row + dr;
    const nc = pos.col + dc;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && isFreePosition({ row: nr, col: nc }, board)) {
      moves.push({ row: nr, col: nc });
    }
  }
  return moves;
}

export function isFreePosition(pos: Position, board: BoardState): boolean {
  return board[pos.row][pos.col] === "0";
}

export function isValidMove(from: Position, to: Position, board: BoardState): boolean {
  return generateHorseMoves(from, board).some(
    (m) => m.row === to.row && m.col === to.col
  );
}

export function canMoveFrom(pos: Position, board: BoardState): boolean {
  return generateHorseMoves(pos, board).length > 0;
}