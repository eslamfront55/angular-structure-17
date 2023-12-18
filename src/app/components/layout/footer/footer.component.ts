import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { CommonModule, Location, isPlatformBrowser, isPlatformServer } from '@angular/common';

import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { Meta, Title } from '@angular/platform-browser';

import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { RatingModule } from 'primeng/rating';
import { Subscription } from 'rxjs';
import { MetadataService } from '../../../services/generic/SEO/metadata.service';
import { keys } from '../../../configs/localstorage-key';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule, TabViewModule, SidebarModule, RatingModule,
    InputTextModule, TranslateModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  currentLanguage: any;
  imageBaseUrl: any = 'https://dashboard.hawdaj.net';
  currentLoginInformation: any;

  isLoadingSavePlace: boolean = false;
  @ViewChild('locationTab') locationTab!: ElementRef;
  activeIndex: any = 0;
  // Start Map Configs
  selecedMarker: any = null;

  zoom: any = 5;
  markerPositions: any[] = [];


  placeDetails: any;
  isLoadingPlaceDetails: boolean = false;
  placeId: any;

  showGalleria: boolean = false;

  relatedPlaces: any;
  isLoadingRelatedPlaces: boolean = false;

  form = this.fb.group(
    {
      status: [null, [Validators.required]],
      massage: ['', { validators: [Validators.required, Validators.minLength(10)], updateOn: 'blur' }],
    }
  );
  get formControls(): any {
    return this.form?.controls;
  }
  isLoadingBtn: boolean = false;

  chat: any = [];
  isLoadingChat: boolean = false;
  selectedFile: any = '';
  chatForm = this.fb.group({
    message: ['', { validators: [Validators.required], updateOn: 'change' }],
  });
  fullUrl: any = null;
  displayChat: boolean = false;
  siteName!: String;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private metadataService: MetadataService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private location: Location,
    private fb: FormBuilder,
    private router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.siteName = 'هودج';
    if (isPlatformBrowser(this.platformId)) {
      if (JSON.parse(window?.localStorage?.getItem(keys?.userLoginData) || '{}')?.user) {
        this.currentLoginInformation = JSON.parse(window?.localStorage?.getItem(keys?.userLoginData) || '{}')?.user;
      }
    }
    this.initPageData();
  }
  private initPageData(): void {
    this.setupBrowserSpecificTasks();

    this.getPLaceDataById(this.placeId);

  }
  private setupBrowserSpecificTasks(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = localStorage.getItem(keys.language);
    }
  }

  getPLaceDataById(id: any, preventLoading?: boolean): void {
    this.metadataService?.getPLaceById(id)?.subscribe(
      (res: any) => {
        if (res?.code == 200) {
          this.placeDetails = res?.data;
          console.log(this.placeDetails);

          if (isPlatformBrowser(this.platformId)) {
            this.updateMetaTags();
          }
          if (isPlatformServer(this.platformId)) {
            this.updateMetaTags();
          }
          console.log(this.placeDetails);


          if (this.placeDetails?.region?.name && this.placeDetails?.city?.name) {
            this.placeDetails['address_name'] = this.placeDetails?.region?.name + ', ' + this.placeDetails?.city?.name;
          } else if (this.placeDetails?.region?.name) {
            this.placeDetails['address_name'] = this.placeDetails?.region?.name;
          } else if (this.placeDetails?.city?.name) {
            this.placeDetails['address_name'] = this.placeDetails?.city?.name;
          }
          this.cdr.detectChanges();
        } else {
        }
      },
      (err: any) => {
      }
    );
  }
  private updateMetaTags(): void {
    this.metadataService.updateTitle(`${this.siteName} | ${this.placeDetails.slug}`);
    this.metadataService.updateMetaTagsName([
      { name: 'title', content: `${this.siteName} | ${this.placeDetails.slug}` },
      { name: 'description', content: this.placeDetails.address },
    ]);
    this.metadataService.updateMetaTagsProperty([
      { property: 'og:url', content: `/places/details/${this.placeDetails.slug}` },
      { property: 'og:title', content: `${this.siteName} | ${this.placeDetails.slug}` },
      { property: 'og:description', content: this.placeDetails.address },
      { property: 'og:image', content: this.imageBaseUrl + '/' + this.placeDetails.image },
    ]);
  }

  savePlace(): void {

  }
  goToLocation(): void {
    if (this.locationTab) {
      this.activeIndex = 2;
      if (isPlatformBrowser(this.platformId)) {
        this.locationTab.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  recallNewPlaceDetails(id: number): void {
    this.router.navigate(['/places/details/', id]);
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    this.getPLaceDataById(id);
    this.getRelatedPlaces(id);
  }
  getRelatedPlaces(id?: any, preventLoading?: boolean): void {

  }

  sendFeedbackFromPlaces(): void {
  }
  cancel(): void {
    this.form?.reset();
  }

  getChatGpt(): void {
    this.isLoadingChat = true;
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    if (this.selectedFile.size <= 5000) {
      this.chatForm.patchValue({
        message: this.selectedFile.name
      });
      // this.chatForm.setValue()
    }
  }
  addToChat(e: any, message: any): void {
    this.chat.push({ text: message?.value, type: 'two' }),
      message.value = '';
    setTimeout(() => {
      this.chat.push({ text: 'Thank You', type: 'one' })
    }, 5000)
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(e.yPosition)
    }
  }
  share(link: any): void {
  }
  back(): void {
    this.location?.back();
  }
  showMap(): void {

  }
  showReviews(): void {

  }
  openComingSoon(): void {

  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
