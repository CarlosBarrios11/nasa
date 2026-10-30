import type { Request, Response } from "express";
import {
    obtenerTodas,
    filtrarPorDestino
} from "../services/misiones.services.js";


export function listarMisiones(req: Request, res: Response): void {
    const rawDestino = req.query.destino;
    const destinoMision: string = typeof rawDestino === "string" ? rawDestino : "";

    const resultado = destinoMision? filtrarPorDestino(destinoMision): obtenerTodas();
    res.json(resultado);
}
