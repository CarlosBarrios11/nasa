import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/development.enviroment';
import { Mision } from '../models/mision.model';

@Injectable({ providedIn: 'root' })
export class MisionesService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/misiones`;

  async getAll(destino?: string): Promise<Mision[]> {
    try {
      let params = new HttpParams();
      if (destino && destino !== 'todos') {
        params = params.set('destino', destino);
      }
      return await firstValueFrom(
        this.http.get<Mision[]>(this.url, { params })
      );
    } catch (err: unknown) {
      console.error('[MisionesService]', err);
      const httpErr = err as HttpErrorResponse;
      const msg = httpErr?.error?.error ?? 'No se pudo cargar el catálogo de misiones.';
      throw new Error(msg);
    }
  }
}
