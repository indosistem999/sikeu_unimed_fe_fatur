import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { Subject, takeUntil } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { KategoriJabatanState } from 'src/app/store/pengaturan/umum/kategori-jabatan';
import { PejabatActions, PejabatState } from 'src/app/store/pengaturan/umum/pejabat';
import { SatuanKerjaState } from 'src/app/store/pengaturan/umum/satuan-kerja';

@Component({
    selector: 'app-detail-pejabat',
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
    templateUrl: './detail-pejabat.component.html',
    styleUrl: './detail-pejabat.component.scss'
})
export class DetailPejabatComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    SelectedSatker = JSON.parse(localStorage.getItem("_SIMKEU_PJB_") as any);

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'back',
            title: 'Kembali',
            icon: 'pi pi-chevron-left'
        },
        {
            id: 'add',
            title: 'Tambah Pejabat',
            icon: 'pi pi-plus'
        }
    ];

    GridProps: GridModel.IGrid = {
        id: 'GridUser',
        column: [
            { field: 'no', headerName: '#', },
            { field: 'nip', headerName: 'NIP', },
            { field: 'full_name', headerName: 'Nama Lengkap', },
            { field: 'job_category.name', headerName: 'Jabatan', },
            { field: 'work_unit.unit_name', headerName: 'Satuan Kerja', },
            { field: 'start_date_position', headerName: 'Tanggal Mulai', format: 'date' },
            { field: 'end_date_position', headerName: 'Tanggal Berakhir', format: 'date' },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        toolbar: ['Hapus', 'Edit'],
        showPaging: true,
        showSearch: true,
        showSort: true,
        searchKeyword: 'full_name',
        searchPlaceholder: 'Cari Nama Pejabat Disini',
    };
    GridSelectedData: any;

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
            id: 'form_pejabat',
            fields: [
                {
                    id: 'officers_id',
                    label: 'ID',
                    required: true,
                    type: 'text',
                    value: '',
                    hidden: true
                },
                {
                    id: 'nip',
                    label: 'NIP',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'full_name',
                    label: 'Nama Lengkap',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'posititon_name',
                    label: 'Jabatan',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'position_type',
                    label: 'Jenis Pejabat',
                    required: true,
                    type: 'select',
                    value: '',
                    dropdownProps: {
                        options: [
                            { name: 'Satker', value: 'satker' },
                            { name: 'Umum', value: 'umum' },
                        ],
                        optionName: 'name',
                        optionValue: 'value'
                    }
                },
                {
                    id: 'job_category_id',
                    label: 'Kategori Jabatan',
                    required: true,
                    type: 'select',
                    value: '',
                    dropdownProps: {
                        options: [],
                        optionName: 'name',
                        optionValue: 'job_category_id'
                    }
                },
                {
                    id: 'unit_id',
                    label: 'Satuan Kerja',
                    required: true,
                    type: 'select',
                    value: '',
                    dropdownProps: {
                        options: [],
                        optionName: 'unit_name',
                        optionValue: 'unit_id'
                    }
                },
                {
                    id: 'start_date_position',
                    label: 'Tanggal Mulai',
                    required: true,
                    type: 'date',
                    value: '',
                },
                {
                    id: 'end_date_position',
                    label: 'Tanggal Berakhir',
                    required: true,
                    type: 'date',
                    value: '',
                },
                {
                    id: 'is_not_specified',
                    label: 'Belum Bisa Ditentukan',
                    required: true,
                    type: 'radio',
                    value: '',
                    radioButtonProps: [
                        { name: 'is_not_specified', label: 'Iya', value: 1 },
                        { name: 'is_not_specified', label: 'Tidak', value: 0 },
                    ]
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-9 grid-cols-1',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {
        this.getAllPejabat();
        this.getSatuanKerja();
        this.getKategoriJabatan();
    }

    ngOnDestroy(): void {
        localStorage.removeItem("_SIMKEU_PJB_");
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getAllPejabat() {
        this._store
            .select(PejabatState.pejabatEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.GridProps.dataSource = result;
            })
    }

    private getKategoriJabatan() {
        this._store
            .select(KategoriJabatanState.kategoriJabatanEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                const index = this.FormProps.fields.findIndex(item => item.id == 'job_category_id');
                this.FormProps.fields[index].dropdownProps.options = result;
            })
    }

    private getSatuanKerja() {
        this._store
            .select(SatuanKerjaState.satuanKerjaEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                const index = this.FormProps.fields.findIndex(item => item.id == 'unit_id');
                this.FormProps.fields[index].dropdownProps.options = result;
            })
    }

    handleClickButtonNavigation(data: LayoutModel.IButtonNavigation) {
        if (data.id == 'back') {
            this._router.navigateByUrl("/pengaturan/umum/pejabat");
        };

        if (data.id == 'add') {
            this.FormState = 'insert';
            this.FormDialogToggle = true;
            this.FormComps.FormGroup.reset();
        };
    }

    onSearchGrid(args: any) {
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
                }
            });
        }

        if (args.type == 'edit') {
            this.onRowDoubleClicked(args.data);
        }
    }

    onPageChanged(args: any): void {
        console.log(args);
    }

    handleNavigate(url: string) {
        this._router.navigateByUrl(url);
    }

    handleSave(args: any) {
        this._store
            .dispatch(new PejabatActions.CreatePejabat(args))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.satuan_kerja.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Modul Berhasil Disimpan' });
                    this.FormDialogToggle = false;
                    this.FormComps.FormGroup.reset();
                }
            })
    }

    handleUpdate(args: any) {

    }

    handleDelete(args: any) {

    }

}
