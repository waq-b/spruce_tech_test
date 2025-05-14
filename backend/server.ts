import express, { Application } from "express";
import { getDB } from "./db";
import cors from "cors";
import { GameResult, StatsObject, XorO } from "./types";

const app: Application = express();
app.use(cors());
app.use(express.json());

// POST /api/game-result
app.post(
  "/api/game-result",
  async (
    req: { body: GameResult },
    res: {
      status: (arg0: number) => {
        json: {
          (arg0: { success?: boolean; result?: string; error?: string }): void;
        };
      };
    }
  ) => {
    const db = await getDB();
    const { winner, loser, draw } = req.body;

    if (draw) {
      await db.run(
        "INSERT INTO game_results (winner, loser, draw) VALUES (?, ?, ?)",
        [null, null, 1]
      );
      return res.status(200).json({ success: true, result: "draw" });
    }

    if (!["X", "O"].includes(winner) || !["X", "O"].includes(loser)) {
      return res.status(400).json({ error: "Invalid player symbols" });
    }

    await db.run(
      "INSERT INTO game_results (winner, loser, draw) VALUES (?, ?, ?)",
      [winner, loser, 0]
    );

    res.status(200).json({ success: true });
  }
);

// GET /api/stats
app.get(
  "/api/stats",
  async (
    _req: any,
    res: {
      json: (arg0: StatsObject) => void;
    }
  ) => {
    const db = await getDB();

    const wins = await db.all(
      `SELECT winner as player, COUNT(*) as count FROM game_results WHERE draw = 0 GROUP BY winner`
    );
    const losses = await db.all(
      `SELECT loser as player, COUNT(*) as count FROM game_results WHERE draw = 0 GROUP BY loser`
    );

    const draws = await db.get(
      `SELECT COUNT(*) as count FROM game_results WHERE draw = 1`
    );

    const stats: StatsObject = {
      X: { wins: 0, losses: 0 },
      O: { wins: 0, losses: 0 },
      draws: draws?.count ?? 0,
      totalGames: 0,
    };

    wins.forEach(({ player, count }) => {
      stats[player as XorO].wins = count;
    });

    losses.forEach(({ player, count }) => {
      stats[player as XorO].losses = count;
    });

    stats.totalGames =
      stats.X.wins +
      stats.O.wins +
      stats.X.losses +
      stats.O.losses +
      stats.draws;

    res.json(stats);
  }
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
