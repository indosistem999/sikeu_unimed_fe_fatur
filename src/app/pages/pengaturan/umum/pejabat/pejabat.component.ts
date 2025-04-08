import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Subject } from 'rxjs';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { GridModel } from 'src/app/model/components/grid.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

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

    constructor(
        private _router: Router,
        private _authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {
        this.GridProps.dataSource = [
            { no: 1, pejabat: 'Andi', bendahara: 'Jane Doe', unit_name: 'Finance Department' },
            { no: 2, pejabat: 'Andi', bendahara: 'Jane Doe', unit_name: 'Human Resources' },
            { no: 3, pejabat: 'Andi', bendahara: 'Jane Doe', unit_name: 'Information Technology' },
            { no: 4, pejabat: 'Andi', bendahara: 'Jane Doe', unit_name: 'Marketing Division' },
            { no: 5, pejabat: 'Andi', bendahara: 'Jane Doe', unit_name: 'Operations Unit' },
            { no: 6, pejabat: 'Andi', bendahara: 'Jane Doe', unit_name: 'Procurement Division' },
            { no: 7, pejabat: 'Andi', bendahara: 'Jane Doe', unit_name: 'Engineering Team' },
            { no: 8, pejabat: 'Andi', bendahara: 'Jane Doe', unit_name: 'Quality Assurance' },
            { no: 9, pejabat: 'Andi', bendahara: 'Jane Doe', unit_name: 'Research and Development' },
            { no: 10, pejabat: 'Andi', bendahara: 'Jane Doe', unit_name: 'Administration' }
        ];
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    onSearchGrid(args: any) {
    }

    onToolbarClicked(args: any): void {
        if (args.type == 'detail') {
            this._router.navigateByUrl(`/pengaturan/umum/pejabat/detail?id=${args.data.no}`)
        }
    }

    onPageChanged(args: any): void {
        console.log(args);
    }

    handleNavigate(url: string) {
        this._router.navigateByUrl(url);
    }
}
