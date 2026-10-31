
import dotenv from "dotenv";

/*
Ejecuta la carga. Busca un archivo .env en la raíz del proyecto y registra cada par CLAVE=valor como variable de entorno accesible vía process.env.CLAVE.
*/
dotenv.config();


//Falla rápido, en caso de que la variable de entorno no exista
if (!process.env.JWST_API_KEY) {
  throw new Error("Falta JWST_API_KEY en el archivo .env");
}

if(!process.env.RESTFUL_API_KEY) {
  throw new Error("Falta RESTFUL_API_KEY en el archivo .env");
}


//Construcción del objeto env
export const env = {
  PORT: Number(process.env.PORT) || 3000,
  JWST_API_KEY: process.env.JWST_API_KEY,
  RESTFUL_API_KEY: process.env.RESTFUL_API_KEY, 

  NASA_LIBRARY_BASE: "https://images-api.nasa.gov/",
  JWST_BASE: "https://api.jwstapi.com/",
  APOD_BASE: "https://science.nasa.gov/wp-json/wp/v2/apod-basic",
  RESTFUL_API_BASE: "https://api.restful-api.dev/collections/jwst/objects",

} as const; //Le dice a TypeScript que trate las propiedades del objeto como literales de solo lectura (readonly).