import { XorO } from "../types";
import { checkWinner } from "./checkWinner";

function createBoard(size: number, filler: XorO | null = null): XorO[][] {
  return Array(size)
    .fill(null)
    .map(() => Array(size).fill(filler));
}

describe("checkWinner (dynamic board sizes)", () => {
  it("detects horizontal win on 3x3", () => {
    const board = createBoard(3);
    board[0] = ["X", "X", "X"];
    expect(checkWinner(board, { row: 0, col: 2 }, "X")).toBe(true);
  });

  it("detects vertical win on 4x4", () => {
    const board = createBoard(4);
    board[0][1] = "O";
    board[1][1] = "O";
    board[2][1] = "O";
    board[3][1] = "O";
    expect(checkWinner(board, { row: 3, col: 1 }, "O")).toBe(true);
  });

  it("detects main diagonal win on 5x5", () => {
    const board = createBoard(5);
    for (let i = 0; i < 5; i++) {
      board[i][i] = "X";
    }
    expect(checkWinner(board, { row: 4, col: 4 }, "X")).toBe(true);
  });

  it("detects anti-diagonal win on 5x5", () => {
    const board = createBoard(5);
    for (let i = 0; i < 5; i++) {
      board[i][4 - i] = "O";
    }
    expect(checkWinner(board, { row: 4, col: 0 }, "O")).toBe(true);
  });

  it("returns false if no winner on any axis", () => {
    const board = createBoard(3);
    board[0][0] = "X";
    board[0][1] = "O";
    board[0][2] = "X";
    expect(checkWinner(board, { row: 0, col: 2 }, "X")).toBe(false);
  });
});
