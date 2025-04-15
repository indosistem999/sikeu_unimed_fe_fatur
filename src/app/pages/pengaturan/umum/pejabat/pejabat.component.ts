import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { map, Subject, takeUntil } from 'rxjs';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { GridModel } from 'src/app/model/components/grid.model';
import { SatuanKerjaModel } from 'src/app/model/pages/pengaturan/umum/satuan-kerja.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SatuanKerjaActions, SatuanKerjaState } from 'src/app/store/pengaturan/umum/satuan-kerja';

@Component({
    selector: 'app-pejabat',
    standalone: true,
    imports: [
        CommonModule,
        GridComponent,
        DashboardComponent,
        ConfirmDialogModule,
    ],
    templateUrl: './pejabat.component.html',
    styleUrl: './pejabat.component.scss'
})
export class PejabatComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    GridProps: GridModel.IGrid = {
        id: 'GridUser',
        column: [
            { field: 'no', headerName: '#', },
            { field: 'unit_name', headerName: 'Satuan Kerja', },
            { field: 'pejabat', headerName: 'Pejabat', },
            { field: 'bendahara', headerName: 'Bendahara', },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        toolbar: ['Detail'],
        showPaging: true,
        showSearch: true,
        showSort: true,
        searchKeyword: 'unit_name',
        searchPlaceholder: 'Cari Satuan Kerja Disini',
    };
    GridSelectedData: any;
    GridQueryParams: SatuanKerjaModel.GetAllQuery = { page: '1', limit: '5' };

    constructor(
        private _store: Store,
        private _router: Router,
        private _authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {
        this.getAllSatuanKerjaState();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getAllSatuanKerjaState() {
        this._store
            .select(SatuanKerjaState.satuanKerjaPejabatEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.GridProps.dataSource = result!;
            })
    }

    onSearchGrid(args: any) {
        if (args) {
            this.GridQueryParams = {
                ...this.GridQueryParams,
                search: args
            }
        } else {
            delete this.GridQueryParams.search;
        }

        this._store
            .dispatch(new SatuanKerjaActions.GetAllPejabatSatuanKerja(this.GridQueryParams))
            .pipe(
                takeUntil(this.Destroy$),
                map((result) => result.user)
            )
            .subscribe((result) => {
                this.GridProps.dataSource = result.pejabat;
            })
    }

    onToolbarClicked(args: any): void {
        if (args.type == 'detail') {
            localStorage.setItem("_SIMKEU_PJB_", JSON.stringify(args.data));
            this._router.navigateByUrl(`/pengaturan/umum/pejabat/detail?id=${args.data.no}`)
        }
    }

    onPageChanged(args: any): void {
        this.GridQueryParams = {
            ...this.GridQueryParams,
            page: args ? args.first + 1 : 1,
            limit: args ? args.rows : 5
        };

        this.onSearchGrid(this.GridQueryParams.search)
    }

    handleNavigate(url: string) {
        this._router.navigateByUrl(url);
    }
}
