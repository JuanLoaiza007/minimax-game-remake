import { describe, it, expect } from "vitest";
import { GameEngine } from "./engine";
import { type Move } from "./types";

describe("GameEngine", () => {
  it("creates engine with correct initial state", () => {
    const engine = new GameEngine("Amateur");
    expect(engine.currentPlayer).toBe(1);
    expect(engine.gameOver).toBe(false);
    expect(engine.winner).toBeNull();
    expect(engine.tie).toBe(false);
    expect(engine.depth).toBe(4);
    expect(engine.difficultyName).toBe("Amateur");
    expect(engine.turnQueue).toEqual([1, 2]);
    const [s1, s2] = engine.getScores();
    expect(s1).toBe(1);
    expect(s2).toBe(1);
  });

  it("maps difficulty names correctly", () => {
    expect(new GameEngine("Principiante").depth).toBe(2);
    expect(new GameEngine("Amateur").depth).toBe(4);
    expect(new GameEngine("Experto").depth).toBe(6);
  });

  it("applyMove sets trail on origin and position on destination", () => {
    const engine = new GameEngine("Amateur");
    const move: Move = { from: { row: 0, col: 0 }, to: { row: 1, col: 2 } };
    engine.applyMove(move);
    expect(engine.board.getCell({ row: 0, col: 0 })).toBe("t1");
    expect(engine.board.getCell({ row: 1, col: 2 })).toBe("p1");
  });

  it("applyMove increments score", () => {
    const engine = new GameEngine("Amateur");
    const move: Move = { from: { row: 0, col: 0 }, to: { row: 1, col: 2 } };
    engine.applyMove(move);
    const [s1] = engine.getScores();
    expect(s1).toBe(2);
  });

  it("advanceTurn cycles to next player in queue", () => {
    const engine = new GameEngine("Amateur");
    engine.applyMove({ from: { row: 0, col: 0 }, to: { row: 1, col: 2 } });
    engine.advanceTurn();
    expect(engine.currentPlayer).toBe(2);
    expect(engine.gameOver).toBe(false);
    expect(engine.turnQueue).toEqual([2, 1]);
  });

  it("advanceTurn ejects blocked player and lets the other continue", () => {
    const engine = new GameEngine("Amateur");
    engine.applyMove({ from: { row: 0, col: 0 }, to: { row: 1, col: 2 } });
    // Block player 2's moves from (6,4): (5,2) and (4,3)
    engine.board.setCell({ row: 5, col: 2 }, "t1");
    engine.board.setCell({ row: 4, col: 3 }, "t1");
    engine.advanceTurn();
    // Player 2 is blocked → ejected. Player 1 goes again.
    expect(engine.gameOver).toBe(false);
    expect(engine.currentPlayer).toBe(1);
    expect(engine.turnQueue).toEqual([1]);
  });

  it("advanceTurn ends game when both players are ejected from queue", () => {
    const engine = new GameEngine("Amateur");
    engine.applyMove({ from: { row: 0, col: 0 }, to: { row: 1, col: 2 } });
    // Block player 2 from (6,4)
    engine.board.setCell({ row: 5, col: 2 }, "t1");
    engine.board.setCell({ row: 4, col: 3 }, "t1");
    engine.advanceTurn();
    expect(engine.currentPlayer).toBe(1);
    // Block player 1 at (1,2): (3,3), (3,1), (2,4), (2,0), (0,4)
    engine.board.setCell({ row: 3, col: 3 }, "t2");
    engine.board.setCell({ row: 3, col: 1 }, "t2");
    engine.board.setCell({ row: 2, col: 4 }, "t2");
    engine.board.setCell({ row: 2, col: 0 }, "t2");
    engine.board.setCell({ row: 0, col: 4 }, "t2");
    // advanceTurn shifts player 1 — blocked → ejected → queue empty
    engine.advanceTurn();
    expect(engine.gameOver).toBe(true);
  });

  it("getAIMove returns a valid move", () => {
    const engine = new GameEngine("Amateur");
    const move = engine.getAIMove();
    expect(move).not.toBeNull();
    expect(move!.from).toEqual({ row: 0, col: 0 });
  });

  it("getAIMove returns a valid move from player position", () => {
    const engine = new GameEngine("Amateur");
    const move = engine.getAIMove();
    expect(move).not.toBeNull();
    expect(move!.from).toEqual({ row: 0, col: 0 });
    const validMoves = engine.getValidMoves(1);
    const isValid = validMoves.some((m) => m.row === move!.to.row && m.col === move!.to.col);
    expect(isValid).toBe(true);
  });
});