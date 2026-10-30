

//Elemento data de la respuesta que es un arreglo (lo más atómico)
export interface NasaLibraryData {
  title: string;
  date_created: string;
  media_type: "image" | "video" | "audio";
}

//Elemento que representa el conjunto de items (contiene a la data y los links)
export interface NasaLibraryItems {
    href: string;
    data: NasaLibraryData[];
    links?: { href: string }[];
}

//Elemento que representa el nivel más alto y general, la colección donde se encuentra los items, dentro de los items se encuentra la data y los links (en este nivel no se obtiene nada útil para la respuesta)
export interface NasaLibraryCollection {
    collection: {
    items: NasaLibraryItems[];
    metadata: { total_hits: number };
  };
}
