export type XorO = "X" | "O";
export type Coord = { row: number; col: number };
export type GameStatsObject = {
  X: { wins: number; losses: number };
  O: { wins: number; losses: number };
  draws: number;
  totalGames: number;
};
