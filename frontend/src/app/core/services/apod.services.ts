import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/development.enviroment';
import { Apod } from '../models/apod.model';

@Injectable({ providedIn: 'root' })
export class ApodService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/apod`;

  getToday(): Promise<Apod> {
    return firstValueFrom(this.http.get<Apod>(this.url))
      .then((data) => data)
      .catch((err: unknown) => {
        const httpErr = err as HttpErrorResponse;
        const msg =
          httpErr?.error?.error ??
          'No se pudo cargar la imagen del día.';
        console.error('[ApodService]', err);
        throw new Error(msg);
      });
  }
}
