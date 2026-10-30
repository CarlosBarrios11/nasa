
/*
El controller valida, llama al servicio, decide el status code y responde. Sin lógica de negocio pesada.
*/

import type { Request, Response } from "express";
import { obtenerImagenesJwst } from "../services/jwst.service.js";

export async function listarJwst(req: Request, res: Response): Promise<void> {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 24;

  if (page < 1 || perPage < 1) {
    res.status(400).json({ error: "Parámetros de paginación incorrectos" });
    return;
  }

  try {
    const resultado = await obtenerImagenesJwst(page, perPage);
    res.json(resultado);
  } catch (e) {

    const mensaje = e instanceof Error ? e.message : "Error desconocido";

    if (mensaje.startsWith("JWST_HTTP_")) {
      res
        .status(502)
        .json({ error: "El servicio JWST no respondió correctamente" });
    } else if (mensaje === "JWST_FORMATO_INVALIDO") {
      res
        .status(502)
        .json({ error: "El servicio JWST devolvió datos inesperados" });
    } else {
      res.status(500).json({ error: "Error interno al consultar JWST" });
    }
  }
}
