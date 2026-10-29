

//Importar la interface de Apod
//Solo para tipar, no lo importa en runtime.
import type { ApodRaw } from "../types/apod.js";

export class Apod {
    readonly fecha: string;
    readonly titulo: string;
    readonly tipoMedio: "image" | "video" | "iframe";
    readonly explicacion: string;
    readonly url: string;
    readonly urlRecurso: string;
    readonly alt : string;

    //Al instanciar el objeto, se solicita un parámetro que cumpla con la interfaz ApodRaw
    constructor(dato: ApodRaw) {
    this.fecha = dato.date || "Sin fecha";
    this.titulo = dato.title || "Sin título";
    this.tipoMedio = dato.media_type;
    this.explicacion = dato.explanation ?? "";
    this.url = dato.url;
    this.urlRecurso = dato.hdurl || "Sin recurso visual";
    this.alt = dato.alt || "Recurso visual de la api APOD";
  }

  esVideo() : boolean {
    return this.tipoMedio === "video";
  }
}

