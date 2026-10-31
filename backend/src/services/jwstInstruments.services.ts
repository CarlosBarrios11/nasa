import type { JwstObject } from "../types/jwstInstruments.types.js";
import {env} from "../config/env.js";


const HEADERS = {
  "Content-Type": "application/json",
  "x-api-key": String(env.RESTFUL_API_KEY),
};

const url : string = env.RESTFUL_API_BASE;


export async function getAll(): Promise<JwstObject[]> {
  const resultado = await fetch(url, { headers: HEADERS });
  return resultado.json();
}

export async function create(data: JwstObject): Promise<JwstObject> {
  const resultado = await fetch(url, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(data),
  });
  return resultado.json();
}

export async function update(id: string, data: JwstObject): Promise<JwstObject> {
  const resultado = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: HEADERS,
    body: JSON.stringify(data),
  });
  return resultado.json();
}

export async function remove(id: string): Promise<boolean> {
  const resultado = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: HEADERS,
  });
  return resultado.ok;
}
