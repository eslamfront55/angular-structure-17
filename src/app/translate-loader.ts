import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, provideRouter } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// export class CustomTranslateLoader implements TranslateLoader {
//   constructor(private http: HttpClient, private router: Router) { }

//   public getTranslation(lang: string): Observable<any> {
//     let routePrefix = this.router.url.includes('/path1') ? 'path1/' : 'path2/';
//     let path = `./assets/i18n/${routePrefix}${lang}.json`;
//     return this.http.get(path);
//   }
// }
export function createTranslateLoader(http: HttpClient, router: Router) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

