# AstroLab · Backend

API intermedia en Node.js + Express + TypeScript que centraliza el acceso a
tres servicios públicos de la NASA (APOD, JWST y NASA Image and Video Library)
y expone un catálogo local de misiones espaciales. El frontend Angular consume
únicamente estos endpoints; **las claves de las APIs nunca salen del servidor**.

## API utilizadas

| Servicio | Origen | Uso en el proyecto |
|---|---|---|
| **APOD** (Astronomy Picture of the Day) | API interna `APOD_BASE` | Imagen/video astronómico del día |
| **JWST** (James Webb Space Telescope) | API interna `JWST_BASE` | Galería paginada de imágenes del telescopio |
| **NASA Image and Video Library** | `images-api.nasa.gov` | Búsqueda de imágenes, videos y audio |
| **Misiones espaciales** | JSON local (`src/data/misionesEspaciales.json`) | Catálogo propio con 10 misiones |

La API de JWST y la API utilizada para la simulación de post, put, delete requieren `X-API-KEY`; se inyecta desde el servidor, no
desde el navegador.

## Requisitos previos

- **Node.js** ≥ 20 (probado en 24.21.0)
- **npm** ≥ 10
- Acceso a internet para consultar las APIs externas
- Credenciales válidas de las APIs (APOD y JWST)

## Instalación

```bash
cd backend
npm install


# Ejecución

# Desarrollo (recarga automática al guardar)
npm run dev

# Compilar a JavaScript (genera dist/)
npm run build

# Producción (requiere build previo)
npm start

#El servidor escuchará en el siguiente link
http://localhost:3000


## Funciones implementadas
# obtenerImagenDelDia() — consulta APOD con la fecha actual (YYMMDD), normaliza la respuesta a un objeto Apod y valida el formato.

#obtenerImagenesJwst(page, perPage) — consulta el endpoint JWST, normaliza cada imagen a { id, url } y devuelve { body, hayMas } para
#paginación.

#listarRecursos(page, page_size, q, media_type, year_start, year_end) —
#construye los URLSearchParams de NASA Library, aplica valores por defecto
#de años (la API exige al menos un filtro no paginado) y devuelve la colección cruda.

#obtenerTodas() — devuelve las 10 misiones del JSON local.

#filtrarPorDestino(destino) — filtra misiones por destino (case-insensitive);
#invocada por GET /api/misiones?destino=....
