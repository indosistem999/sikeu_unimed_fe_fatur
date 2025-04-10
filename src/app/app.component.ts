import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthenticationActions, AuthenticationState } from './store/authentication';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    title = 'frontend-cis';

    Destroy$ = new Subject();

    isLoading = false;

    constructor(
        private _store: Store,
        private _router: Router,
        private _location: Location,
        private _renderer: Renderer2,
        private _activatedRoute: ActivatedRoute,
        private _authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {
        const isUserLoggedIn = this._authenticationService.getUserData();

        if (Object.keys(isUserLoggedIn).length) {
            this.isLoading = false;
            this._authenticationService.setMenu(isUserLoggedIn.id_user_group);
        } else {
            this.isLoading = false;
        }

        this.onGetProfileState();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    onGetProfileState() {
        const isExist = this._store.dispatch(new AuthenticationActions.GetProfile());
        if (isExist) {
            this._store
                .select(AuthenticationState.authEntities)
                .pipe(takeUntil(this.Destroy$))
                .subscribe((result) => {
                    if (result) {
                        const url = this._location.path();
                        !environment.production && console.log("url =>", url.length);

                        if (!url.length) {
                            this._router.navigateByUrl('/list-module')
                        }
                    }
                })
        }
    }
}
