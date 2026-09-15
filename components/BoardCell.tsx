"use client";

import { type CellState } from "@/lib/game/types";

interface BoardCellProps {
  state: CellState;
  isSelected: boolean;
  isValidMove: boolean;
  onClick: () => void;
}

function Player1Icon() {
  return (
    <svg viewBox="0 0 50 50" className="w-3/5 h-3/5">
      <path
        d="M25 3L31 18L48 18L34 29L39 45L25 35L11 45L16 29L2 18L19 18Z"
        fill="#10b981"
        stroke="#059669"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function Player2Icon() {
  return (
    <svg viewBox="0 0 50 50" className="w-3/5 h-3/5">
      <rect
        x="5"
        y="5"
        width="40"
        height="40"
        rx="6"
        ry="6"
        fill="#f43f5e"
        stroke="#e11d48"
        strokeWidth="1.5"
        transform="rotate(45 25 25)"
      />
    </svg>
  );
}

function Trail1Icon() {
  return (
    <svg viewBox="0 0 50 50" className="w-1/3 h-1/3">
      <path
        d="M25 3L31 18L48 18L34 29L39 45L25 35L11 45L16 29L2 18L19 18Z"
        fill="#10b981"
        opacity="0.45"
      />
    </svg>
  );
}

function Trail2Icon() {
  return (
    <svg viewBox="0 0 50 50" className="w-1/3 h-1/3">
      <rect
        x="5"
        y="5"
        width="40"
        height="40"
        rx="6"
        ry="6"
        fill="#f43f5e"
        opacity="0.45"
        transform="rotate(45 25 25)"
      />
    </svg>
  );
}

export function BoardCell({ state, isSelected, isValidMove, onClick }: BoardCellProps) {
  const isOccupied = state === "p1" || state === "p2";
  const isTrail = state === "t1" || state === "t2";

  let ring = "";
  if (isSelected) ring = "ring-2 ring-blue-400 ring-offset-2";
  else if (isValidMove) ring = "ring-2 ring-yellow-400 ring-offset-1";

  const bg = isTrail ? "bg-emerald-50" : "bg-white";
  const cursor = isOccupied || isValidMove ? "cursor-pointer" : "cursor-default";

  return (
    <button
      className={`aspect-square border border-gray-300 rounded-md flex items-center justify-center ${bg} ${ring} ${cursor} transition-all`}
      onClick={onClick}
      aria-label={`Cell ${state}`}
    >
      {state === "p1" && <Player1Icon />}
      {state === "p2" && <Player2Icon />}
      {state === "t1" && <Trail1Icon />}
      {state === "t2" && <Trail2Icon />}
    </button>
  );
}