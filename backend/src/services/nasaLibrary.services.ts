import type { NasaLibraryCollection } from '../types/nasaLibrary.types.js';
import {env} from "../config/env.js";

const primerDecadaFiltro = String(1960);


//Calculo de década actual convertida a string, para posteriormente ser usada como filtro por defecto si no se envía
function obtenerDecadaActual() {
    return String(Math.ceil(new Date().getFullYear() / 10) * 10); //ceil para redondear hacia arriba en caso de que no sea múltiplo de 10
}

function esAnioValido(valor: string): boolean {
  return /^\d{4}$/.test(valor);
}


export async function listarRecursos 
(page : number, page_size : number, textoBusqueda : string, media_type : string, 
    year_start : string, year_end : string) : Promise<NasaLibraryCollection> {


    const params = new URLSearchParams();

    //La paginación siempre debe de estar presente como parámetro
    params.append("page", page.toString());
    
    params.append("page_size", page_size.toString());


    //Las siguientes condiciones son para agregar los filtros que el usario requiera
    //Texto
    if (textoBusqueda) {
        params.append("q", textoBusqueda);
    }

    //Tipo de recurso
    if (media_type) {
        params.append("media_type", media_type);
    }

    //La api exige que al menos haya un parámetro como p, fecha u otro, los filtros de paginación no cuentan, así que se hace uso de valores por defecto para el año de comienzo y de finalización de la búsqueda 
    if (year_start && esAnioValido(year_start)) {
        params.append("year_start", year_start);
    } else {
        params.append("year_start", primerDecadaFiltro);
    }

    if(year_end && esAnioValido(year_end)) {
        params.append("year_end", year_end);
    } else {
        params.append("year_end", obtenerDecadaActual());
    }

    const url : string = `${env.NASA_LIBRARY_BASE}search?${params}`;

    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw new Error(`NASA_LIBRARY_HTTP_${respuesta.status}`);
    }

    const data : NasaLibraryCollection = await respuesta.json();

    if (!data || !data.collection || !Array.isArray(data.collection.items)) {
        throw new Error("NASA_LIBRARY_FORMATO_INVALIDO");
    }
    return data;
}

