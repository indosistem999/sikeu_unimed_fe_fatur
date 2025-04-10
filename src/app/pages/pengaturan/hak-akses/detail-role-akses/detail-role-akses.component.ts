import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { Subject, takeUntil } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
    selector: 'app-detail-role-akses',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        DialogModule,
        GridComponent,
        InputSwitchModule,
        DashboardComponent,
        ConfirmDialogModule,
        DynamicFormComponent,
    ],
    templateUrl: './detail-role-akses.component.html',
    styleUrl: './detail-role-akses.component.scss'
})
export class DetailRoleAksesComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    PageState: 'list' | 'config' = 'list';

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'back',
            title: 'Kembali',
            icon: 'pi pi-chevron-left'
        }
    ];

    Module$ = this._authenticationService
        .Module$
        .pipe(takeUntil(this.Destroy$));

    constructor(
        private _store: Store,
        private _router: Router,
        private _authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }


    handleClickButtonNavigation(data: LayoutModel.IButtonNavigation) {
        if (data.id == 'back') {
            this._router.navigateByUrl('/pengaturan/hak-akses/role-akses');
        };
    }
}
