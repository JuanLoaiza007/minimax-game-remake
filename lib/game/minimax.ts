import { type Position, type BoardState, type Move, type PlayerId } from "./types";
import { generateHorseMoves } from "./moves";

export function searchCoords(playerId: PlayerId, board: BoardState): Position {
  const target = `p${playerId}` as const;
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      if (board[r][c] === target) {
        return { row: r, col: c };
      }
    }
  }
  throw new Error(`Player ${playerId} not found on board`);
}

function opponentId(playerId: PlayerId): PlayerId {
  return playerId === 1 ? 2 : 1;
}

export class Problema {
  readonly board: BoardState;
  readonly playerId: PlayerId;
  readonly playerPos: Position;
  readonly opponentPos: Position;
  readonly playerMoves: Position[];
  readonly opponentMoves: Position[];

  constructor(board: BoardState, playerId: PlayerId) {
    this.board = board;
    this.playerId = playerId;
    this.playerPos = searchCoords(playerId, board);
    this.opponentPos = searchCoords(opponentId(playerId), board);
    this.playerMoves = generateHorseMoves(this.playerPos, board);
    this.opponentMoves = generateHorseMoves(this.opponentPos, board);
  }
}

export class Nodo {
  readonly problema: Problema;
  padre: Nodo | null;
  profundidad: number;

  constructor(problema: Problema) {
    this.problema = problema;
    this.padre = null;
    this.profundidad = 0;
  }

  calcular_heuristica(): number {
    const heuristica = new Heuristica(this.problema);
    return heuristica.getHeuristica();
  }

  expandir(playerId: PlayerId): Nodo[] {
    const hijos: Nodo[] = [];
    const moves = playerId === this.problema.playerId
      ? this.problema.playerMoves
      : this.problema.opponentMoves;
    const currentPos = playerId === this.problema.playerId
      ? this.problema.playerPos
      : this.problema.opponentPos;

    const trailCell = `t${playerId}` as const;
    const posCell = `p${playerId}` as const;

    for (const move of moves) {
      const newBoard = this.problema.board.map((row) => [...row]);
      newBoard[currentPos.row][currentPos.col] = trailCell;
      newBoard[move.row][move.col] = posCell;
      const newProblema = new Problema(newBoard, this.problema.playerId);
      const hijo = new Nodo(newProblema);
      hijo.padre = this;
      hijo.profundidad = this.profundidad + 1;
      hijos.push(hijo);
    }

    return hijos;
  }
}

export class Heuristica {
  private problema: Problema;
  private n: number;
  private m: number;
  private numMovimientosPropios: number;
  private numMovimientosOponente: number;
  private centroPropio: number;
  private centroOponente: number;
  private heuristica: number;

  constructor(problema: Problema) {
    this.problema = problema;
    this.n = problema.board.length;
    this.m = problema.board[0].length;

    this.numMovimientosPropios = problema.playerMoves.length;
    this.numMovimientosOponente = problema.opponentMoves.length;

    this.centroPropio = this.controlCentro(problema.playerPos);
    this.centroOponente = this.controlCentro(problema.opponentPos);

    const a = 1.0;
    const b = 1.5;
    const c = 0.5;
    const d = 0.5;

    this.heuristica =
      a * this.numMovimientosPropios -
      b * this.numMovimientosOponente +
      c * this.centroPropio -
      d * this.centroOponente;
  }

  private controlCentro(pos: Position): number {
    const centroX = Math.floor(this.n / 2);
    const centroY = Math.floor(this.m / 2);
    return -Math.abs(pos.row - centroX) - Math.abs(pos.col - centroY);
  }

  getHeuristica(): number {
    return this.heuristica;
  }
}

export function minimax(
  nodo: Nodo,
  profundidad: number,
  maximizando: boolean,
  alpha: number = -Infinity,
  beta: number = Infinity
): number {
  const playerId = nodo.problema.playerId;
  const opponentId_ = opponentId(playerId);

  if (
    profundidad === 0 ||
    (nodo.problema.playerMoves.length === 0 && nodo.problema.opponentMoves.length === 0)
  ) {
    return nodo.calcular_heuristica();
  }

  if (maximizando) {
    let maxEval = -Infinity;
    for (const hijo of nodo.expandir(playerId)) {
      const eval_ = minimax(hijo, profundidad - 1, false, alpha, beta);
      maxEval = Math.max(maxEval, eval_);
      alpha = Math.max(alpha, eval_);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const hijo of nodo.expandir(opponentId_)) {
      const eval_ = minimax(hijo, profundidad - 1, true, alpha, beta);
      minEval = Math.min(minEval, eval_);
      beta = Math.min(beta, eval_);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

export function mejorJugada(
  board: BoardState,
  playerId: PlayerId,
  depth: number
): Move | null {
  const problemaInicial = new Problema(board, playerId);
  const nodoRaiz = new Nodo(problemaInicial);

  let mejorValor = -Infinity;
  let mejorMovimiento: Position | null = null;

  for (const hijo of nodoRaiz.expandir(playerId)) {
    const valor = minimax(hijo, depth - 1, false);
    if (valor > mejorValor) {
      mejorValor = valor;
      mejorMovimiento = hijo.problema.playerPos;
    }
  }

  if (!mejorMovimiento) return null;

  const from = problemaInicial.playerPos;
  return { from, to: mejorMovimiento };
}