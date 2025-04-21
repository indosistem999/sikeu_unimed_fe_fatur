import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { GridModel } from 'src/app/model/components/grid.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
    selector: 'app-log-aktifitas',
    standalone: true,
    imports: [
        CommonModule,
        GridComponent,
        DashboardComponent,
    ],
    templateUrl: './log-aktifitas.component.html',
    styleUrl: './log-aktifitas.component.scss'
})
export class LogAktifitasComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    GridProps: GridModel.IGrid = {
        id: 'GridPejabat',
        column: [
            { field: 'no', headerName: '#', },
            { field: 'created_at', headerName: 'Waktu', format: 'date' },
            { field: 'ip_address', headerName: 'IP Address', },
            { field: 'browser_name', headerName: 'Browser', },
            { field: 'description', headerName: 'Aktivitas', },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        showPaging: true,
        showSearch: true,
        showSort: true,
        searchKeyword: 'description',
        searchPlaceholder: 'Cari Aktivitas Disini',
    };
    GridQueryParams: any = { page: '1', limit: '5' };


    constructor(
        private _authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {
        this.onSearchGrid(this.GridQueryParams);
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    onPageChanged(args: any): void {
        this.GridQueryParams = {
            page: args ? args.first + 1 : 1,
            limit: args ? args.rows : 5
        };

        this.onSearchGrid(this.GridQueryParams)
    }

    onSearchGrid(args: any) {
        this._authenticationService
            .getLogActivity(args)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.GridProps.dataSource = result.data.records.map((item: any, index: number) => {
                    return {
                        no: index + 1,
                        ...item
                    }
                });
            })
    }

}
