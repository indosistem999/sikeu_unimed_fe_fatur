import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConfirmationService } from 'primeng/api';
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
import { UserModel } from 'src/app/model/pages/pengaturan/user.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserState, UserActions } from 'src/app/store/pengaturan/umum/user';

@Component({
    selector: 'app-role-akses',
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
    templateUrl: './role-akses.component.html',
    styleUrl: './role-akses.component.scss'
})
export class RoleAksesComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    PageState: FormModel.PageState = FormModel.PageState.GRID;

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'add',
            title: 'Tambah Role Akses',
            icon: 'pi pi-plus'
        }
    ];

    GridProps: GridModel.IGrid = {
        id: 'GridRoleAkses',
        column: [
            { field: 'no', headerName: '#', },
            { field: 'role_name', headerName: 'Nama Role', },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        toolbar: ['Detail', 'Hapus', 'Edit'],
        showPaging: true,
        showSearch: true,
        showSort: true,
        searchKeyword: 'role_name',
        searchPlaceholder: 'Cari Role Name Disini',
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
        private _confirmationService: ConfirmationService,
        private _authenticationService: AuthenticationService,
    ) {
        this.FormProps = {
            id: 'form_user',
            fields: [
                {
                    id: 'role_id',
                    label: 'ID',
                    required: true,
                    type: 'text',
                    value: '',
                    readonly: true,
                    hidden: true
                },
                {
                    id: 'role_name',
                    label: 'Nama Role',
                    required: true,
                    type: 'text',
                    value: '',
                },
            ],
            style: 'inline',
            class: 'grid-rows-1 grid-cols-1',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {
        this.getAllUserState();
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

    }

    onRowDoubleClicked(args: any): void {

    }

    onToolbarClicked(args: any): void {
        if (args.type == 'delete') {
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

        if (args.type == 'detail') {
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

    }

    handleUpdate(args: any) {

    }

    handleDelete(args: any) {

    }

}
