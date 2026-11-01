export type FavoriteMediaType = 'image' | 'video' | 'audio';

export interface Favorite {
  id: string;
  title: string;
  type: FavoriteMediaType;
  url: string;           // para imágenes: la URL directa. Para video/audio: la URL que se abre.
  thumbnail?: string;    // preview para video/audio (thumbnail de NASA)
  savedAt: string;
}
