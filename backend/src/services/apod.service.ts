
import { Apod } from "../models/Apod.js";
import type { ApodRaw } from "../types/apod.types.js";
import {env} from "../config/env.js";


function obtenerFechaActual(): string {
  const d = new Date(); //Fecha actual, en formato con valores de más
  const yy = String(d.getFullYear()).slice(-2); // Extrae los últimos 2 caracteres

  // suma 1 al índice 0 del mes, para comenzar en base 1.

  //Asegura que el string tenga al menos 2 caracteres, rellenando por la izquierda con '0'
  const mm = String(d.getMonth() + 1).padStart(2, "0");

  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}${mm}${dd}`;
}

export async function obtenerImagenDelDia() : Promise<Apod> {
  let fechaActual: string = obtenerFechaActual();


  const url : string = `${env.APOD_BASE}/${fechaActual}`;

  const respuesta = await fetch(url); 

    if (!respuesta.ok) {
        throw new Error(`JWST_HTTP_${respuesta.status}`);
    }

    const data : ApodRaw = await respuesta.json();

    if (!data || typeof data !== "object" || Array.isArray(data) || !data.date) {
    throw new Error("APOD_INVALID_FORMAT");
  }

    const apod = new Apod(data);

    return apod;
}
