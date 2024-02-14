import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from '@services/interceptor.service';
import { CookieService } from 'ngx-cookie-service';
import { APP_DATE_FORMATS_PROVIDER } from '@utilsFunctions/formatDate';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    importProvidersFrom(HttpClientModule, MatMomentDateModule),
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    APP_DATE_FORMATS_PROVIDER,
    CookieService,
  ],
};
