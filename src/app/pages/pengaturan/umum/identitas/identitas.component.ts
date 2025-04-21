import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { map, Subject, takeUntil } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { GridModel } from 'src/app/model/components/grid.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { IdentitasActions, IdentitasState } from 'src/app/store/pengaturan/umum/identitas';
import { KategoriJabatanState } from 'src/app/store/pengaturan/umum/kategori-jabatan';
import { PejabatActions, PejabatState } from 'src/app/store/pengaturan/umum/pejabat';
import { SatuanKerjaState } from 'src/app/store/pengaturan/umum/satuan-kerja';

@Component({
    selector: 'app-identitas',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        ButtonModule,
        DialogModule,
        GridComponent,
        TabViewModule,
        CheckboxModule,
        InputTextModule,
        DashboardComponent,
        ConfirmDialogModule,
        DynamicFormComponent,
    ],
    templateUrl: './identitas.component.html',
    styleUrl: './identitas.component.scss'
})
export class IdentitasComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    FormState: 'insert' | 'update' = 'insert';

    FormProps: FormModel.IForm;
    @ViewChild('FormComps') FormComps!: DynamicFormComponent;

    FormKontakProps: FormModel.IForm;
    @ViewChild('FormKontakComps') FormKontakComps!: DynamicFormComponent;

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
    GridQueryParams: any = {
        page: '1',
        limit: '5'
    };

    FormPejabatProps: FormModel.IForm;
    FormPejabatDialogToggle = false;
    @ViewChild('FormPejabatComps') FormPejabatComps!: DynamicFormComponent;

    is_not_specified: boolean = false;

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _confirmationService: ConfirmationService,
        private _authenticationService: AuthenticationService,
    ) {
        this.FormProps = {
            id: 'form_logo',
            fields: [
                {
                    id: 'identity_id',
                    label: 'ID',
                    required: true,
                    type: 'text',
                    value: '',
                    hidden: true,
                },
                {
                    id: 'name',
                    label: 'Nama Universitas',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'file_logo',
                    label: 'Logo Universitas',
                    required: true,
                    type: 'fileinput',
                    file_accept: 'image/*',
                    value: '',
                    onChange: (files: File) => {
                        if (files) {
                            const type = files.name.split("."),
                                fileName = `logo_${new Date().getTime()}.${type[1]}`;

                            console.log("file name =>", fileName);
                        }
                    }
                },
            ],
            style: 'inline',
            class: 'grid-rows-2 grid-cols-1',
            state: 'write',
            defaultValue: null,
        };

        this.FormKontakProps = {
            id: 'form_kontak',
            fields: [
                {
                    id: 'phone',
                    label: 'Telepon',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'email',
                    label: 'Email',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'address',
                    label: 'Alamat',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'website',
                    label: 'Website',
                    required: true,
                    type: 'text',
                    value: '',
                },
            ],
            style: 'inline',
            class: 'grid-rows-4 grid-cols-1',
            state: 'write',
            defaultValue: null,
        };

        this.FormPejabatProps = {
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
                    },
                    onChange: (args: any) => {
                        const index = this.FormPejabatProps.fields.findIndex(item => item.id == 'unit_id');
                        if (args.value == 'umum') {
                            this.FormPejabatProps.fields[index].hidden = true;
                            this.FormPejabatProps.fields[index].required = false;
                            this.FormPejabatProps.class = 'grid-rows-7 grid-cols-1';
                        } else {
                            this.FormPejabatProps.fields[index].hidden = false;
                            this.FormPejabatProps.fields[index].required = true;
                            this.FormPejabatProps.class = 'grid-rows-8 grid-cols-1';
                        }
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
                    required: false,
                    type: 'select',
                    value: '',
                    dropdownProps: {
                        options: [],
                        optionName: 'unit_name',
                        optionValue: 'unit_id'
                    },
                    hidden: true,
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
                    readonly: true
                },
                {
                    id: 'is_not_specified',
                    label: '',
                    required: true,
                    type: 'text',
                    value: '',
                    hidden: true
                },
            ],
            style: 'inline',
            class: 'grid-rows-7 grid-cols-1',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {
        this.getAllIdentitasState();
        this.getAllPejabat();
        this.getSatuanKerja();
        this.getKategoriJabatan();

    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getAllIdentitasState() {
        this._store
            .select(IdentitasState.identitasEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result) {
                    this.FormComps.FormGroup.patchValue(result);
                    this.FormComps.ImagePreviews = {};
                    this.FormComps.ImagePreviews['file_logo'] = result.logo;
                    this.FormKontakComps.FormGroup.patchValue(result);
                }
            })
    }

    private getAllPejabat() {
        this._store
            .select(PejabatState.pejabatEntities)
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
                const index = this.FormPejabatProps.fields.findIndex(item => item.id == 'job_category_id');
                this.FormPejabatProps.fields[index].dropdownProps.options = result;
            })
    }

    private getSatuanKerja() {
        this._store
            .select(SatuanKerjaState.satuanKerjaEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                const index = this.FormPejabatProps.fields.findIndex(item => item.id == 'unit_id');
                this.FormPejabatProps.fields[index].dropdownProps.options = result;
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
            .dispatch(new PejabatActions.GetAllPejabat(this.GridQueryParams))
            .pipe(
                takeUntil(this.Destroy$),
                map((result) => result.pejabat)
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
        this.FormPejabatDialogToggle = true;

        const index = this.FormPejabatProps.fields.findIndex(item => item.id == 'unit_id');

        if (args.position_type == 'umum') {
            this.FormPejabatProps.fields[index].hidden = true;
            this.FormPejabatProps.fields[index].required = false;
            this.FormPejabatProps.class = 'grid-rows-7 grid-cols-1';
        } else {
            this.FormPejabatProps.fields[index].hidden = false;
            this.FormPejabatProps.fields[index].required = true;
            this.FormPejabatProps.class = 'grid-rows-8 grid-cols-1';
        }

        this.is_not_specified = args.end_date_position ? false : true;

        this.FormPejabatComps.FormGroup.patchValue({
            ...args,
            full_name: args.full_name,
            job_category_id: args.job_category.job_category_id,
            unit_id: args.work_unit ? args.work_unit.unit_id : "",
            start_date_position: new Date(args.start_date_position),
            end_date_position: args.end_date_position ? new Date(args.end_date_position) : "",
            is_not_specified: args.end_date_position ? 0 : 1,
        });

        this.handleChangeIsNotSpecified(args);
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
                    this.handleDeletePejabat(args.data);
                }
            });
        }

        if (args.type == 'edit') {
            this.onRowDoubleClicked(args.data);
        }
    }

    onPageChanged(args: any): void {
        console.log(args);
        this.GridQueryParams = {
            ...this.GridQueryParams,
            page: args ? args.first + 1 : 1,
            limit: args ? args.rows : 5
        };

        this.onSearchGrid(this.GridQueryParams.search)
    }

    handleChangeIsNotSpecified(args: any) {
        const index = this.FormPejabatProps.fields.findIndex(item => item.id == 'end_date_position');

        if (this.is_not_specified) {
            this.FormPejabatProps.fields[index].type = 'text';
            this.FormPejabatProps.fields[index].readonly = true;
            this.FormPejabatProps.fields[index].required = false;
            this.FormPejabatComps.FormGroup.get('end_date_position')?.setValue("");
        } else {
            this.FormPejabatProps.fields[index].type = 'date';
            this.FormPejabatProps.fields[index].readonly = false;
            this.FormPejabatProps.fields[index].required = true;
        }

        this.FormPejabatComps.FormGroup.get('is_not_specified')?.setValue(this.is_not_specified ? 1 : 0);
    }

    handleSave() {
        const payload = {
            ...this.FormComps.FormGroup.value,
            ...this.FormKontakComps.FormGroup.value,
        };

        const { identity_id, ...data } = payload;

        this._store
            .dispatch(new IdentitasActions.CreateIdentitas(data))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.identitas.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Identitas Berhasil Disimpan' });
                }
            })
    }

    handleUpdate(args: any) {
        const payload = {
            ...this.FormComps.FormGroup.value,
            ...this.FormKontakComps.FormGroup.value,
        };

        this._store
            .dispatch(new IdentitasActions.UpdateIdentitas(payload))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.identitas.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Identitas Berhasil Diperbarui' });
                }
            })
    }

    handleDelete(args: any) {
        this._store
            .dispatch(new IdentitasActions.DeleteIdentitas(args.identity_id))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.identitas.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Identitas Berhasil Dihapus' });
                }
            })
    }

    handleSavePejabat(args: any) {
        let payload = {
            ...args,
            unit_id: args.unit_id ? args.unit_id : "",
            end_date_position: args.end_date_position ? args.end_date_position : "",
            is_not_specified: args.end_date_position ? 0 : 1,
        }

        this._store
            .dispatch(new PejabatActions.CreatePejabat(payload))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.pejabat.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Pejabat Berhasil Disimpan' });
                    this.FormPejabatDialogToggle = false;
                    this.FormComps.FormGroup.reset();
                }
            })
    }

    handleUpdatePejabat(args: any) {
        let payload = {
            ...args,
            unit_id: args.unit_id ? args.unit_id : "",
            end_date_position: args.end_date_position ? args.end_date_position : "",
            is_not_specified: args.end_date_position ? 0 : 1,
        }

        this._store
            .dispatch(new PejabatActions.UpdatePejabat(payload))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.pejabat.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Pejabat Berhasil Diperbarui' });
                    this.FormPejabatDialogToggle = false;
                    this.FormComps.FormGroup.reset();
                }
            })
    }

    handleDeletePejabat(args: any) {
        this._store
            .dispatch(new PejabatActions.DeletePejabat(args.officers_id))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.pejabat.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Pejabat Berhasil Dihapus' });
                }
            })
    }
}
