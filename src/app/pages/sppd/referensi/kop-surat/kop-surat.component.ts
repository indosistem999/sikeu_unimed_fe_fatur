import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Subject, takeUntil } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { JenisTransportasiService } from 'src/app/services/sppd/referensi/jenis-transportasi.service';
import { KopSuratService } from 'src/app/services/sppd/referensi/kop-surat.service';

@Component({
    selector: 'app-kop-surat',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        ButtonModule,
        DialogModule,
        GridComponent,
        DashboardComponent,
        ConfirmDialogModule,
        DynamicFormComponent,
        InputTextModule,
        DropdownModule,
    ],
    templateUrl: './kop-surat.component.html',
    styleUrl: './kop-surat.component.scss'
})
export class KopSuratComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'add',
            title: 'Tambah Kop Surat',
            icon: 'pi pi-plus'
        }
    ];

    GridProps: GridModel.IGrid = {
        id: 'GridUser',
        column: [
            { field: 'no', headerName: '#', },
            { field: 'code', headerName: 'Kode', },
            { field: 'name', headerName: 'Jenis Transportasi', },
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
    GridQueryParams: any = { page: '1', limit: '6' };

    FormState: 'insert' | 'update' = 'insert';
    FormProps: FormModel.IForm;
    FormDialogToggle = false;
    @ViewChild('FormComps') FormComps!: DynamicFormComponent;

    KopSuratDatasource: any[] = [
        {
            order_number: 1,
            description: '',
            font_type: '',
            font_style: '',
            font_size: ''
        },
        {
            order_number: 2,
            description: '',
            font_type: '',
            font_style: '',
            font_size: ''
        },
        {
            order_number: 3,
            description: '',
            font_type: '',
            font_style: '',
            font_size: ''
        },
        {
            order_number: 4,
            description: '',
            font_type: '',
            font_style: '',
            font_size: ''
        },
        {
            order_number: 5,
            description: '',
            font_type: '',
            font_style: '',
            font_size: ''
        },
        {
            order_number: 6,
            description: '',
            font_type: '',
            font_style: '',
            font_size: ''
        },
    ];

    JenisFontDatasource: any[] = [
        'Times New Roman',
        'Calibri',
        'Arial'
    ];

    GayaFontDatasource: any[] = [
        'Normal',
        'Bold',
        'Italic',
        'Underlined'
    ];

    UkuranDatasource: any[] = [
        '2',
        '4',
        '6',
        '8',
        '10',
        '12',
        '14',
        '16',
        '18',
        '20',
        '24',
        '28',
        '32',
        '36',
        '48',
        '52',
        '58',
        '64',
        '72',
        '81',
        '90'
    ];

    constructor(
        private _router: Router,
        private _messageService: MessageService,
        private _kopSuratService: KopSuratService,
        private _confirmationService: ConfirmationService,
        private _authenticationService: AuthenticationService,
    ) {
        this.FormProps = {
            id: 'form_jenis_transportasi',
            fields: [
                {
                    id: 'transportation_type_id',
                    label: 'ID',
                    required: true,
                    type: 'text',
                    value: '',
                    readonly: true,
                    hidden: true
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
                    label: 'Jenis Transportasi',
                    required: true,
                    type: 'text',
                    value: '',
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-2 grid-cols-1',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {
        this.getAll(this.GridQueryParams);
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getAll(query?: any) {
        this._kopSuratService
            .getAll(query)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.data.records.length) {
                    this.KopSuratDatasource = result.data.records;
                    this.FormState = 'update';
                }
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

        this.getAll(this.GridQueryParams)
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
        this._kopSuratService
            .create(args)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Kop Surat Berhasil Disimpan' });
                    this.getAll(this.GridQueryParams);
                }
            })
    }

    handleUpdate(args: any) {
        const payload = args.map((item: any) => {
            return {
                kopsurat_id: item.kopsurat_id,
                order_number: item.order_number,
                description: item.description,
                font_type: item.font_type,
                font_style: item.font_style,
                font_size: item.font_size,
            }
        })

        this._kopSuratService
            .update(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Kop Surat Berhasil Diperbarui' });
                    this.getAll(this.GridQueryParams);
                }
            })
    }

    handleDelete(args: any) {
        this._kopSuratService
            .delete(args.unit_id)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Kop Surat Berhasil Dihapus' });
                    this.getAll(this.GridQueryParams);
                }
            })
    }
}
