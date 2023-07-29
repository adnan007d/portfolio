"use client";

import { useState } from "react";
import { Board, makePlayerMove } from "./tictactoe";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

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
      toast({ title: "Result", description: `Game Status ${result.winner}` });
    }
  }

  return (
    <div>
      <Toaster />
      <div className="grid grid-cols-3 grid-rows-3 aspect-square max-w-[400px] w-11/12 mx-auto">
        {board.map((row, i) =>
          row.map((col, j) => (
            <div
              key={`${i}${j}`}
              className="border-2 h-full w-full border-white grid place-items-center"
              onClick={() => doPlayerMove(i, j)}
            >
              {col ? (
                <Image
                  width={100}
                  height={100}
                  src={col === "vscode" ? "/vscode.png" : "/nvim.png"}
                  alt={`${col} cell`}
                />
              ) : null}
            </div>
          ))
        )}
      </div>

      <div>
        <button>reset</button>
        <span>Status line</span>
      </div>
    </div>
  );
};

export default TicTacToe;
