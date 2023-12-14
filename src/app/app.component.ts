import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslationService } from './services/translation.service';
import { filter, map } from 'rxjs';
import { keys } from './configs/localstorage-key';
import { HeaderComponent } from './components/layout/header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RatingModule, FormsModule, TranslateModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-17-ssr';
  value = 4;
  languages = ['en', 'ar', 'ru', 'cn'];;
  browserLang: any;
  currentTheme: any;
  favIcon: HTMLLinkElement | any;
  platform: any;
  currentLanguage: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    public translationService: TranslationService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private primengConfig: PrimeNGConfig,
    private renderer: Renderer2,
    private router: Router,
    private meta: Meta
  ) {
    // Set up router events subscription
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), map(() => {
      let child = this.activatedRoute?.firstChild;
      while (child) {
        if (child?.firstChild) {
          child = child.firstChild;
        } else if (child?.snapshot?.data) {
          return child.snapshot.data;
        } else {
          return null;
        }
      }
      return null;
    })
    ).subscribe((data: any) => {
      if (data) {
        // this.publicService.pushUrlData.next(data);
      }
    });
    // Set up translations

    // Client only code.
    if (isPlatformBrowser(this.platformId)) {
      this.translateService.addLangs(this.languages);
      this.platform = 'Browser';
      this.currentLanguage = window.localStorage.getItem(keys.language);
      if (this.currentLanguage !== null && this.currentLanguage !== undefined) {
        this.translateService.use(this.currentLanguage);
        let direction: any;
        if (isPlatformBrowser(this.platformId)) {
          this.platform = 'Browser';
          direction = window.localStorage.getItem(keys.language) === "ar" ? "rtl" : "ltr";
        } else if (isPlatformServer(this.platformId)) {
          this.platform = 'Server';
        } else {
          this.platform = 'Unknown';
        }

        this.setLanguage(direction);
        this.translateService?.stream('primeng')?.subscribe((data: any) => {
          this.primengConfig?.setTranslation(data);
        });

      } else {
        this.browserLang = this.translateService.getBrowserLang();
        if (isPlatformBrowser(this.platformId)) {
          this.platform = 'Browser';
          localStorage.setItem(keys.language, this.browserLang);
          this.translateService.use(this.browserLang);
          this.translateService.setDefaultLang(this.browserLang);
          window.location.reload();
        } else if (isPlatformServer(this.platformId)) {
          this.platform = 'Server';
        } else {
          this.platform = 'Unknown';
        }
      }
    } else if (isPlatformServer(this.platformId)) {
      this.platform = 'Server';
    } else {
      this.platform = 'Unknown';
    }
  }
  ngOnInit(): void {
    this.meta.updateTag({ name: 'title', content: 'App start' })
    this.meta.updateTag({ name: 'description', content: 'App description' })
  }
  setLanguage(direction: string): void {
    this.renderer.setAttribute(this.document.documentElement, 'dir', direction);
    this.renderer.setAttribute(this.document.documentElement, 'lang', this.currentLanguage);
    // Assuming you still want to set the class attribute to the current language
    this.renderer.setAttribute(this.document.documentElement, 'class', this.currentLanguage);
  }
}

