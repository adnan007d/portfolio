"use client";

import { useState } from "react";
import { Board, makePlayerMove } from "./tictactoe";
import Image from "next/image";

const TicTacToe = () => {
  const [board, setBoard] = useState<Board>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);


  function doPlayerMove(i: number, j: number) {
      // I Hate this why do I have to make a copy to force a re render
      // Maybe add another state to force a re render
      setBoard([...makePlayerMove(board, i, j)]);
  }

  return (
    <div>
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
