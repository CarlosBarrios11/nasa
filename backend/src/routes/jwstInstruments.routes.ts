import { Router } from "express";
import * as jwstInstrumentsController from "../controllers/jwstInstruments.controller.js";

export const jwstInstrumentsRouter = Router();

jwstInstrumentsRouter.get("/", jwstInstrumentsController.listar);
jwstInstrumentsRouter.post("/", jwstInstrumentsController.crear);
jwstInstrumentsRouter.put("/:id", jwstInstrumentsController.actualizar);
jwstInstrumentsRouter.delete("/:id", jwstInstrumentsController.eliminar);
