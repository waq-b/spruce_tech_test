import React, { FC } from "react";
import { XorO } from "../types";
import { getPlayerLabel } from "../utils/utils";
import GameOver from "./GameOver";

type GameProps = {
  board: string[][];
  currentPlayer: XorO;
  handleClick: (row: number, col: number) => void;
  winner: XorO | null;
  isDraw: boolean;
  resetGame: () => void;
};

const Game: FC<GameProps> = ({
  board,
  currentPlayer,
  handleClick,
  winner,
  isDraw,
  resetGame,
}) => {
  const gameOver = winner || isDraw;
  return (
    <div className="relative flex flex-col items-center">
      <h2 className="text-lg sm:text-xl font-medium sm:font-semibold text-gray-700 mb-4">
        {!gameOver && `${getPlayerLabel(currentPlayer)}'s turn`}
      </h2>

      <div className="relative flex flex-col gap-2 p-4">
        {board.map((row, i) => (
          <div className="flex gap-2" key={i}>
            {row.map((cell, j) => {
              const isEmpty = !cell && !winner;

              return (
                <button
                  key={`${i}-${j}`}
                  onClick={() => handleClick(i, j)}
                  disabled={!!cell || !!winner}
                  className={`
        w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center 
        text-3xl font-bold border border-gray-700 rounded-md 
        transition-all duration-150 relative
        ${cell ? "text-gray-800" : "text-transparent"}
        ${isEmpty ? "hover:bg-gray-100" : ""}
        group
      `}
                >
                  {cell || (
                    <span
                      className={`
            absolute opacity-0 group-hover:opacity-40 text-gray-400 
            transition duration-150 pointer-events-none
          `}
                    >
                      {currentPlayer}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
        {gameOver && (
          <GameOver winner={winner} isDraw={isDraw} resetGame={resetGame} />
        )}
      </div>
      {!gameOver && (
        <button
          onClick={resetGame}
          className="bg-red-500 text-white mt-10 px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Reset Game
        </button>
      )}
    </div>
  );
};

export default Game;
