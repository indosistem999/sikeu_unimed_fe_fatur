import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { map, Subject, takeUntil } from 'rxjs';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { GridModel } from 'src/app/model/components/grid.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Store } from '@ngxs/store';
import { UserModel } from 'src/app/model/pages/pengaturan/user.model';
import { UserActions, UserState } from 'src/app/store/pengaturan/umum/user';

@Component({
    selector: 'app-beranda',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        GridComponent,
        DashboardComponent,
        ConfirmDialogModule
    ],
    templateUrl: './beranda.component.html',
    styleUrl: './beranda.component.scss'
})
export class BerandaComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    GridProps: GridModel.IGrid = {
        id: 'GridUser',
        column: [
            { field: 'no', headerName: '#', },
            { field: 'full_name', headerName: 'Nama', },
            { field: 'email', headerName: 'Email', },
            { field: 'phone_number', headerName: 'No. HP', },
            { field: 'role.role_name', headerName: 'Role Akses', },
            { field: 'work_unit', headerName: 'Satuan Kerja', },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        toolbar: ['Hapus', 'Edit'],
        showPaging: true,
        showSearch: true,
        showSort: true,
        searchKeyword: 'role',
        searchPlaceholder: 'Cari User Disini',
    };

    GridQueryParams: UserModel.GetAllQuery = { page: '1', limit: '5' };

    QuickAccessDatasource: any[] = [
        { title: 'Tambah Role Akses', path: '/pengaturan/hak-akses/role-akses' },
        { title: 'Tambah Satuan Kerja', path: '/pengaturan/umum/satuan-kerja' },
        { title: 'Tambah Modul', path: '/pengaturan/modul' },
        { title: 'Lihat Daftar Pejabat Satuan Kerja', path: '/pengaturan/umum/pejabat' },
        { title: 'Ubah Identitas', path: '/pengaturan/profile' },
    ];

    constructor(
        private _store: Store,
        private _router: Router,
        private _confirmationService: ConfirmationService,
        private _authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {
        this.getAllUserState();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getAllUserState() {
        this._store
            .select(UserState.userEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.GridProps.dataSource = result;
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
            .dispatch(new UserActions.GetAllUser(this.GridQueryParams))
            .pipe(
                takeUntil(this.Destroy$),
                map((result) => result.user)
            )
            .subscribe((result) => {
                this.GridProps.dataSource = result.entities;
            })
    }

    onCellClicked(args: any): void {

    }

    onRowDoubleClicked(args: any): void {

    }

    onToolbarClicked(args: any): void {
        if (args.type == 'delete') {
            this._confirmationService.confirm({
                target: (<any>event).target as EventTarget,
                message: 'Data Yang Dihapus Tidak Dapat Dikembalikan',
                header: 'Apakah Anda Yakin?',
                icon: 'pi pi-info-circle',
                acceptButtonStyleClass: "p-button-danger p-button-sm",
                rejectButtonStyleClass: "p-button-secondary p-button-sm",
                acceptIcon: "none",
                acceptLabel: 'Iya, saya yakin',
                rejectIcon: "none",
                rejectLabel: 'Tidak, kembali',
                accept: () => {
                }
            });
        }

        if (args.type == 'detail') {
            this.onRowDoubleClicked(args.data);
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
