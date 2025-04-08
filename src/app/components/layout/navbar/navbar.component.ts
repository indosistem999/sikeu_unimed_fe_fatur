import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { TooltipModule } from 'primeng/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { map, Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AuthenticationModel } from 'src/app/model/pages/authentication/authentication.model';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        MenuModule,
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

    Menu: AuthenticationModel.IModuleChildMenu[] = this._authenticationService.getModuleMenu();

    SelectedMenu!: AuthenticationModel.IModuleChildMenu;

    Breadcrumbs$ =
        this._activatedRoute.data
            .pipe(
                takeUntil(this.Destroy$),
                map(result => result['breadcrumbs'])
            );

    UserMenu = [
        {
            label: 'Sign Out',
            icon: 'pi pi-sign-out'
        },
    ];

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {

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
