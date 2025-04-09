import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { Subject } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { GridModel } from 'src/app/model/components/grid.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
    selector: 'app-identitas',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        DialogModule,
        GridComponent,
        TabViewModule,
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
        id: 'GridPejabat',
        column: [
            { field: 'no', headerName: '#', },
            { field: 'nip', headerName: 'NIP', },
            { field: 'full_name', headerName: 'Nama Lengkap', },
            { field: 'job_position', headerName: 'Jabatan', },
            { field: 'group', headerName: 'Kelompok', },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        toolbar: ['Hapus', 'Edit'],
        showPaging: true,
        showSearch: true,
        showSort: true,
        searchKeyword: 'full_name',
        searchPlaceholder: 'Cari Pejabat Disini',
    };
    GridSelectedData: any;

    FormPejabatProps: FormModel.IForm;
    FormPejabatDialogToggle = false;
    @ViewChild('FormPejabatComps') FormPejabatComps!: DynamicFormComponent;

    constructor(
        private _router: Router,
        private _confirmationService: ConfirmationService,
        private _authenticationService: AuthenticationService,
    ) {
        this.FormProps = {
            id: 'form_logo',
            fields: [
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
                    id: 'group',
                    label: 'Kelompok',
                    required: true,
                    type: 'select',
                    value: '',
                    dropdownProps: {
                        options: [
                            { group: 'Rektor', id_group: 1 }
                        ],
                        optionName: 'group',
                        optionValue: 'id_group'
                    }
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
            { no: 1, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Rektor', group: 'Rektor', id_group: 1 },
            { no: 2, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Rektor', group: 'Rektor', id_group: 1 },
            { no: 3, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Rektor', group: 'Rektor', id_group: 1 },
            { no: 4, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Rektor', group: 'Rektor', id_group: 1 },
            { no: 5, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Rektor', group: 'Rektor', id_group: 1 },
            { no: 6, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Rektor', group: 'Rektor', id_group: 1 },
            { no: 7, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Rektor', group: 'Rektor', id_group: 1 },
            { no: 8, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Rektor', group: 'Rektor', id_group: 1 },
            { no: 9, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Rektor', group: 'Rektor', id_group: 1 },
            { no: 10, nip: '12345678910', full_name: 'Rudi Tabuti', job_position: 'Rektor', group: 'Rektor', id_group: 1 },
        ];
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    onSearchGrid(args: any) {
    }

    onCellClicked(args: any): void {
        this.GridSelectedData = args;
    }

    onRowDoubleClicked(args: any): void {
        this.FormState = 'update';
        this.FormPejabatDialogToggle = true;
        this.FormPejabatComps.FormGroup.patchValue(args);
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

    handleSave(args: any) {

    }

    handleUpdate(args: any) {

    }

    handleDelete(args: any) {

    }
}
