import type { Mision } from "../types/misiones.types.js";
import misionesEspaciales from "../data/misionesEspaciales.json" with { type: "json" };


//Typescript se inventa un tipo, el as mision le da seguridad al compilador que misionesEspaciales tiene la forma de Mision
const misiones = misionesEspaciales as Mision[];

export function obtenerTodas(): Mision[] {
  return misiones;
}

export function filtrarPorDestino(destino: string): Mision[] {
  if (!destino || destino === "todos") return misiones;
  return misiones.filter((m) => m.destino.toLowerCase().trim() === destino.toLowerCase().trim());
}