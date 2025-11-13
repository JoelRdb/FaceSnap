import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide : LOCALE_ID, useValue: 'fr-FR' }, // 2- Enrgistre la langue Fr dans l'applicatin ; 1 - dans le main.ts
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
  ]
};
