import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ButtonModule } from 'primeng/button';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { AuthenticationModel } from 'src/app/model/pages/authentication/authentication.model';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        NavbarComponent,
        BreadcrumbsComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    UserData$ =
        this._authenticationService.UserData$
            .pipe(takeUntil(this.Destroy$));

    IsBeranda = false;

    @Input('ButtonNavigation') ButtonNavigation: any[] = [];

    @Output('onClickButtonNavigation') onClickButtonNavigation = new EventEmitter<any>();

    ShowTitle = true;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _utilityService: UtilityService,
        private _authenticationService: AuthenticationService,
    ) {
        // ** Check if route is beranda
        this._activatedRoute.url
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.IsBeranda = result[0].path == 'beranda';

                this.ShowTitle = result[0].path != 'profile' && result[0].path != 'ubah-password';
            })

        // ** Set Userdata if page is refreshed
        this._authenticationService.setUserData();

        // ** Detect navigation end
        this._router.events
            .pipe(takeUntil(this.Destroy$))
            .subscribe(event => {
                if (event instanceof NavigationStart) {
                    this._utilityService.ShowSidebar$.next(false);
                }
            });
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleClickButtonNavigation(item: LayoutModel.IButtonNavigation) {
        this.onClickButtonNavigation.emit(item);
    }
}
