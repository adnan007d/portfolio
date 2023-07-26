"use client";

import { useState } from "react";

const TicTacToe = () => {
  const [board, _setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  return (
    <div>
      <div className="grid grid-cols-3 grid-rows-3 aspect-square max-w-[400px] w-11/12 mx-auto">
        {board.map((row) =>
          row.map((_) => (
            <div className="border-2 h-full  w-full border-white"></div>
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
