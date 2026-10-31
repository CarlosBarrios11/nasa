
import {Router} from "express";

import { mostrarImagenDelDia } from "../controllers/apod.controller.js";

export const apodRouter = Router();

apodRouter.get("/apod", mostrarImagenDelDia);