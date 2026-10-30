import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { apiRouter } from "./routes/index.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.listen(env.PORT, () => {
  console.log(`API NASA escuchando en http://localhost:${env.PORT}`);
});