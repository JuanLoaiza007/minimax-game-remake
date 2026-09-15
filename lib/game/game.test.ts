import { describe, it, expect } from "vitest";
import { Board } from "./board";
import {
  generateHorseMoves,
  isValidMove,
  isFreePosition,
  canMoveFrom,
} from "./moves";

describe("Board", () => {
  it("creates an empty board with correct dimensions", () => {
    const board = new Board(7, 5);
    expect(board.rows).toBe(7);
    expect(board.cols).toBe(5);
    const state = board.getState();
    expect(state.length).toBe(7);
    expect(state[0].length).toBe(5);
    for (const row of state) {
      for (const cell of row) {
        expect(cell).toBe("0");
      }
    }
  });

  it("getCell and setCell work correctly", () => {
    const board = new Board(7, 5);
    board.setCell({ row: 2, col: 3 }, "p1");
    expect(board.getCell({ row: 2, col: 3 })).toBe("p1");
  });

  it("clone produces independent copies", () => {
    const board = new Board(7, 5);
    board.setupPlayers({ row: 0, col: 0 }, { row: 6, col: 4 });
    const clone = board.clone();
    clone.setCell({ row: 0, col: 0 }, "0");
    expect(board.getCell({ row: 0, col: 0 })).toBe("p1");
    expect(clone.getCell({ row: 0, col: 0 })).toBe("0");
  });

  it("setupPlayers places pieces at fixed positions", () => {
    const board = new Board(7, 5);
    board.setupPlayers({ row: 0, col: 0 }, { row: 6, col: 4 });
    expect(board.getCell({ row: 0, col: 0 })).toBe("p1");
    expect(board.getCell({ row: 6, col: 4 })).toBe("p2");
  });
});

describe("moves", () => {
  it("generateHorseMoves from center gives 8 moves", () => {
    const board = new Board(7, 5);
    board.setupPlayers({ row: 0, col: 0 }, { row: 6, col: 4 });
    const state = board.getState();
    const moves = generateHorseMoves({ row: 3, col: 2 }, state);
    expect(moves).toHaveLength(8);
    expect(moves).toContainEqual({ row: 1, col: 1 });
    expect(moves).toContainEqual({ row: 1, col: 3 });
    expect(moves).toContainEqual({ row: 5, col: 1 });
    expect(moves).toContainEqual({ row: 5, col: 3 });
    expect(moves).toContainEqual({ row: 2, col: 0 });
    expect(moves).toContainEqual({ row: 2, col: 4 });
    expect(moves).toContainEqual({ row: 4, col: 0 });
    expect(moves).toContainEqual({ row: 4, col: 4 });
  });

  it("generateHorseMoves from corner gives 2 moves", () => {
    const board = new Board(7, 5);
    const state = board.getState();
    const moves = generateHorseMoves({ row: 0, col: 0 }, state);
    expect(moves).toHaveLength(2);
    expect(moves).toContainEqual({ row: 1, col: 2 });
    expect(moves).toContainEqual({ row: 2, col: 1 });
  });

  it("skips occupied destinations", () => {
    const board = new Board(7, 5);
    board.setCell({ row: 1, col: 2 }, "p1");
    board.setCell({ row: 2, col: 1 }, "p2");
    const state = board.getState();
    const moves = generateHorseMoves({ row: 0, col: 0 }, state);
    expect(moves).toHaveLength(0);
  });

  it("isFreePosition returns true for empty", () => {
    const board = new Board(7, 5);
    expect(isFreePosition({ row: 3, col: 2 }, board.getState())).toBe(true);
  });

  it("isFreePosition returns false for occupied", () => {
    const board = new Board(7, 5);
    board.setCell({ row: 3, col: 2 }, "p1");
    expect(isFreePosition({ row: 3, col: 2 }, board.getState())).toBe(false);
  });

  it("isValidMove returns true for legal move", () => {
    const board = new Board(7, 5);
    expect(isValidMove({ row: 0, col: 0 }, { row: 1, col: 2 }, board.getState())).toBe(true);
  });

  it("isValidMove returns false for illegal move", () => {
    const board = new Board(7, 5);
    expect(isValidMove({ row: 0, col: 0 }, { row: 0, col: 1 }, board.getState())).toBe(false);
  });

  it("canMoveFrom returns true when moves available", () => {
    const board = new Board(7, 5);
    expect(canMoveFrom({ row: 0, col: 0 }, board.getState())).toBe(true);
  });

  it("canMoveFrom returns false when no moves", () => {
    const board = new Board(7, 5);
    board.setCell({ row: 1, col: 2 }, "p1");
    board.setCell({ row: 2, col: 1 }, "t1");
    expect(canMoveFrom({ row: 0, col: 0 }, board.getState())).toBe(false);
  });
});

// Verify Node compatibility — these modules import without DOM dependencies
it("model modules can be imported in Node (no DOM required)", () => {
  expect(Board).toBeDefined();
  expect(generateHorseMoves).toBeDefined();
});