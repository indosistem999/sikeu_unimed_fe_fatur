import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { map, Subject, takeUntil } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { UserModel } from 'src/app/model/pages/pengaturan/module/user.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { RoleState } from 'src/app/store/pengaturan/hak-akses/role';
import { SatuanKerjaState } from 'src/app/store/pengaturan/umum/satuan-kerja';
import { UserState, UserActions } from 'src/app/store/pengaturan/umum/user';

@Component({
    selector: 'app-user',
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
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    PageState: FormModel.PageState = FormModel.PageState.GRID;

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'add',
            title: 'Tambah User',
            icon: 'pi pi-plus'
        }
    ];

    GridProps: GridModel.IGrid = {
        id: 'GridUser',
        column: [
            { field: 'no', headerName: '#', },
            { field: 'full_name', headerName: 'Nama', },
            { field: 'email', headerName: 'Email', },
            { field: 'phone_number', headerName: 'No. HP', },
            { field: 'role.role_name', headerName: 'User Akses', },
            { field: 'work_unit.unit_name', headerName: 'Satuan Kerja', },
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
    GridQueryParams: UserModel.GetAllQuery = { page: '1', limit: '5' };
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
            id: 'form_user',
            fields: [
                {
                    id: 'file_image',
                    label: 'Foto Profile',
                    required: true,
                    type: 'fileinput',
                    file_accept: 'image/*',
                    value: '',
                    onChange: (files: File) => {
                        if (files) {
                            const type = files.name.split("."),
                                fileName = `logo_${new Date().getTime()}.${type[1]}`;

                            console.log("files =>", files);
                        }
                    }
                },
                {
                    id: 'name',
                    label: 'Nama Lengkap',
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
                    id: 'phone_number',
                    label: 'No. Handphone',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'gender',
                    label: 'Gender',
                    required: true,
                    type: 'radio',
                    value: '',
                    radioButtonProps: [
                        { name: 'gender', label: 'Laki - Laki', value: 'L' },
                        { name: 'gender', label: 'Perempuan', value: 'P' },
                    ]
                },
                {
                    id: 'role_id',
                    label: 'User Akses',
                    required: true,
                    type: 'select',
                    value: '',
                    dropdownProps: {
                        options: [],
                        optionName: 'role_name',
                        optionValue: 'role_id'
                    }
                },
                {
                    id: 'has_work_unit',
                    label: 'Satuan Kerja?',
                    required: true,
                    type: 'radio',
                    value: '',
                    radioButtonProps: [
                        { name: 'has_work_unit', label: 'Ya', value: 1 },
                        { name: 'has_work_unit', label: 'Tidak', value: 0 },
                    ],
                    onChange: (args: any) => {
                        const index = this.FormProps.fields.findIndex(item => item.id == 'unit_id');

                        if (args.value == 1) {
                            this.FormProps.fields[index].hidden = false;
                            this.FormProps.class = 'grid-rows-7 grid-cols-1';
                        } else {
                            this.FormProps.fields[index].hidden = true;
                            this.FormProps.class = 'grid-rows-6 grid-cols-1';
                        }
                    }
                },
                {
                    id: 'unit_id',
                    label: 'Pilih Satuan Kerja',
                    required: true,
                    type: 'select',
                    value: '',
                    dropdownProps: {
                        options: [],
                        optionName: 'unit_name',
                        optionValue: 'unit_id'
                    },
                    hidden: true,
                },
            ],
            style: 'inline',
            class: 'grid-rows-6 grid-cols-1',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {
        this.getAllUserState();
        this.getAllRoleState();
        this.getAllSatuanKerjaState();
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

    private getAllUserState() {
        this._store
            .select(UserState.userEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.GridProps.dataSource = result;
            })
    }

    private getAllRoleState() {
        this._store
            .select(RoleState.roleEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                const index = this.FormProps.fields.findIndex(item => item.id == 'role_id');
                this.FormProps.fields[index].dropdownProps.options = result;
            })
    }

    private getAllSatuanKerjaState() {
        this._store
            .select(SatuanKerjaState.satuanKerjaEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                const index = this.FormProps.fields.findIndex(item => item.id == 'unit_id');
                this.FormProps.fields[index].dropdownProps.options = result;
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
            .dispatch(new UserActions.GetAllUser(this.GridQueryParams))
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

        const index = this.FormProps.fields.findIndex(item => item.id == 'unit_id');

        if (args.work_unit) {
            this.FormProps.fields[index].hidden = false;
            this.FormProps.class = 'grid-rows-7 grid-cols-1';
        } else {
            this.FormProps.fields[index].hidden = true;
            this.FormProps.class = 'grid-rows-6 grid-cols-1';
        }

        this.FormComps.FormGroup.patchValue({
            ...args,
            name: `${args.first_name} ${args.last_name}`,
            role_id: args.role.role_id,
            has_work_unit: args.work_unit ? 1 : 0,
            unit_id: args.work_unit.unit_id
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
            .dispatch(new UserActions.CreateUser(args))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.user.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Modul Berhasil Disimpan' });
                    this.FormDialogToggle = false;
                    this.FormComps.FormGroup.reset();
                }
            })
    }

    handleUpdate(args: any) {
        this._store
            .dispatch(new UserActions.UpdateUser(args))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.user.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Modul Berhasil Diperbarui' });
                    this.FormDialogToggle = false;
                    this.FormComps.FormGroup.reset();
                }
            })
    }

    handleDelete(args: any) {
        this._store
            .dispatch(new UserActions.DeleteUser(args.unit_id))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.user.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Modul Berhasil Dihapus' });
                }
            })
    }

}
