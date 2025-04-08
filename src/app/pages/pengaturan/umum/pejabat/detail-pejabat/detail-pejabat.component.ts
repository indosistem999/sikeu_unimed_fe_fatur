import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { Subject } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

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
            { field: 'full_name', headerName: 'Kode Unit', },
            { field: 'job_position', headerName: 'Jabatan', },
            { field: 'start_work_at', headerName: 'Tanggal Mulai', format: 'date' },
            { field: 'end_work_at', headerName: 'Tanggal Berakhir', format: 'date' },
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
        private _router: Router,
        private _confirmationService: ConfirmationService,
        private _authenticationService: AuthenticationService,
    ) {
        this.FormProps = {
            id: 'form_pejabat',
            fields: [
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
                    id: 'job_position',
                    label: 'Jabatan',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'start_work_at',
                    label: 'Tanggal Mulai',
                    required: true,
                    type: 'date',
                    value: '',
                },
                {
                    id: 'end_work_at',
                    label: 'Tanggal Berakhir',
                    required: true,
                    type: 'date',
                    value: '',
                },
                {
                    id: 'has_determined',
                    label: 'Belum Bisa Ditentukan',
                    required: true,
                    type: 'checkbox',
                    value: '',
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-6 grid-cols-1',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {
        this.GridProps.dataSource = [
            { no: 1, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Kaprodi', start_work_at: new Date('2000-01-01'), end_work_at: null },
            { no: 2, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Kaprodi', start_work_at: new Date('2000-01-01'), end_work_at: null },
            { no: 3, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Kaprodi', start_work_at: new Date('2000-01-01'), end_work_at: null },
            { no: 4, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Kaprodi', start_work_at: new Date('2000-01-01'), end_work_at: null },
            { no: 5, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Kaprodi', start_work_at: new Date('2000-01-01'), end_work_at: null },
            { no: 6, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Kaprodi', start_work_at: new Date('2000-01-01'), end_work_at: null },
            { no: 7, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Kaprodi', start_work_at: new Date('2000-01-01'), end_work_at: null },
            { no: 8, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Kaprodi', start_work_at: new Date('2000-01-01'), end_work_at: null },
            { no: 9, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Kaprodi', start_work_at: new Date('2000-01-01'), end_work_at: null },
            { no: 10, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Kaprodi', start_work_at: new Date('2000-01-01'), end_work_at: null },
        ];
    }

    ngOnDestroy(): void {
        localStorage.removeItem("_SIMKEU_PJB_");
        this.Destroy$.next(0);
        this.Destroy$.complete();
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

    }

    handleUpdate(args: any) {

    }

    handleDelete(args: any) {

    }

}
