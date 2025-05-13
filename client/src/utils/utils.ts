import { XorO } from "../types";

// TODO: Add the ability to set player names
export const getPlayerLabel = (symbol: XorO): string => {
  if (symbol === "X") return "Player 1";
  if (symbol === "O") return "Player 2";
  return "";
};
