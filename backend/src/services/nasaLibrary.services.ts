import type { NasaLibraryCollection } from '../types/nasaLibrary.types.js';
import {env} from "../config/env.js";


export async function listarRecursos 
(page : number, page_size : number, textoBusqueda? : string, media_type? : string, 
    year_start? : string, year_end? : string) : Promise<NasaLibraryCollection> {


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

    if (year_start) {
        params.append("year_start", year_start);
    }

    if(year_end) {
        params.append("year_end", year_end);
    }

    const url : string = `${env.NASA_LIBRARY_BASE}search?${params.toString()}`;

    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw new Error(`JWST_HTTP_${respuesta.status}`);
    }

    const data : NasaLibraryCollection = await respuesta.json();

    if (!data || !Array.isArray(data.collection)) {
        throw new Error("NASA_LIBRARY_FORMATO_INVALIDO");
    }

    return data;
}

