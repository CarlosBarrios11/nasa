

import {env} from "../config/env.js";

import type { JwstResponse } from "../types/jwst.js"; //Interfaz cruda (atributos reales, solo los que quiero acceder)
import type {JwstResponseNormalizada} from "../types/jwst.js" //Interfaz normalizada (atributos con nombres normalizados)

export async function obtenerImagenesJwst(page: number = 1, perPage: number = 1) : Promise <JwstResponseNormalizada>{

    //Inferencia de tipos de typescript
    const params = new URLSearchParams();

    params.append("page", page.toString());
    params.append("perPage", perPage.toString());


    const url : string = `${env.JWST_BASE}all/type/jpg?${params}`;


    const res = await fetch(url, {
        headers : {"X-API-KEY": env.JWST_API_KEY},
    });
    

     if (!res.ok) {
        throw new Error(`JWST_HTTP_${res.status}`);
    }

    const data = (await res.json()) as JwstResponse; //Datos crudos (No transforma, solo ayuda a guiar para acceder a lo que se haya hecho en la interfaz)


    //REVISAR, POSIBLE FALLO
    if (!data || !Array.isArray(data)) {
        throw new Error("JWST_FORMATO_INVALIDO");
    }

    let dataNormalizada : JwstResponseNormalizada;

    dataNormalizada = {
        body: data.body.map((img) => ({ id: img.id, url: img.location })), //Aquí se convierte la interfaz con los nombres de la clave con que quiero que el frontend interactue, se pasará solamente id y url de todos los atributos que se trajo en data
        hayMas: data.body.length > 0, //define si hay más elementos
    };
    
    return dataNormalizada;
}