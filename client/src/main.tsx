import React, { useState } from "react";
import Setup from "./components/Setup";
import Game from "./components/Game";
import GameStats from "./components/GameStats";
import useTicTacToe from "./hooks/useTicTacToe";

export const Main = () => {
  const {
    boardSize,
    setSize,
    board,
    currentPlayer,
    winner,
    isDraw,
    started,
    statsRefreshKey,
    startGame,
    handleClick,
    resetGame,
  } = useTicTacToe();

  return (
    <>
      <div className="flex justify-between items-center w-full px-10">
        <div className="flex-1"></div>
        {started && (
          <div className="font-bold text-2xl text-center flex-1">
            Tic Tac Toe
          </div>
        )}
        <div className="flex-1 flex justify-end">
          <GameStats refreshTrigger={statsRefreshKey} />
        </div>
      </div>

      <div className="flex flex-col mt-10 items-center gap-10">
        {!started && (
          <Setup
            boardSize={boardSize}
            setSize={setSize}
            startGame={startGame}
          />
        )}
        {started && (
          <Game
            board={board}
            currentPlayer={currentPlayer}
            handleClick={handleClick}
            winner={winner}
            isDraw={isDraw}
            resetGame={resetGame}
          />
        )}
      </div>
    </>
  );
};
