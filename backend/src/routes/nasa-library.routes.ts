import {Router} from "express";

import { mostrarRecursos } from "../controllers/nasaLibrary.controller.js";

export const nasaLibraryRouter = Router(); 

nasaLibraryRouter.get("/library", mostrarRecursos);