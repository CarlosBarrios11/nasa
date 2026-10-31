import type { Request, Response } from "express";
import { listarRecursos } from "../services/nasaLibrary.services.js";


export async function mostrarRecursos(req: Request, res: Response) : Promise<void>{

    //En caso de que no venga, entonces se colocan por defecto estos valores para paginar
    const page = Number(req.query.page) || 1;
    const page_size = Number(req.query.page_size) || 12;


    const media_type = req.query.media_type ? String(req.query.media_type) : "";
    const textoBusqueda = req.query.q ? String(req.query.q) : "";
    const year_start = req.query.year_start ? String(req.query.year_start) : "";
    const year_end = req.query.year_end ? String(req.query.year_end) : "";

    
  if (page < 1 || page_size < 1) {
    res.status(400).json({ error: "Parámetros de paginación incorrectos" });
    return;
  }

  try {
    const resultado = await listarRecursos(page, page_size, textoBusqueda, media_type, year_start, year_end);
    res.json(resultado);
  } catch(e) {
        const mensaje = e instanceof Error ? e.message : "Error desconocido";

        if (mensaje.startsWith("NASA_LIBRARY_HTTP_")) {
        res
            .status(502)
            .json({ error: "El servicio NASA_LIBRARY no respondió correctamente" });
        } else if (mensaje === "NASA_LIBRARY_FORMATO_INVALIDO") {
        res
            .status(502)
            .json({ error: "El servicio NASA_LIBRARY devolvió datos inesperados" });
        } else {
        res.status(500).json({ error: "Error interno al consultar NASA_LIBRARY" });
        }
    }
} 