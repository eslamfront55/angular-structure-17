import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, Inject, Input, PLATFORM_ID } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DynamicDialogModule, ConfirmDialogModule, RouterModule, TranslateModule, SidebarModule, CommonModule, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [DialogService, ConfirmationService]
})
export class HeaderComponent {
  private unsubscribe: Subscription[] = [];
  isUserLoggedin: boolean = false;
  currentLanguage: any;
  currentLoginInformation: any = null;

  public isVisitMegaMenuVisible = false;
  collapsedMenu: boolean = false;
  scrollDown: boolean = false;
  @Input() collapse: boolean = false;
  page: any;

  displayMenu: boolean = false;


  @HostListener("window:scroll", ["$event"])
  handleScroll(event: Event) {
    this.handleKeyDown();
  }
  ngAfterViewInit() {
    this.handleKeyDown();
  }
  handleKeyDown() {
    if (isPlatformBrowser(this.platformId)) {
      let element: any = document.querySelector(".navbar") as HTMLElement;
      if (element) {
        if (window.pageYOffset > 30) {
          element ? element.classList.add("headerScroll") : '';
        } else {
          element ? element.classList.remove("headerScroll") : '';
        }
      } else {
        console.error("Element with class 'navbar' not found");
      }
    }
  }

  onHoverMegaMenu(): void {
    this.isVisitMegaMenuVisible = true;
  }
  onLeaveMegaMenu(): void {
    this.isVisitMegaMenuVisible = false;
  }
  stopClickPropagation(event: Event): void {
    event.stopPropagation();
  }

  openPlace(): void {
    this.collapse = false;
  }
  // @HostListener("window:scroll", ["$event"])
  // handleKeyDown() {
  //   let element: any = document.querySelector(".navbar") as HTMLElement;
  //   if (window.pageYOffset > 30) {
  //     element.classList.add("headerScroll");
  //     this.scrollDown = true;
  //   } else {
  //     element.classList.remove("headerScroll");
  //     this.scrollDown = false;
  //   }
  // }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private confirmationService: ConfirmationService,
    // private publicService: PublicService,
    private dialogService: DialogService,
    // private alertsService: AlertsService,
    // private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    // if (isPlatformBrowser(this.platformId)) {
    //   this.currentLanguage = window?.localStorage?.getItem(keys?.language);
    // }
    // this.isUserLoggedin = this.authService.isLoggedIn();
    // this.publicService?.userAuthenicationChanged?.subscribe((res: any) => {
    //   if (res == true) {
    //     this.isUserLoggedin = this.authService.isLoggedIn();
    //     this.cdr.detectChanges();
    //   }
    // });

    // this.publicService?.pushUrlData?.subscribe((res: any) => {
    //   this.page = res.page;
    // })
    // if (isPlatformBrowser(this.platformId)) {
    //   if (JSON.parse(window?.localStorage?.getItem(keys?.userLoginData) || '{}')?.user) {
    //     this.currentLoginInformation = JSON.parse(window?.localStorage?.getItem(keys?.userLoginData) || '{}')?.user;
    //   }
    // }
  }

  login(): void {
    // const ref = this?.dialogService?.open(LoginComponent, {
    //   width: '80%',
    //   styleClass: 'auth-dialog',
    // });
  }
  startTrip(): void {
    // const ref: any = this?.dialogService?.open(StartTripComponent, {
    //   width: '90%',
    //   height: '87vh',
    //   dismissableMask: false,
    //   styleClass: 'start-trip-dialog',
    //   baseZIndex: 100011,
    // });
  }
  logOut(): void {
    // this.confirmationService?.confirm({
    //   message: this.publicService?.translateTextFromJson('general.areYouSureToLogout'),
    //   header: this.publicService?.translateTextFromJson('general.logout'),
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.publicService.show_loader.next(true);
    //     this.authService.signOut();
    //     this.authService?.signOut()?.subscribe(
    //       (res: any) => {
    //         // if (res?.code== 200) {
    //         if (res) {
    //           localStorage?.clear();
    //           this.publicService.userAuthenicationChanged.next(true);
    //           this.router?.navigate(['/home']);
    //           this.publicService.show_loader.next(false);
    //           if (isPlatformBrowser(this.platformId)) {
    //             window.location.reload();
    //           }

    //         } else {
    //           res?.message ? this.alertsService?.openToast('error', res?.message) : '';
    //           this.publicService.show_loader.next(false);
    //         }
    //       },
    //       (err: any) => {
    //         err ? this.alertsService?.openToast('error', err) : '';
    //         this.publicService.show_loader.next(false);
    //       }
    //     );
    //   },
    // });
  }

  explore(): void {
    // this.publicService?.showMap?.next(true);
  }
  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
