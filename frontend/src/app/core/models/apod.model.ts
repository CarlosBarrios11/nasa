export type ApodMediaType = 'image' | 'video';

export interface Apod {
  fecha: string;
  titulo: string;
  tipoMedio: ApodMediaType;
  explicacion: string;
  url: string;
  urlRecurso: string;
  alt?: string;
}
