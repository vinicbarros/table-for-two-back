import "express-async-errors";
import express, { json } from "express";
import cors from "cors";
import { loadEnv } from "./config/envs.js";
import { connectDb, disconnectDb } from "./config/database.js";

loadEnv();

const app = express();

app.use(cors());
app.use(json());

export async function init() {
  await connectDb();
  return Promise.resolve(app);
}

export async function close() {
  await disconnectDb;
}

export default app;
