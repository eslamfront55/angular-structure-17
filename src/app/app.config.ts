import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Router, provideRouter } from '@angular/router';
import { routes } from './app.routes';

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

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
