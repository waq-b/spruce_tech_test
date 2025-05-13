import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Open SQLite connection
export async function getDB() {
  return open({
    filename: "./tic-tac-toe.db",
    driver: sqlite3.Database,
  });
}
