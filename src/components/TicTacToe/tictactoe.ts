export type Player = "vscode" | "neovim";
export type BoardCell = Player | null;
export type Board = [
  [BoardCell, BoardCell, BoardCell],
  [BoardCell, BoardCell, BoardCell],
  [BoardCell, BoardCell, BoardCell],
];

export function makePlayerMove(board: Board, i: number, j: number): Board {
  if (board[i][j] !== null) {
    return board;
  }

  // TODO: Check Game Status

  board[i][j] = "vscode";

  // TODO: Computer Move

  return board;
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

    }
  }
  return 0;
}
