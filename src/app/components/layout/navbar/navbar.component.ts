import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { TooltipModule } from 'primeng/tooltip';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { BehaviorSubject, filter, map, Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AuthenticationModel } from 'src/app/model/pages/authentication/authentication.model';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuState } from 'src/app/store/pengaturan/menu';
import { Store } from '@ngxs/store';
import { IdentitasState } from 'src/app/store/pengaturan/umum/identitas';
import { SafeUrlPipe } from 'src/app/middleware/pipe/safeUrl.pipe';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        MenuModule,
        SafeUrlPipe,
        CommonModule,
        DialogModule,
        ButtonModule,
        AvatarModule,
        TooltipModule,
        InputTextModule,
        OverlayPanelModule
    ],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    User$ = this._authenticationService
        .UserData$
        .pipe(takeUntil(this.Destroy$));

    ShowTopMenu = false;

    ShowSearch = false;

    IdentitasState$ = this._store
        .select(IdentitasState.identitasEntities)
        .pipe(takeUntil(this.Destroy$));

    // Menu$ = this._store
    //     .select(MenuState.menuEntities)
    //     .pipe(takeUntil(this.Destroy$));

    Menu$ = new BehaviorSubject<any>([]);

    SelectedMenu!: AuthenticationModel.IModuleChildMenu;

    Breadcrumbs$ =
        this._activatedRoute.data
            .pipe(
                takeUntil(this.Destroy$),
                map(result => result['breadcrumbs'])
            );

    UserMenu: any[] = [
        {
            label: 'Lihat Profil',
            icon: 'pi pi-user text-blue-500',
            command: () => {
                this._router.navigateByUrl('/profile')
            }
        },
        {
            label: 'Ganti Password',
            icon: 'pi pi-lock text-yellow-500',
            command: () => {
                this._authenticationService.signOut();
            }
        },
        {
            label: 'Sign Out',
            icon: 'pi pi-sign-out text-red-500',
            command: () => {
                this._authenticationService.signOut();
            }
        },
    ];

    constructor(
        private _store: Store,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {
        const module = this._authenticationService.Module$.value;

        this._router
            .events
            .pipe(takeUntil(this.Destroy$))
            .subscribe((event: any) => {
                if (event.routerEvent) {
                    if (event.routerEvent.url.includes('pengaturan') || event.routerEvent.url.includes('profile')) {
                        this.Menu$.next(module[0].module_menu);
                    };

                    if (event.routerEvent.url.includes('sppd')) {
                        this.Menu$.next(module[1].module_menu);
                    };
                }

                if (event instanceof NavigationEnd) {
                    if (event.url.includes('pengaturan') || event.url.includes('profile')) {
                        this.Menu$.next(module[0].module_menu);
                    };

                    if (event.url.includes('sppd')) {
                        this.Menu$.next(module[1].module_menu);
                    };
                }
            });
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleNavigateToMenu(url: string) {
        this._router.navigateByUrl(url);
    }

    onSignOut() {
        this._utilityService.ShowLoading$.next(true);

        setTimeout(() => {
            this._utilityService.ShowLoading$.next(false);
            this._messageService.clear();
            this._messageService.add({ severity: 'success', detail: 'Success', summary: 'Sign Out Succesfully' });
            this._router.navigateByUrl("");
            localStorage.clear();
        }, 2000);
    }
}   
