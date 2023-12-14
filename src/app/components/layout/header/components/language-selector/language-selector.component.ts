import { TranslationService } from './../../../../../services/translation.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { keys } from '../../../../../configs/localstorage-key';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
  currentLanguage: any;
  language: string = '';
  page: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public translationService: TranslationService,
    // private publicService: PublicService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window?.localStorage?.getItem(keys?.language);
    }
    // this.publicService?.pushUrlData?.subscribe((res: any) => {
    //   this.page = res.page;
    // })
  }
  shouldApplyDarkToggle(): boolean {
    const includedPages = [
      'place-details',
      'store-details',
      'stores',
      'events',
      'restaurant-details',
      'stories',
      'searchResult'
    ];
    return !includedPages.includes(this.page);
  }
}
