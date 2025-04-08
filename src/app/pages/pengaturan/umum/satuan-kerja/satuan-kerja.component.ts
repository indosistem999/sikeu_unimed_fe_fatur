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
    selector: 'app-satuan-kerja',
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
    templateUrl: './satuan-kerja.component.html',
    styleUrl: './satuan-kerja.component.scss'
})
export class SatuanKerjaComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'add',
            title: 'Tambah Satuan Kerja',
            icon: 'pi pi-plus'
        }
    ];

    GridProps: GridModel.IGrid = {
        id: 'GridUser',
        column: [
            { field: 'no', headerName: '#', },
            { field: 'unit_id', headerName: 'ID', },
            { field: 'unit_code', headerName: 'Kode Unit', },
            { field: 'unit_type', headerName: 'Singkatan', },
            { field: 'unit_name', headerName: 'Satuan Kerja', },
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
            id: 'form_satuan_kerja',
            fields: [
                {
                    id: 'unit_id',
                    label: 'ID',
                    required: true,
                    type: 'text',
                    value: '',
                    readonly: true
                },
                {
                    id: 'unit_code',
                    label: 'Kode Unit',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'unit_type',
                    label: 'Singkatan',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'unit_name',
                    label: 'Nama Satuan Kerja',
                    required: true,
                    type: 'text',
                    value: '',
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-4 grid-cols-1',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {
        this.GridProps.dataSource = [
            { no: 1, unit_id: 101, unit_code: 'FIN-01', unit_type: 'FIN', unit_name: 'Finance Department' },
            { no: 2, unit_id: 102, unit_code: 'HR-01', unit_type: 'HR', unit_name: 'Human Resources' },
            { no: 3, unit_id: 103, unit_code: 'IT-01', unit_type: 'IT', unit_name: 'Information Technology' },
            { no: 4, unit_id: 104, unit_code: 'MKT-01', unit_type: 'MKT', unit_name: 'Marketing Division' },
            { no: 5, unit_id: 105, unit_code: 'OPS-01', unit_type: 'OPS', unit_name: 'Operations Unit' },
            { no: 6, unit_id: 106, unit_code: 'PRC-01', unit_type: 'PRC', unit_name: 'Procurement Division' },
            { no: 7, unit_id: 107, unit_code: 'ENG-01', unit_type: 'ENG', unit_name: 'Engineering Team' },
            { no: 8, unit_id: 108, unit_code: 'QA-01', unit_type: 'QA', unit_name: 'Quality Assurance' },
            { no: 9, unit_id: 109, unit_code: 'RND-01', unit_type: 'R&D', unit_name: 'Research and Development' },
            { no: 10, unit_id: 110, unit_code: 'ADM-01', unit_type: 'ADM', unit_name: 'Administration' }
        ];
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleClickButtonNavigation(data: LayoutModel.IButtonNavigation) {
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
