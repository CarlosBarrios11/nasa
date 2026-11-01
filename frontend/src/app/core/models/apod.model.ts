export type ApodMediaType = 'image' | 'video';

export interface Apod {
  fecha: string;
  titulo: string;
  tipoMedio: ApodMediaType;
  explicacion: string;   // contiene HTML
  url: string;           // link al artículo de la NASA
  urlRecurso: string;    // URL real de la imagen/video
  alt?: string;
}
