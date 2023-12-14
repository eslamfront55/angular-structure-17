import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { Router, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './translate-loader';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
  provideHttpClient(withFetch()),
  provideHttpClient(),
  importProvidersFrom(HttpClientModule),
  importProvidersFrom
    (
      TranslateModule.forRoot(
        {
          loader:
          {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient, Router]
          },
          defaultLanguage: 'en'
        })
    )

  ]
};
