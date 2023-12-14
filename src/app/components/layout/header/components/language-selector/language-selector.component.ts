import { TranslationService } from './../../../../../services/translation.service';

import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
}
