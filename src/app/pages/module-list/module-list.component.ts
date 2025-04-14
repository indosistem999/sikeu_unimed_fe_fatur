import { CommonModule } from '@angular/common';
import { Component, model, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ButtonModule } from 'primeng/button';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { AuthenticationModel } from 'src/app/model/pages/authentication/authentication.model';
import { ModulModel } from 'src/app/model/pages/pengaturan/module/modul.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AuthenticationState } from 'src/app/store/authentication';
import { ModulActions, ModuleState } from 'src/app/store/pengaturan/module';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-module-list',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
    ],
    templateUrl: './module-list.component.html',
    styleUrl: './module-list.component.scss'
})
export class ModuleListComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    Module$ = this._store
        .select(ModuleState.modulEntities)
        .pipe(takeUntil(this.Destroy$));

    User$ = this._store
        .select(AuthenticationState.authEntities)
        .pipe(takeUntil(this.Destroy$));

    ActiveModule!: ModulModel.IModul;

    constructor(
        private _store: Store,
        private _router: Router,
        private _authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {
        this.getAll();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getAll() {
        this._store
            .dispatch(new ModulActions.GetAllModul())
            .pipe(takeUntil(this.Destroy$));
    }

    handleNavigate(item: ModulModel.IModul, url: string) {
        // localStorage.setItem("_SIMKEU_MN_", JSON.stringify(item.module_menu ? item.module_menu : []));
        this._router.navigateByUrl(url);
    }

}
