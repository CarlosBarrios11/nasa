

import type { Request, Response } from "express";
import { obtenerImagenDelDia } from "../services/apod.service.js";


export async function mostrarImagenDelDia(req: Request, res: Response): Promise<void> {

    try {
        const resultado = await obtenerImagenDelDia();
        res.json(resultado);

    } catch(e) {
        const mensaje = e instanceof Error ? e.message : "Error desconocido";

        if (mensaje.startsWith("APOD_HTTP_")) {
        res
            .status(502)
            .json({ error: "El servicio APOD no respondió correctamente" });
        } else if (mensaje === "APOD_INAVLID_FORMAT") {
        res
            .status(502)
            .json({ error: "El servicio APOD devolvió datos inesperados" });
        } else {
        res.status(500).json({ error: "Error interno al consultar APOD" });
        }
    }
}