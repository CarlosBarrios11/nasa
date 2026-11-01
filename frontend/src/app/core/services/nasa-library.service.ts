import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/development.enviroment';
import {
  NasaLibraryCollection,
  NasaLibraryItem,
  NasaLibraryLink,
  NasaCard
} from '../models/nasa-item.model';

export interface SearchParams {
  q?: string;
  media_type?: '' | 'image' | 'video' | 'audio';
  year_start?: string;
  year_end?: string;
  page?: number;
  page_size?: number;
}

export interface SearchResult {
  items: NasaCard[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class NasaLibraryService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/library`;  // ← antes: /nasa-library

  async search(params: SearchParams): Promise<SearchResult> {
    try {
      let hp = new HttpParams();
      if (params.q)          hp = hp.set('q', params.q);
      if (params.media_type) hp = hp.set('media_type', params.media_type);
      if (params.year_start) hp = hp.set('year_start', params.year_start);
      if (params.year_end)   hp = hp.set('year_end', params.year_end);
      hp = hp.set('page', String(params.page ?? 1));
      hp = hp.set('page_size', String(params.page_size ?? 12));

      const raw = await firstValueFrom(
        this.http.get<NasaLibraryCollection>(this.url, { params: hp })
      );

      if (!raw?.collection?.items) {
        throw new Error('Respuesta del servidor con formato inesperado.');
      }

      const items: NasaCard[] = raw.collection.items.map((it) =>
        this.toCard(it)
      );

      return {
        items,
        total: raw.collection.metadata?.total_hits ?? 0,
        page: params.page ?? 1,
        pageSize: params.page_size ?? 12
      };
    } catch (err: unknown) {
      console.error('[NasaLibraryService]', err);
      const httpErr = err as HttpErrorResponse;
      const msg =
        httpErr?.error?.error ??
        'No se pudo consultar la biblioteca de la NASA.';
      throw new Error(msg);
    }
  }

  private toCard(item: NasaLibraryItem): NasaCard {
    const data = item.data[0];
    const nasaId = data?.nasa_id ?? '';
    return {
      id: data?.nasa_id ?? item.href,
      title: data?.title ?? 'Sin título',
      description: data?.description ?? '',
      date: (data?.date_created ?? '').slice(0, 10),  // YYYY-MM-DD
      type: data?.media_type ?? 'image',
      thumbnail: this.pickThumbnail(item.links),
       detailUrl: nasaId
      ? `https://images.nasa.gov/details/${encodeURIComponent(nasaId)}`
      : item.href
    };
  }

  private pickThumbnail(links?: NasaLibraryLink[]): string {
    if (!links || links.length === 0) return 'assets/placeholder.jpg';
    const preview = links.find((l) => l.rel === 'preview');
    if (preview) return preview.href;
    const alternates = links.filter((l) => l.rel === 'alternate');
    if (alternates.length > 0) return alternates[alternates.length - 1].href;
    return 'assets/placeholder.jpg';
  }
}
