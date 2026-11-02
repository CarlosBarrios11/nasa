import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Apod } from '../models/apod.model';

@Injectable({ providedIn: 'root' })
export class ApodService {

  //Atributos privados, porque se mantiene el valor a lo largo de la app
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/apod`;

  //Método que retorna una promesa en forma de APOD (interfaz)
  getToday(): Promise<Apod> {

    //Toma el primer valor del observable y lo convierte en Promise
    return firstValueFrom(this.http.get<Apod>(this.url)) //Petición http
      .then((data) => data)

      //Parecido a any, pero hace que se tenga que validar antes de usar
      .catch((err: unknown) => {
        const httpErr = err as HttpErrorResponse;
        const msg =
          httpErr.error?.error ??
          'No se pudo cargar la imagen del día.';
        console.error('[ApodService]', err);
        throw new Error(msg);
      });
  }
}
