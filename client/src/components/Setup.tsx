import React from "react";

type SetupProps = {
  boardSize: number;
  setSize: (size: number) => void;
  startGame: () => void;
};

const Setup = ({ boardSize, setSize, startGame }: SetupProps) => {
  return (
    <div className="flex flex-col items-center gap-6 ">
      <h2 className="text-2xl font-semibold text-gray-800">
        Welcome to Tic Tac Toe
      </h2>

      <div className="flex flex-col items-center gap-2">
        <label className="text-base font-medium text-gray-700">
          Choose your board size
        </label>
        <input
          type="number"
          min={3}
          max={15}
          value={boardSize}
          onChange={(e) => setSize(Number(e.target.value))}
          className="appearance-none text-center text-lg w-24 py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <p className="text-sm text-gray-500">Any size from 3 to 15</p>
      </div>

      <button
        onClick={startGame}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full transition shadow-md hover:shadow-lg"
      >
        Start Game
      </button>
    </div>
  );
};

export default Setup;
