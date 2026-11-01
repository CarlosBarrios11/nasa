export interface JwstImage {
  id: string;
  url: string;
}

export interface JwstResponse {
  body: JwstImage[];
  hayMas: boolean;
}
