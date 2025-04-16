import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { map, Subject, takeUntil } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { UserModel } from 'src/app/model/pages/pengaturan/module/user.model';
import { PejabatModel } from 'src/app/model/pages/pengaturan/umum/pejabat.model';
import { SatuanKerjaModel } from 'src/app/model/pages/pengaturan/umum/satuan-kerja.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { KategoriJabatanState } from 'src/app/store/pengaturan/umum/kategori-jabatan';
import { PejabatActions, PejabatState } from 'src/app/store/pengaturan/umum/pejabat';
import { SatuanKerjaState } from 'src/app/store/pengaturan/umum/satuan-kerja';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-detail-pejabat',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        ButtonModule,
        DialogModule,
        GridComponent,
        DropdownModule,
        CalendarModule,
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

    KelompokJabatanDatasource: any[] = [];

    job_category_id: any;
    start_date_position: any;
    end_date_position: any;

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
    GridQueryParams: PejabatModel.GetAllInSatkerQuery = {
        unit_id: this._activatedRoute.snapshot.queryParams['id'],
        page: '1',
        limit: '5'
    };

    FormState: 'insert' | 'update' = 'insert';
    FormProps: FormModel.IForm;
    FormDialogToggle = false;
    @ViewChild('FormComps') FormComps!: DynamicFormComponent;

    constructor(
        private _store: Store,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
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

        this.onSearchGrid("");
    }

    ngOnDestroy(): void {
        localStorage.removeItem("_SIMKEU_PJB_");
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getAllPejabat() {
        this._store
            .select(PejabatState.pejabatSatker)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.GridProps.dataSource = result!;
            })
    }

    private getKategoriJabatan() {
        this._store
            .select(KategoriJabatanState.kategoriJabatanEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                const index = this.FormProps.fields.findIndex(item => item.id == 'job_category_id');
                this.FormProps.fields[index].dropdownProps.options = result;

                this.KelompokJabatanDatasource = result;
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

    onSearchGrid(args: any, job_category_id?: string, start_date_position?: Date, end_date_position?: Date) {
        if (args) {
            this.GridQueryParams = {
                ...this.GridQueryParams,
                search: args
            }
        } else {
            delete this.GridQueryParams.search;
        }

        if (job_category_id) {
            this.GridQueryParams.job_category_id = job_category_id;
        } else {
            delete this.GridQueryParams.job_category_id;
        }

        if (start_date_position) {
            this.GridQueryParams.start_date_position = this._utilityService.onFormatDate(new Date(start_date_position), 'yyyy-MM-DD')
        } else {
            delete this.GridQueryParams.start_date_position;
        }

        if (end_date_position) {
            this.GridQueryParams.end_date_position = this._utilityService.onFormatDate(new Date(end_date_position), 'yyyy-MM-DD')
        } else {
            delete this.GridQueryParams.end_date_position;
        }

        this._store
            .dispatch(new PejabatActions.GetAllPejabatInSatker(this.GridQueryParams))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                !environment.production && console.log(result.pejabat.satker);
            })
    }

    onCellClicked(args: any): void {
        this.GridSelectedData = args;
    }

    onRowDoubleClicked(args: any): void {
        this.FormState = 'update';
        this.FormDialogToggle = true;
        this.FormComps.FormGroup.patchValue({
            ...args,
            full_name: args.full_name,
            job_category_id: args.job_category.job_category_id,
            unit_id: args.work_unit.unit_id,
            start_date_position: new Date(args.start_date_position),
            end_date_position: new Date(args.end_date_position),
            is_not_specified: args.end_date_position ? 0 : 1
        });
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
