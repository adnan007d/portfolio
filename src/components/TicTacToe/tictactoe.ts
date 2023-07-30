export type Player = "vscode" | "neovim";
export type BoardCell = Player | null;
export type Board = [
  [BoardCell, BoardCell, BoardCell],
  [BoardCell, BoardCell, BoardCell],
  [BoardCell, BoardCell, BoardCell],
];

type GameStatus = "ongoing" | "over";

export type MoveResult = {
  board: Board;
  gameStatus: GameStatus | null;
  winner: Player | null | "tie";
};
/**
 * This to keep track of winner will try to remove it;
 */
let globalWinner: MoveResult["winner"] = null;

export function makePlayerMove(
  board: Board,
  i: number,
  j: number
): MoveResult | null {
  if (board[i][j] !== null || globalWinner) {
    return null;
  }

  board[i][j] = "vscode";
  let winnerOrDraw = checkWinner(board);
  globalWinner = winnerOrDraw;

  // Either we have a winner or its a draw
  if (winnerOrDraw) {
    return { board, gameStatus: "over", winner: winnerOrDraw };
  }

  neovimMove(board);
  winnerOrDraw = checkWinner(board);
  globalWinner = winnerOrDraw;

  if (winnerOrDraw) {
    return { board, gameStatus: "over", winner: winnerOrDraw };
  }

  return { board, gameStatus: "ongoing", winner: null };
}

export function resetGame() {
  globalWinner = null;
}

function neovimMove(board: Board): void {
  let bestScore = -Infinity;
  const bestMove = { row: 0, col: 0 };

  for (let row = 0; row < 3; ++row) {
    for (let col = 0; col < 3; ++col) {
      if (board[row][col] === null) {
        board[row][col] = "neovim";
        const score = minimax(board, 1, false);
        board[row][col] = null;

        if (score > bestScore) {
          bestScore = score;
          bestMove.row = row;
          bestMove.col = col;
        }
      }
    }
  }

  board[bestMove.row][bestMove.col] = "neovim";
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

const scores = { vscode: -1, neovim: 1, tie: 0 };

function minimax(
  board: Board,
  depth: number,
  isMaximizingPlayer: boolean
): number {
  const winner = checkWinner(board);

  if (winner) {
    return scores[winner];
  }

  let bestScore = isMaximizingPlayer ? -Infinity : Infinity;
  const player = isMaximizingPlayer ? "neovim" : "vscode";

  for (let row = 0; row < 3; ++row) {
    for (let col = 0; col < 3; ++col) {
      if (board[row][col] === null) {
        board[row][col] = player;
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
