"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { type Position, type CellState, type Move } from "@/lib/game/types";
import { isValidMove } from "@/lib/game/moves";
import { GameEngine } from "@/lib/game/engine";

export interface GameState {
  grid: CellState[][];
  scores: [number, number];
  currentPlayer: number;
  selectedPos: Position | null;
  validMoves: Position[];
  isThinking: boolean;
  gameOver: boolean;
  winner: number | null;
  tie: boolean;
  resultVisible: boolean;
}

export function useGameEngine(difficultyName: string) {
  const engineRef = useRef<GameEngine | null>(null);
  const selectedPosRef = useRef<Position | null>(null);
  const aiBusyRef = useRef(false);

  const initEngine = useCallback(() => {
    const engine = new GameEngine(difficultyName);
    engineRef.current = engine;
    return engine;
  }, [difficultyName]);

  const getState = useCallback(
    (overrides?: Partial<GameState>): GameState => {
      const engine = engineRef.current!;
      const sel = selectedPosRef.current;
      const moves = sel ? engine.getValidMoves(engine.currentPlayer) : [];
      return {
        grid: engine.grid,
        scores: engine.getScores(),
        currentPlayer: engine.currentPlayer,
        selectedPos: sel,
        validMoves: moves,
        isThinking: false,
        gameOver: engine.gameOver,
        winner: engine.winner,
        tie: engine.tie,
        resultVisible: false,
        ...overrides,
      };
    },
    []
  );

  const [state, setState] = useState<GameState>(() => {
    const engine = initEngine();
    return getState();
  });

  const runAITurn = useCallback(() => {
    if (aiBusyRef.current) return;
    aiBusyRef.current = true;

    const engine = engineRef.current!;
    selectedPosRef.current = null;
    setState(getState({ isThinking: true }));

    setTimeout(() => {
      if (engine.gameOver) {
        selectedPosRef.current = null;
        aiBusyRef.current = false;
        setState(getState());
        return;
      }

      const aiMove = engine.getAIMove();
      if (aiMove) {
        engine.applyMove(aiMove);
      }
      engine.advanceTurn();

      if (engine.gameOver) {
        setState(getState({ isThinking: false }));
        setTimeout(() => {
          aiBusyRef.current = false;
          setState(getState({ resultVisible: true }));
        }, 2000);
      } else {
        aiBusyRef.current = false;
        setState(getState({ isThinking: false }));
      }
    }, 500);
  }, [getState]);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      const engine = engineRef.current;
      if (!engine || engine.gameOver || engine.currentPlayer !== 1) return;

      const clickedState = engine.grid[row][col];
      const clickedPos: Position = { row, col };
      const selected = selectedPosRef.current;

      if (clickedState === "p1") {
        const moves = engine.getValidMoves(1);
        if (moves.length === 0) {
          engine.advanceTurn();
          selectedPosRef.current = null;
          setState(getState());
          return;
        }
        selectedPosRef.current = clickedPos;
        setState(getState());
        return;
      }

      if (selected && clickedState === "0") {
        const from = engine.findPlayerPosition(1);
        if (isValidMove(from, clickedPos, engine.grid)) {
          const move: Move = { from, to: clickedPos };
          engine.applyMove(move);
          engine.advanceTurn();

          if (engine.gameOver) {
            selectedPosRef.current = null;
            setState(getState());
            return;
          }

          runAITurn();
          return;
        }
      }

      selectedPosRef.current = null;
      setState(getState());
    },
    [getState, runAITurn]
  );

  useEffect(() => {
    if (
      state.currentPlayer === 2 &&
      !state.gameOver &&
      !state.isThinking &&
      !aiBusyRef.current
    ) {
      runAITurn();
    }
  }, [state.currentPlayer, state.isThinking, state.gameOver, runAITurn]);

  const dismissResult = useCallback(() => {
    setState(getState({ resultVisible: false }));
  }, [getState]);

  const restart = useCallback(() => {
    initEngine();
    selectedPosRef.current = null;
    aiBusyRef.current = false;
    setState(getState());
  }, [initEngine, getState]);

  return { ...state, handleCellClick, dismissResult, restart };
}