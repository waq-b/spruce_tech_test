import { Coord, XorO } from "../types";

/**
 * Checks if the current player has won the game after making a move.
 * @param board - The current state of the game board.
 * @param move - The coordinates of the last move made by the player.
 * @param player - The symbol of the current player ('X' or 'O').
 * @returns True if the player has won, false otherwise.
 */

export const checkWinner = (
  board: XorO[][],
  move: Coord,
  player: XorO
): boolean => {
  const size = board.length;
  const { row, col } = move;

  if (!player) return false;

  const inRow = board[row].every((cell) => cell === player);
  const inCol = board.every((r) => r[col] === player);
  const onMainDiagonal = row === col && board.every((r, i) => r[i] === player);
  const onAntiDiagonal =
    row + col === size - 1 && board.every((r, i) => r[size - 1 - i] === player);

  return inRow || inCol || onMainDiagonal || onAntiDiagonal;
};
