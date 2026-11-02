AstroLab · Frontend
Aplicación Angular 22 que consume la API intermedia AstroLab Backend y ofrece cuatro vistas:

Home — APOD del día, galería JWST y biblioteca NASA con filtros

Misiones — catálogo con filtro por destino

Misiones / Destino — misiones filtradas por destino seleccionado

Favoritos — colección local persistida en localStorage

Requisitos previos
Node.js ≥ 20 (probado en 24.21.0)

npm ≥ 10

Angular CLI 22.2.5 (se instala como dev-dependency del proyecto, no es necesario instalarlo globalmente)

El backend corriendo en http://localhost:3000

Instalación
bash
cd frontend
npm install
Variables de entorno
El frontend no ocupa .env. La URL donde está corriendo el backend se guarda en:

text
src/environments/environment.development.ts
Servidor de desarrollo
bash
ng serve
Abrir: http://localhost:4200

Estructura del proyecto
text
src/app/
├── core/
│   ├── models/                    # Interfaces TypeScript
│   │   ├── apod.model.ts
│   │   ├── jwst.model.ts
│   │   ├── nasa-item.model.ts
│   │   ├── mision.model.ts
│   │   └── favorite.model.ts
│   └── services/
│       ├── apod.services.ts
│       ├── jwst.service.ts
│       ├── nasa-library.service.ts
│       ├── misiones.service.ts
│       ├── favoritos.service.ts
│       └── preferences.service.ts
├── features/
│   ├── home/
│   │   ├── home.component.ts
│   │   ├── apod/
│   │   ├── jwst/
│   │   └── nasaLibrary/
│   ├── misiones/
│   │   ├── misiones.component.ts
│   │   └── detail/
│   └── favoritos/
├── app.component.ts
├── app.config.ts
└── app.routes.ts
Funcionalidades implementadas
Home
APOD — muestra la imagen del día con título, fecha y explicación ([innerHTML] con sanitización de Angular). Botón ❤ guarda en favoritos.

Galería JWST — grid paginado (12/24/48 por página) con favoritos por imagen. La preferencia de perPage se guarda en localStorage.

NASA Library — buscador con filtros (q, tipo, rango de años), paginación y selector de resultados por página. El tipo seleccionado se persiste en una cookie no sensible (astrolab_tipo_media, 30 días).

Para videos/audio, la tarjeta muestra un botón ▶ y al hacer clic abre el recurso original en images.nasa.gov/details/{nasa_id}.

Misiones
Lista completa de misiones desde el backend (GET /api/misiones).

Filtro por destino con <select> → GET /api/misiones?destino=Marte.

Favoritos
Persiste en localStorage bajo astrolab_favorites (array de Favorite).

Se muestran como grid: imágenes con <img>, videos/audio con thumbnail + ▶ que abre el recurso original.

Botón "Limpiar todos los favoritos" (con confirm()).

Navegación
Ruta	Componente
/	HomeComponent
/favoritos	FavoritosComponent
/misiones	MisionesComponent
/misiones/:destino	MisionesDetailComponent
Persistencia en el navegador
Dato	Storage	Clave	Propósito
Favoritos	localStorage	astrolab_favorites	Colección del usuario
Preferencia per-page JWST/Library	localStorage	astrolab_pagination_prefs	UX: mantener la elección del usuario
Tipo de media NASA Library	Cookie (30 días)	astrolab_tipo_media	Filtro recordado entre visitas
