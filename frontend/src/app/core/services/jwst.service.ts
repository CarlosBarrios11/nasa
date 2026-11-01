import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/development.enviroment';
import { JwstResponse } from '../models/jwst.model';

@Injectable({ providedIn: 'root' })
export class JwstService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/jwst`;

  async getImages(page = 1, perPage = 24): Promise<JwstResponse> {
    try {
      const params = new HttpParams()
        .set('page', page)
        .set('perPage', perPage);

      return await firstValueFrom(
        this.http.get<JwstResponse>(this.url, { params })
      );
    } catch (err: unknown) {
      console.error('[JwstService]', err);
      const httpErr = err as HttpErrorResponse;
      const msg = httpErr?.error?.error ?? 'No se pudieron cargar las imágenes del JWST.';
      throw new Error(msg);
    }
  }
}
