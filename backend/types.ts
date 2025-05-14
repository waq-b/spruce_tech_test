export type XorO = "X" | "O";
export type StatsObject = {
  X: { wins: number; losses: number };
  O: { wins: number; losses: number };
  draws: number;
  totalGames: number;
};
export type GameResult = {
  winner?: XorO;
  loser?: XorO;
  draw?: boolean;
};

export type GameResultResponse = {
  success?: boolean;
  result?: string;
  error?: string;
};
