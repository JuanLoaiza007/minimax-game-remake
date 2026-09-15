import { describe, it, expect } from "vitest";
import { GameEngine } from "./engine";
import { Board } from "./board";
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

  it("switchTurn alternates player", () => {
    const engine = new GameEngine("Amateur");
    engine.applyMove({ from: { row: 0, col: 0 }, to: { row: 1, col: 2 } });
    engine.switchTurn();
    expect(engine.currentPlayer).toBe(2);
    expect(engine.gameOver).toBe(false);
  });

  it("continues game when only one player is blocked", () => {
    const engine = new GameEngine("Amateur");
    engine.applyMove({ from: { row: 0, col: 0 }, to: { row: 1, col: 2 } });
    // Block player 2's moves from (6,4): (5,2) and (4,3)
    engine.board.setCell({ row: 5, col: 2 }, "t1");
    engine.board.setCell({ row: 4, col: 3 }, "t1");
    engine.switchTurn();
    expect(engine.gameOver).toBe(false);
    expect(engine.currentPlayer).toBe(1);
    expect(engine.blocked).toEqual([2]);
  });

  it("ends game only when both players are blocked via checkGameEnd", () => {
    const engine = new GameEngine("Amateur");
    engine.applyMove({ from: { row: 0, col: 0 }, to: { row: 1, col: 2 } });
    // Block player 2's moves from (6,4): (5,2) and (4,3)
    engine.board.setCell({ row: 5, col: 2 }, "t1");
    engine.board.setCell({ row: 4, col: 3 }, "t1");
    engine.switchTurn();
    expect(engine.gameOver).toBe(false);

    // Block all of player 1's moves from (1,2): (3,3), (3,1), (2,4), (2,0), (0,4)
    engine.board.setCell({ row: 3, col: 3 }, "t2");
    engine.board.setCell({ row: 3, col: 1 }, "t2");
    engine.board.setCell({ row: 2, col: 4 }, "t2");
    engine.board.setCell({ row: 2, col: 0 }, "t2");
    engine.board.setCell({ row: 0, col: 4 }, "t2");

    const ended = engine.checkGameEnd();
    expect(ended).toBe(true);
    expect(engine.gameOver).toBe(true);
  });

  it("checkGameEnd returns false when a player can still move", () => {
    const engine = new GameEngine("Amateur");
    engine.applyMove({ from: { row: 0, col: 0 }, to: { row: 1, col: 2 } });
    const ended = engine.checkGameEnd();
    expect(ended).toBe(false);
    expect(engine.gameOver).toBe(false);
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