

import {Router} from "express"; //clase/fábrica de Express que permite crear manejadores de rutas modulares (como "mini-apps" que agrupan rutas relacionadas).

import { listarJwst } from "../controllers/jwst.controller.js";

// Variable que guarda rutas que luego le da un prefijo común por ejemplo /api.
export const jwstRouter = Router(); 

jwstRouter.get("/jwst", listarJwst);