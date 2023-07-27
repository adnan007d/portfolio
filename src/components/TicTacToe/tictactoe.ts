import { Mate } from "next/font/google";
import { deprecate } from "util";

export type Player = "vscode" | "neovim";
export type BoardCell = Player | null;
export type Board = [
  [BoardCell, BoardCell, BoardCell],
  [BoardCell, BoardCell, BoardCell],
  [BoardCell, BoardCell, BoardCell],
];

type GameStatus = "ongoing" | "over";

type MoveResult = {
  board: Board;
  gameStatus: GameStatus | null;
  winner: Player | null | "tie";
};

// let gameStatus: MoveResult["gameStatus"] = "ongoing";
// let winStatus:  MoveResult["winStatus"] = null

export function makePlayerMove(board: Board, i: number, j: number): MoveResult {
  if (board[i][j] !== null) {
    return { board, gameStatus: null, winner: null };
  }

  board[i][j] = "vscode";
  const winnerOrDraw = checkWinner(board);

  // Either we have a winner or its a draw
  if (winnerOrDraw) {
    return { board, gameStatus: "over", winner: winnerOrDraw };
  }

  // TODO: Computer Move
  return { board, gameStatus: "ongoing", winner: null };
}

function NeovimMove(board: Board): void {
  let bestScore = -Infinity;
  let bestMove: { x: number; y: number };

  for (let row = 0; row < 3; ++row) {
    for (let col = 0; col < 3; ++col) {
      if (board[row][col] !== null) {
        board[row][col] = "neovim";
        const score = minimax(board, 1, false);
      }
    }
  }
}

export function checkWinner(board: Board): Player | null | "tie" {
  for (let row = 0; row < 3; ++row) {
    if (
      board[row][0] !== null &&
      board[row][0] === board[row][1] &&
      board[row][1] === board[row][2]
    ) {
      return board[row][0];
    }
  }

  for (let col = 0; col < 3; ++col) {
    if (
      board[0][col] !== null &&
      board[0][col] === board[1][col] &&
      board[1][col] === board[2][col]
    ) {
      return board[0][col];
    }
  }

  // Diagnols
  if (
    board[0][0] !== null &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return board[0][0];
  }

  if (
    board[0][2] !== null &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return board[0][2];
  }

  return isDraw(board) ? "tie" : null;
}

function isDraw(board: Board): boolean {
  return board.every((row) => row.every((cell) => cell !== null));
}

type IScores = { vscode: number; neovim: number; tie: number };

function minimax(
  board: Board,
  depth: number,
  isMaximizingPlayer: boolean,
  scores: IScores = { vscode: -1, neovim: 1, tie: 0 }
): number {
  const winner = checkWinner(board);

  if (winner && winner != "vscode") {
    return scores[winner];
  }

  // if (isMaximizingPlayer) {
  //   let bestScore = -Infinity;
  //   for (let row = 0; row < 3; ++row) {
  //     for (let col = 0; col < 3; ++col) {
  //       if (board[row][col] === null) {
  //         board[row][col] = "neovim";
  //         const score = minimax(board, depth + 1, false, scores);
  //         board[row][col] = null;
  //
  //         bestScore = Math.max(score, bestScore);
  //       }
  //     }
  //   }
  //   return bestScore;
  // }
  let bestScore = isMaximizingPlayer ? -Infinity : Infinity;

  for (let row = 0; row < 3; ++row) {
    for (let col = 0; col < 3; ++col) {
      if (board[row][col] === null) {
        board[row][col] = isMaximizingPlayer ? "neovim" : "vscode";
        const score = minimax(board, depth + 1, !isMaximizingPlayer);
        board[row][col] = null;
        bestScore = isMaximizingPlayer
          ? Math.max(score, bestScore)
          : Math.min(score, bestScore);
      }
    }
  }
  return bestScore;
}
