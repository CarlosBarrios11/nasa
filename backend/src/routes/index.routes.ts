import { Router } from "express";
import { jwstRouter } from "./jwst.routes.js";
import { apodRouter } from "./apod.routes.js";
import { misionesRouter } from "./misiones.routes.js";
import { nasaLibraryRouter } from "./nasa-library.routes.js";
/*
import { apodRouter } from "./apod.routes.js";

import { favoritosRouter } from "./favoritos.routes.js";
*/
export const apiRouter = Router();

apiRouter.use(apodRouter);
apiRouter.use(jwstRouter);
apiRouter.use(nasaLibraryRouter);
apiRouter.use(misionesRouter);

/*
apiRouter.use(favoritosRouter);*/