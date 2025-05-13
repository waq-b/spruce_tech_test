import React from "react";
import { XorO } from "../types";
import { getPlayerLabel } from "../utils/utils";

type GameOverProps = {
  winner: XorO | null;
  isDraw: boolean;
  resetGame: () => void;
};

const GameOver = ({ resetGame, winner, isDraw }: GameOverProps) => {
  const label = winner
    ? `${getPlayerLabel(winner)} wins! 🎉`
    : "It's a tie! 🤝";

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-xl text-center">
      <p className="text-xl font-semibold text-gray-800 mb-3">{label}</p>
      <button
        onClick={resetGame}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Play Again
      </button>
    </div>
  );
};

export default GameOver;
