import type { Request, Response } from "express";
import type { JwstObject } from "../types/jwstInstruments.types.js";

import * as jwstService from "../services/jwstInstruments.services.js";


//Función para validar que el body tiene la estructura correcta antes de pasarla al service, en caso de que heya un error retorna el error y en caso de que todo esté en orden, entonces retorna null, que se considera en el controller
function validar(body: JwstObject): string | null {
  if (!body?.name) return "name es obligatorio";
  const d = body.data;
  if (!d) return "data es obligatorio";
  if (!d.id) return "data.id es obligatorio";
  if (!d.observation_id) return "data.observation_id es obligatorio";
  if (typeof d.program !== "number" || d.program <= 0) return "data.program debe ser número positivo";
  if (!d.details?.mission) return "data.details.mission es obligatorio";
  if (!Array.isArray(d.details?.instruments) || d.details.instruments.length === 0)
    return "data.details.instruments debe tener al menos uno";
  if (!d.details?.suffix) return "data.details.suffix es obligatorio";
  if (!d.details?.description) return "data.details.description es obligatorio";
  if (!d.file_type) return "data.file_type es obligatorio";
  if (!d.location) return "data.location es obligatorio";
  return null;
}

export async function listar(req: Request, res: Response) {
  try {
    const data = await jwstService.getAll();
    // Si piden solo los del usuario: /api/jwst?source=user
    const filtro = req.query.source;
    res.json(filtro ? data.filter((o) => o.data?.source === filtro) : data);
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
}

export async function crear(req: Request, res: Response) {
  const error = validar(req.body);
  if (error) return res.status(400).json({ error });

  // Se marca como creado por el usuario
  const payload: JwstObject = {
    name: req.body.name,
    data: { ...req.body.data, source: "user" },
  };

  try {
    const creado = await jwstService.create(payload);
    res.status(201).json(creado);
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
}

export async function actualizar(req: Request, res: Response) {
  const error = validar(req.body);
  if (error) return res.status(400).json({ error });

  const payload: JwstObject = {
    name: req.body.name,
    data: { ...req.body.data, source: "user" },
  };

  try {
    const actualizado = await jwstService.update(String(req.params.id), payload);
    res.json(actualizado);
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
}

export async function eliminar(req: Request, res: Response) {
  try {
    const ok = await jwstService.remove(String(req.params.id));
    if (!ok) return res.status(400).json({ error: "No se pudo eliminar" });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
}