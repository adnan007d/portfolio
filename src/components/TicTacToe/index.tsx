"use client";

import { useState } from "react";
import { type Board, type MoveResult, makePlayerMove, resetGame } from "./tictactoe";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";

function generateResultMessage(winner: MoveResult["winner"]): string {
  let result = "";

  switch (winner) {
    case "neovim": {
      result = "VSCode cannot win against NeoVim";
      break;
    }
    case "vscode": {
      result = "What how??? VSCode won!! what did you do";
      break;
    }
    case "tie": {
      result = "Its a tie";
      break;
    }
    default: {
      result = "How can you end up over here";
      break;
    }
  }

  return result;
}

const TicTacToe = () => {
  const [board, setBoard] = useState<Board>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const { toast } = useToast();

  function doPlayerMove(i: number, j: number) {
    const result = makePlayerMove(board, i, j);

    // Game is ongoing
    if (!result) {
      return;
    }

    setBoard([...result.board]);
    if (result.gameStatus === "over") {
      toast({
        title: "Result",
        description: generateResultMessage(result.winner),
        className: "bg-[#111]",
        action: <ToastAction altText="Close Button">Close</ToastAction>,
      });
    }
  }

  function onReset() {
    setBoard((board) => board.map((row) => row.map(() => null)) as Board);
    resetGame();
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-2 font-semibold">
        <Image width={20} height={20} src="/nvim.png" alt="neovim logo" />
        <span> Neovim </span>
        <span className="font-normal">VS</span>
        <Image width={20} height={20} src="/vscode.png" alt="vscode logo" />
        <span> VSCode </span>
      </div>
      <p className="mb-2">Can VSCode win?</p>
      <div className="grid grid-cols-3 grid-rows-3 aspect-square max-w-[400px] w-11/12 mx-auto">
        {board.map((row, i) =>
          row.map((col, j) => (
            <div
              key={`${i}${j}`}
              className="relative border-2 h-full w-full border-white grid place-items-center"
              onClick={() => doPlayerMove(i, j)}
            >
              {col ? (
                <Image
                  fill
                  priority
                  sizes="128px"
                  loading={"eager"}
                  className="object-contain"
                  src={col === "vscode" ? "/vscode.png" : "/nvim.png"}
                  alt={`${col} cell`}
                />
              ) : null}
            </div>
          ))
        )}
      </div>

      <div className="my-2">
        <Button
          onClick={onReset}
          className="text-base font-semibold bg-secondary text-secondary-foreground focus:bg-secondary hover:bg-secondary/90"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default TicTacToe;
