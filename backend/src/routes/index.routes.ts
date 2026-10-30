import { Router } from "express";
import { jwstRouter } from "./jwst.routes.js";
import { misionesRouter } from "./misiones.routes.js";
/*
import { apodRouter } from "./apod.routes.js";
import { nasaLibraryRouter } from "./nasa-library.routes.js";
import { favoritosRouter } from "./favoritos.routes.js";
*/
export const apiRouter = Router();

apiRouter.use(jwstRouter);
apiRouter.use(misionesRouter);
/*
apiRouter.use(apodRouter);
apiRouter.use(nasaLibraryRouter);
apiRouter.use(favoritosRouter);*/