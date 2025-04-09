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
    selector: 'app-sumber-dana',
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
    templateUrl: './sumber-dana.component.html',
    styleUrl: './sumber-dana.component.scss'
})
export class SumberDanaComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'add',
            title: 'Tambah Sumber Dana',
            icon: 'pi pi-plus'
        }
    ];

    GridProps: GridModel.IGrid = {
        id: 'GridUser',
        column: [
            { field: 'no', headerName: '#', },
            { field: 'unit_id', headerName: 'ID', },
            { field: 'unit_code', headerName: 'Kode', },
            { field: 'unit_type', headerName: 'Uraian', },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        toolbar: ['Hapus', 'Edit'],
        showPaging: true,
        showSearch: true,
        showSort: true,
        searchKeyword: 'unit_type',
        searchPlaceholder: 'Cari Sumber Dana Disini',
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
                    label: 'Kode',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'unit_type',
                    label: 'Uraian',
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
            { no: 1, unit_id: 101, unit_code: 'SD-01', unit_type: 'Biaya Belanja' },
            { no: 2, unit_id: 102, unit_code: 'SD-02', unit_type: 'Biaya Belanja' },
            { no: 3, unit_id: 103, unit_code: 'SD-03', unit_type: 'Biaya Belanja' },
            { no: 4, unit_id: 104, unit_code: 'SD-04', unit_type: 'Biaya Belanja' },
            { no: 5, unit_id: 105, unit_code: 'SD-05', unit_type: 'Biaya Belanja' },
            { no: 6, unit_id: 106, unit_code: 'SD-06', unit_type: 'Biaya Belanja' },
            { no: 7, unit_id: 107, unit_code: 'SD-07', unit_type: 'Biaya Belanja' },
            { no: 8, unit_id: 108, unit_code: 'SD-08', unit_type: 'Biaya Belanja' },
            { no: 9, unit_id: 109, unit_code: 'SD-09', unit_type: 'Biaya Belanja' },
            { no: 10, unit_id: 110, unit_code: 'SD-10', unit_type: 'Biaya Belanja' },
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
