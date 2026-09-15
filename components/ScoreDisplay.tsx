"use client";

import { Card, CardContent } from "@/components/ui/card";

interface ScoreDisplayProps {
  scores: [number, number];
  currentPlayer: number;
}

export function ScoreDisplay({ scores, currentPlayer }: ScoreDisplayProps) {
  return (
    <Card size="sm" className="mb-4">
      <CardContent>
        <div className="flex gap-8 items-center justify-center">
          <div className={`text-center ${currentPlayer === 1 ? "font-bold" : ""}`}>
            <div className="text-xs text-muted-foreground">Tú (P1)</div>
            <div className="text-2xl text-emerald-500">{scores[0]}</div>
          </div>
          <div className="text-muted-foreground text-2xl">:</div>
          <div className={`text-center ${currentPlayer === 2 ? "font-bold" : ""}`}>
            <div className="text-xs text-muted-foreground">IA (P2)</div>
            <div className="text-2xl text-red-500">{scores[1]}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}