"use client";

import { useState, useMemo, useCallback } from "react";
import { Board } from "@/lib/game/board";
import { type Position, type CellState } from "@/lib/game/types";
import { generateHorseMoves, isValidMove } from "@/lib/game/moves";

const PLAYER_CELLS: CellState[] = ["p1", "p2"];

function isPlayerCell(state: CellState): boolean {
  return (PLAYER_CELLS as CellState[]).includes(state);
}

function playerIdFromCell(state: CellState): number {
  return Number(state[1]);
}

function trailForCell(state: CellState): CellState {
  return `t${playerIdFromCell(state)}` as CellState;
}

const P1_POS: Position = { row: 0, col: 0 };
const P2_POS: Position = { row: 6, col: 4 };

export function useGameBoard() {
  const [board] = useState(() => {
    const b = new Board(7, 5);
    b.setupPlayers(P1_POS, P2_POS);
    return b;
  });
  const [grid, setGrid] = useState(() => board.getState());
  const [selectedPos, setSelectedPos] = useState<Position | null>(null);

  const validMoves = useMemo(() => {
    if (!selectedPos) return [];
    return generateHorseMoves(selectedPos, grid);
  }, [selectedPos, grid]);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      const clickedState = grid[row][col];

      // Click on a player piece → select it
      if (isPlayerCell(clickedState)) {
        setSelectedPos({ row, col });
        return;
      }

      // Click on a valid destination → move
      if (
        selectedPos &&
        isValidMove(selectedPos, { row, col }, grid)
      ) {
        const newGrid = grid.map((r) => [...r]);
        const cellState = grid[selectedPos.row][selectedPos.col];
        const trail = trailForCell(cellState);
        newGrid[selectedPos.row][selectedPos.col] = trail;
        newGrid[row][col] = cellState;
        setGrid(newGrid);
        setSelectedPos(null);
        return;
      }

      // Click on empty non-highlighted → deselect
      if (selectedPos) {
        setSelectedPos(null);
      }
    },
    [grid, selectedPos]
  );

  return { grid, selectedPos, validMoves, handleCellClick };
}