import { describe, it, expect } from "vitest";
import { Board } from "./board";
import {
  Problema,
  Nodo,
  Heuristica,
  minimax,
  mejorJugada,
} from "./minimax";

describe("Problema", () => {
  it("finds player and opponent positions", () => {
    const board = new Board(7, 5);
    board.setupPlayers({ row: 0, col: 0 }, { row: 6, col: 4 });
    const p = new Problema(board.getState(), 1);
    expect(p.playerPos).toEqual({ row: 0, col: 0 });
    expect(p.opponentPos).toEqual({ row: 6, col: 4 });
  });

  it("computes valid moves for both players", () => {
    const board = new Board(7, 5);
    board.setupPlayers({ row: 0, col: 0 }, { row: 6, col: 4 });
    const p = new Problema(board.getState(), 1);
    expect(p.playerMoves.length).toBe(2);
    expect(p.opponentMoves.length).toBe(2);
    expect(p.playerMoves).toContainEqual({ row: 1, col: 2 });
    expect(p.opponentMoves).toContainEqual({ row: 5, col: 2 });
  });

  it("throws if player not found", () => {
    const board = new Board(7, 5);
    expect(() => new Problema(board.getState(), 1)).toThrow("Player 1 not found");
  });
});

describe("Nodo", () => {
  it("expandir generates children with correct board state", () => {
    const board = new Board(7, 5);
    board.setupPlayers({ row: 0, col: 0 }, { row: 6, col: 4 });
    const p = new Problema(board.getState(), 1);
    const root = new Nodo(p);
    const children = root.expandir(1);

    expect(children.length).toBe(2);
    for (const child of children) {
      expect(child.profundidad).toBe(1);
      expect(child.padre).toBe(root);
      // Origin should be trail, destination should be position
      const originCell = child.problema.board[0][0];
      const destCell = child.problema.board[child.problema.playerPos.row][child.problema.playerPos.col];
      expect(originCell).toBe("t1");
      expect(child.problema.playerId).toBe(1);
      // The new position should be a valid horse move destination
      expect(
        child.problema.playerPos.row === 1 && child.problema.playerPos.col === 2 ||
        child.problema.playerPos.row === 2 && child.problema.playerPos.col === 1
      ).toBe(true);
    }
  });
});

describe("Heuristica", () => {
  it("computes heuristic value for a state", () => {
    const board = new Board(7, 5);
    board.setupPlayers({ row: 0, col: 0 }, { row: 6, col: 4 });
    const p = new Problema(board.getState(), 1);
    const h = new Heuristica(p);
    const val = h.getHeuristica();
    expect(typeof val).toBe("number");
    // Both have 2 moves, center penalties different
    // a*2 - b*2 + c*(-3-2) - d*(-3-2) = 2 - 3 + 0.5*(-5) - 0.5*(-5) = -1
    expect(val).toBeCloseTo(-1.0);
  });
});

describe("minimax", () => {
  it("returns heuristic at leaf node", () => {
    const board = new Board(7, 5);
    board.setupPlayers({ row: 0, col: 0 }, { row: 6, col: 4 });
    const p = new Problema(board.getState(), 1);
    const root = new Nodo(p);
    const val = minimax(root, 0, true);
    expect(typeof val).toBe("number");
  });

  it("searches to depth and returns a value", () => {
    const board = new Board(7, 5);
    board.setupPlayers({ row: 0, col: 0 }, { row: 6, col: 4 });
    const p = new Problema(board.getState(), 1);
    const root = new Nodo(p);
    const val = minimax(root, 2, true);
    expect(typeof val).toBe("number");
  });
});

describe("mejorJugada", () => {
  it("returns a valid move for player 1", () => {
    const board = new Board(7, 5);
    board.setupPlayers({ row: 0, col: 0 }, { row: 6, col: 4 });
    const move = mejorJugada(board.getState(), 1, 2);
    expect(move).not.toBeNull();
    expect(move!.from).toEqual({ row: 0, col: 0 });
    expect(
      (move!.to.row === 1 && move!.to.col === 2) ||
      (move!.to.row === 2 && move!.to.col === 1)
    ).toBe(true);
  });

  it("returns a valid move for player 2", () => {
    const board = new Board(7, 5);
    board.setupPlayers({ row: 0, col: 0 }, { row: 6, col: 4 });
    const move = mejorJugada(board.getState(), 2, 2);
    expect(move).not.toBeNull();
    expect(move!.from).toEqual({ row: 6, col: 4 });
    expect(
      (move!.to.row === 5 && move!.to.col === 2) ||
      (move!.to.row === 4 && move!.to.col === 3)
    ).toBe(true);
  });
});