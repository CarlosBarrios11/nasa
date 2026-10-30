import { Router } from "express";
import {listarMisiones } from "../controllers/misiones.controller.js";

export const misionesRouter = Router();

misionesRouter.get("/misiones", listarMisiones);