import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthenticationActions, AuthenticationState } from './store/authentication';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { ModulActions } from './store/pengaturan/module';
import { UserActions } from './store/pengaturan/umum/user';
import { SatuanKerjaActions } from './store/pengaturan/umum/satuan-kerja';
import { IdentitasActions } from './store/pengaturan/umum/identitas';
import { SumberDanaActions } from './store/pengaturan/umum/sumber-dana';
import { KategoriJabatanActions } from './store/pengaturan/umum/kategori-jabatan';
import { RoleActions } from './store/pengaturan/hak-akses/role';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    title = 'frontend-cis';

    Destroy$ = new Subject();

    isLoading = false;

    IsPengaturanStateInited = false;

    constructor(
        private _store: Store,
        private _router: Router,
        private _location: Location,
        private _renderer: Renderer2,
        private _activatedRoute: ActivatedRoute,
        private _authenticationService: AuthenticationService,
    ) {
        this._router.events
            .pipe(takeUntil(this.Destroy$))
            .subscribe((event: any) => {
                if (event instanceof NavigationEnd) {

                    // ** Load setup data state
                    if ((event.url.includes('pengaturan') || event.url.includes('pengatuan')) && !this.IsPengaturanStateInited) {
                        this.initPengaturanState();
                    }
                }
            });
    }

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

    private onGetProfileState() {
        const isExist = this._store.dispatch(new AuthenticationActions.GetProfile());
        if (isExist) {
            this._store
                .select(AuthenticationState.authEntities)
                .pipe(takeUntil(this.Destroy$))
                .subscribe((result) => {
                    if (result) {
                        const url = this._location.path();
                        !environment.production && console.log("url =>", url);

                        if (!url.length) {
                            this._router.navigateByUrl('/list-module')
                        }
                    }
                })
        }
    }

    private initPengaturanState() {
        this.IsPengaturanStateInited = true;

        // ** Dispatch Modul State
        this._store
            .dispatch(new ModulActions.GetAllModul())
            .pipe(takeUntil(this.Destroy$));

        // ** Dispatch User State
        this._store
            .dispatch(new UserActions.GetAllUser({ page: '1', limit: '5' }))
            .pipe(takeUntil(this.Destroy$));

        // ** Dispatch Satuan Kerja State
        this._store
            .dispatch(new SatuanKerjaActions.GetAllSatuanKerja({ page: '1', limit: '5' }))
            .pipe(takeUntil(this.Destroy$));

        // ** Dispatch Identitas State
        this._store
            .dispatch(new IdentitasActions.GetAllIdentitas({ page: '1', limit: '5' }))
            .pipe(takeUntil(this.Destroy$));

        // ** Dispatch Sumber Dana State
        this._store
            .dispatch(new SumberDanaActions.GetAllSumberDana({ page: '1', limit: '5' }))
            .pipe(takeUntil(this.Destroy$));

        // ** Dispatch Kategori Jabatan State
        this._store
            .dispatch(new KategoriJabatanActions.GetAllKategoriJabatan({ page: '1', limit: '5' }))
            .pipe(takeUntil(this.Destroy$));

        // ** Dispatch Role State
        this._store
            .dispatch(new RoleActions.GetAllRole({ page: '1', limit: '5' }))
            .pipe(takeUntil(this.Destroy$));
    }
}
