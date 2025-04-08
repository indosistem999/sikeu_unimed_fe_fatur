import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Subject, takeUntil } from 'rxjs';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { GridModel } from 'src/app/model/components/grid.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
            { field: 'job_position', headerName: 'Role Akses', },
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

    QuickAccessDatasource: any[] = [
        { title: 'Tambah Role Akses', path: '/pengaturan/hak-akses/role-akses' },
        { title: 'Tambah Satuan Kerja', path: '/pengaturan/umum/satuan-kerja' },
        { title: 'Tambah Modul', path: '/pengaturan/modul' },
        { title: 'Lihat Daftar Pejabat Satuan Kerja', path: '/pengaturan/umum/pejabat' },
        { title: 'Ubah Identitas', path: '/pengaturan/profile' },
    ]

    constructor(
        private _router: Router,
        private _confirmationService: ConfirmationService,
        private _authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {
        this.GridProps.dataSource = [
            {
                no: 1,
                full_name: 'Rudi Tabuti 1',
                email: 'ruditabutisbb@gmail.com',
                phone_number: '081234567890',
                job_position: 'Super Admin',
                work_unit: null,
            },
            {
                no: 2,
                full_name: 'Rudi Tabuti 2',
                email: 'ruditabutisbb@gmail.com',
                phone_number: '081234567890',
                job_position: 'Super Admin',
                work_unit: null,
            },
            {
                no: 3,
                full_name: 'Rudi Tabuti 3',
                email: 'ruditabutisbb@gmail.com',
                phone_number: '081234567890',
                job_position: 'Super Admin',
                work_unit: null,
            },
            {
                no: 4,
                full_name: 'Rudi Tabuti 4',
                email: 'ruditabutisbb@gmail.com',
                phone_number: '081234567890',
                job_position: 'Super Admin',
                work_unit: null,
            },
            {
                no: 5,
                full_name: 'Rudi Tabuti 5',
                email: 'ruditabutisbb@gmail.com',
                phone_number: '081234567890',
                job_position: 'Super Admin',
                work_unit: null,
            },
            {
                no: 6,
                full_name: 'Rudi Tabuti 6',
                email: 'ruditabutisbb@gmail.com',
                phone_number: '081234567890',
                job_position: 'Super Admin',
                work_unit: null,
            },
            {
                no: 7,
                full_name: 'Rudi Tabuti 7',
                email: 'ruditabutisbb@gmail.com',
                phone_number: '081234567890',
                job_position: 'Super Admin',
                work_unit: null,
            },
            {
                no: 8,
                full_name: 'Rudi Tabuti 8',
                email: 'ruditabutisbb@gmail.com',
                phone_number: '081234567890',
                job_position: 'Super Admin',
                work_unit: null,
            },
            {
                no: 9,
                full_name: 'Rudi Tabuti 9',
                email: 'ruditabutisbb@gmail.com',
                phone_number: '081234567890',
                job_position: 'Super Admin',
                work_unit: null,
            },
            {
                no: 10,
                full_name: 'Rudi Tabuti 20',
                email: 'ruditabutisbb@gmail.com',
                phone_number: '081234567890',
                job_position: 'Super Admin',
                work_unit: null,
            },
        ]
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    onSearchGrid(args: any) {
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
        console.log(args);
    }

    handleNavigate(url: string) {
        this._router.navigateByUrl(url);
    }
}
