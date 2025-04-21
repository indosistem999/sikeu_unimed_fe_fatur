import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { map, Subject, takeUntil } from 'rxjs';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { GridModel } from 'src/app/model/components/grid.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Store } from '@ngxs/store';
import { UserModel } from 'src/app/model/pages/pengaturan/module/user.model';
import { UserActions, UserState } from 'src/app/store/pengaturan/umum/user';
import { DialogModule } from 'primeng/dialog';
import { UserFormComponent } from '../umum/user/user-form/user-form.component';

@Component({
    selector: 'app-beranda',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        GridComponent,
        DashboardComponent,
        ConfirmDialogModule,
        DialogModule,
        UserFormComponent
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
            { field: 'gender', headerName: 'Jenis Kelamin' },
            { field: 'role.role_name', headerName: 'Role Akses', },
            { field: 'work_unit.unit_name', headerName: 'Satuan Kerja', },
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
    GridSelectedData: any;
    FormState: 'insert' | 'update' = 'insert';
    FormDialogToggle = false;

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
        private _messageService: MessageService,
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
                this.GridProps.dataSource = result.map((item: any) => ({
                    ...item,
                    gender: item.gender === 'L' ? 'Laki-laki' : item.gender === 'P' ? 'Perempuan' : '-',
                    original_gender: item.gender // Keep original gender value
                }));
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
        this.GridSelectedData = args;
    }

    onRowDoubleClicked(args: any): void {
        this.FormState = 'update';
        this.FormDialogToggle = true;
        this.GridSelectedData = {
            ...args,
            gender: args.original_gender || args.gender
        };
    }

    onToolbarClicked(args: any): void {
        const actionType = args.type?.toLowerCase();
        
        if (actionType === 'hapus') {
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
                    this.handleDelete(args.data);
                }
            });
        }

        if (actionType === 'edit') {
            this.onRowDoubleClicked(args.data);
        }
    }

    handleDelete(args: any) {
        this._store
            .dispatch(new UserActions.DeleteUser(args.user_id))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.user.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'User Berhasil Dihapus' });
                }
            })
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

    onAddUserClick() {
        this.FormState = 'insert';
        this.FormDialogToggle = true;
    }

    handleSave(args: any) {
        this._store
            .dispatch(new UserActions.CreateUser(args))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.user.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'User Berhasil Disimpan' });
                    this.FormDialogToggle = false;
                }
            })
    }

    handleUpdate(args: any) {
        if (!this.GridSelectedData?.user_id) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: 'User ID tidak ditemukan' });
            return;
        }

        const updateData = {
            user_id: this.GridSelectedData.user_id,
            ...args
        };

        this._store
            .dispatch(new UserActions.UpdateUser(updateData))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.user.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'User Berhasil Diperbarui' });
                    this.FormDialogToggle = false;
                }
            })
    }
}
