import React, { FC, useEffect, useState } from "react";
import { GameStatsObject } from "../types";

const GameStats: FC<{ refreshTrigger: number }> = ({ refreshTrigger }) => {
  const [stats, setStats] = useState<GameStatsObject | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    fetchStats();
  }, [refreshTrigger]);

  return (
    <div className="flex flex-col items-end ml-auto mr-6 pt-2 space-y-2">
      <div className="flex gap-6 text-sm text-gray-800">
        {stats ? (
          <>
            <div className="flex flex-col items-start leading-tight">
              <span className="font-semibold text-blue-600">Player 1 (X)</span>
              <span className="text-xs text-gray-600">
                Wins: {stats.X.wins}
              </span>
              <span className="text-xs text-gray-600">
                Losses: {stats.X.losses}
              </span>
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="font-semibold text-red-600">Player 2 (O)</span>
              <span className="text-xs text-gray-600">
                Wins: {stats.O.wins}
              </span>
              <span className="text-xs text-gray-600">
                Losses: {stats.O.losses}
              </span>
            </div>
          </>
        ) : (
          <span className="text-gray-400 text-sm">
            Stats server not running...
          </span>
        )}
      </div>

      {stats && (
        <div className="text-xs text-gray-500 space-y-1 text-right">
          <p>Total games: {stats.totalGames}</p>
          <p>Draws: {stats.draws}</p>
        </div>
      )}
    </div>
  );
};

export default GameStats;
