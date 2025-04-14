import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { Subject, takeUntil, map } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { KategoriJabatanModel } from 'src/app/model/pages/pengaturan/umum/kategori-jabatan.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { KategoriJabatanState, KategoriJabatanActions } from 'src/app/store/pengaturan/umum/kategori-jabatan';

@Component({
    selector: 'app-kategori-jabatan',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        DialogModule,
        GridComponent,
        DashboardComponent,
        ConfirmDialogModule,
        DynamicFormComponent,
    ],
    templateUrl: './kategori-jabatan.component.html',
    styleUrl: './kategori-jabatan.component.scss'
})
export class KategoriJabatanComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'add',
            title: 'Tambah Kategori Jabatan',
            icon: 'pi pi-plus'
        }
    ];

    GridProps: GridModel.IGrid = {
        id: 'GridUser',
        column: [
            { field: 'no', headerName: '#', },
            { field: 'job_category_id', headerName: 'ID', },
            { field: 'code', headerName: 'Kode', },
            { field: 'name', headerName: 'Nama Jabatan', },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        toolbar: ['Hapus', 'Edit'],
        showPaging: true,
        showSearch: true,
        showSort: true,
        searchKeyword: 'unit_name',
        searchPlaceholder: 'Cari Satuan Kerja Disini',
    };
    GridSelectedData: any;
    GridQueryParams: KategoriJabatanModel.GetAllQuery = { page: '1', limit: '5' };

    FormState: 'insert' | 'update' = 'insert';
    FormProps: FormModel.IForm;
    FormDialogToggle = false;
    @ViewChild('FormComps') FormComps!: DynamicFormComponent;

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _confirmationService: ConfirmationService,
        private _authenticationService: AuthenticationService,
    ) {
        this.FormProps = {
            id: 'form_kategori_jabatan',
            fields: [
                {
                    id: 'job_category_id',
                    label: 'ID',
                    required: true,
                    type: 'text',
                    value: '',
                    readonly: true
                },
                {
                    id: 'code',
                    label: 'Kode',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'name',
                    label: 'Nama Jabatan',
                    required: true,
                    type: 'text',
                    value: '',
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-3 grid-cols-1',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {
        this.getAllKategoriJabatanState();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getAllKategoriJabatanState() {
        this._store
            .select(KategoriJabatanState.kategoriJabatanEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.GridProps.dataSource = result;
            })
    }

    handleClickButtonNavigation(data: LayoutModel.IButtonNavigation) {
        if (data.id == 'add') {
            this.FormState = 'insert';
            this.FormDialogToggle = true;
            this.FormComps.FormGroup.reset();
        };
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
            .dispatch(new KategoriJabatanActions.GetAllKategoriJabatan(this.GridQueryParams))
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
        this.FormComps.FormGroup.patchValue(args);
    }

    onToolbarClicked(args: any): void {
        if (args.type == 'hapus') {
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

        if (args.type == 'edit') {
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

    handleSave(args: any) {
        this._store
            .dispatch(new KategoriJabatanActions.CreateKategoriJabatan(args))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.module.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Modul Berhasil Disimpan' });
                    this.FormDialogToggle = false;
                    this.FormComps.FormGroup.reset();
                }
            })
    }

    handleUpdate(args: any) {
        this._store
            .dispatch(new KategoriJabatanActions.UpdateKategoriJabatan(args))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.module.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Modul Berhasil Diperbarui' });
                    this.FormDialogToggle = false;
                    this.FormComps.FormGroup.reset();
                }
            })
    }

    handleDelete(args: any) {
        this._store
            .dispatch(new KategoriJabatanActions.DeleteKategoriJabatan(args.unit_id))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.module.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Modul Berhasil Dihapus' });
                }
            })
    }

}
