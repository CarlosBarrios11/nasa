import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { apiRouter } from "./routes/index.routes.js";

const app = express();

//Sin esto, el navegador bloquea la respuesta antes de que llegue al código
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use("/api", apiRouter);

app.listen(env.PORT, () => {
  console.log(`API NASA escuchando en http://localhost:${env.PORT}`);
});