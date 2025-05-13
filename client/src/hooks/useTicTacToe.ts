import React, { useState } from "react";
import { XorO } from "../types";
import { checkWinner } from "../utils/checkWinner";

type UseTicTacToeReturn = {
  boardSize: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  board: XorO[][];
  currentPlayer: XorO;
  winner: XorO | null;
  isDraw: boolean;
  started: boolean;
  statsRefreshKey: number;
  startGame: () => void;
  handleClick: (row: number, col: number) => Promise<void>;
  resetGame: () => void;
};

const useTicTacToe = (): UseTicTacToeReturn => {
  const [statsRefreshKey, setStatsRefreshKey] = useState(0);
  const [boardSize, setSize] = useState<number>(3);
  const [board, setBoard] = useState<XorO[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<XorO>("X");
  const [winner, setWinner] = useState<XorO | null>(null);
  const [isDraw, setDraw] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);

  // Initializes and starts a new game
  // TODO: start and run game on server, so multiple clients can be opened and played on different machines
  const startGame = () => {
    const newBoard = Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(null));
    setBoard(newBoard);
    setWinner(null);
    setCurrentPlayer("X");
    setStarted(true);
  };

  // Updates the scores in the database
  // TODO: Add error handling and UI messages if backend is offline
  // TODO: Pull game stats from backend if game was being run on server
  const updateScores = async (result: XorO | "Draw") => {
    await fetch("http://localhost:4000/api/game-result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        result === "Draw"
          ? { draw: true }
          : {
              winner: result,
              loser: result === "X" ? "O" : "X",
            }
      ),
    });
  };

  // Handles the click event on the board
  // Updates the board state and checks for a winner
  const handleClick = async (row: number, col: number) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? currentPlayer : cell))
    );

    if (checkWinner(newBoard, { row, col }, currentPlayer)) {
      setWinner(currentPlayer);
      await updateScores(currentPlayer);
      setStatsRefreshKey((prev) => prev + 1);
    }
    if (newBoard.every((row) => row.every((cell) => cell !== null))) {
      setDraw(true);
      await updateScores("Draw");
      setStatsRefreshKey((prev) => prev + 1);
    }

    setBoard(newBoard);
    setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
  };

  // Resets the game state
  // Sets the board size to 3, clears the winner, and resets the board
  const resetGame = () => {
    setStarted(false);
    setSize(3);
    setWinner(null);
    setDraw(false);
    setBoard([]);
  };

  return {
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
  };
};

export default useTicTacToe;
