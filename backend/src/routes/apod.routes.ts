
import {Router} from "express";

import { mostrarImagenDelDia } from "../controllers/apod.types.js";

export const apodRouter = Router();

apodRouter.get("/apod", mostrarImagenDelDia);