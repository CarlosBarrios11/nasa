export type NasaMediaType = 'image' | 'video' | 'audio';

// Lo que hay en data[] de cada item (nivel anidado profundo)
export interface NasaLibraryData {
  nasa_id?: string;
  title: string;
  description?: string;
  date_created: string;
  media_type: NasaMediaType;
}

export interface NasaLibraryLink {
  href: string;
  rel?: string;      // 'preview' | 'alternate' | 'canonical' | 'captions'
  render?: string;
}

export interface NasaLibraryItem {
  href: string;
  data: NasaLibraryData[];
  links?: NasaLibraryLink[];
}

// Respuesta completa del backend
export interface NasaLibraryCollection {
  collection: {
    items: NasaLibraryItem[];
    metadata?: { total_hits: number };  // el backend no lo declara, pero la API real sí lo trae
  };
}

// Vista "plana" que usamos en las tarjetas
export interface NasaCard {
  id: string;
  title: string;
  description: string;
  date: string;
  type: NasaMediaType;
  thumbnail: string;
  detailUrl: string;
}
