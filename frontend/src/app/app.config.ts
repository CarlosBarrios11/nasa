import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',      // ← scroll a #fragment
        scrollPositionRestoration: 'top' // ← al cambiar de ruta, volver arriba
      })
    ),
    provideHttpClient()
  ]
};
