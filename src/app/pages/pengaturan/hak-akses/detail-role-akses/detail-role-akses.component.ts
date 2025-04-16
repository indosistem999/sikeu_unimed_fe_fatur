import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ModuleState } from 'src/app/store/pengaturan/module';
import { RoleModuleAksesService } from 'src/app/services/pengaturan/hak-akses/role-module-akses.service';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RoleActions } from 'src/app/store/pengaturan/hak-akses/role';

@Component({
    selector: 'app-detail-role-akses',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        ButtonModule,
        DialogModule,
        GridComponent,
        InputSwitchModule,
        DashboardComponent,
        ConfirmDialogModule,
        DynamicFormComponent,
    ],
    templateUrl: './detail-role-akses.component.html',
    styleUrl: './detail-role-akses.component.scss'
})
export class DetailRoleAksesComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    PageState: 'list' | 'config' = 'list';

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'back',
            title: 'Kembali',
            icon: 'pi pi-chevron-left'
        }
    ];

    SelectedRole$ = new BehaviorSubject<any>(null);

    Module$ = new BehaviorSubject<any>([]);

    SelectedModule$ = new BehaviorSubject<any>(null);

    ConfigDatasource: any;

    Config: any[] = [];

    constructor(
        private _store: Store,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _messageService: MessageService,
        private _confirmationService: ConfirmationService,
        private _authenticationService: AuthenticationService,
        private _roleModuleAksesService: RoleModuleAksesService,
    ) { }

    ngOnInit(): void {
        this.getRoleById();
        this.getAll();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleClickButtonNavigation(data: LayoutModel.IButtonNavigation) {
        if (data.id == 'back') {
            this._router.navigateByUrl('/pengaturan/hak-akses/role-akses');
        };
    }

    private getRoleById() {
        const params = this._activatedRoute.snapshot.params['role_id'];

        this._store
            .dispatch(new RoleActions.GetByIdRole(params))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.role.success) {
                    this.SelectedRole$.next(result.role.single);
                }
            })
    }

    private getAll() {
        const params = this._activatedRoute.snapshot.params['role_id'];
        console.log("params =>", params);

        this._roleModuleAksesService
            .getAll(params)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.success) {
                    result.data = result.data.map((item: any) => {
                        return {
                            ...item,
                            checked: item.assigned_status == "1"
                        }
                    });

                    this.Module$.next(result.data);
                }
            })
    }

    handleChangeSwitch(args: any, data: any) {
        console.log("data =>", data);
        console.log("args =>", args);

        this._confirmationService.confirm({
            target: (<any>event).target as EventTarget,
            message: `Apakah anda yakin ingin ${args.checked ? 'mengaktifkan' : 'menonaktifkan'} modul yang dipilih untuk role akses "${this.SelectedRole$.value.role_name}" ?`,
            header: `Konfirmasi ${args.checked ? 'Pengaktifan' : 'Penonaktifan'} Modul`,
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: "p-button-success p-button-sm",
            rejectButtonStyleClass: "p-button-secondary p-button-sm",
            acceptIcon: "none",
            acceptLabel: 'Iya, saya yakin',
            rejectIcon: "none",
            rejectLabel: 'Batal',
            accept: () => {
                if (args.checked) {
                    this.onCreateAssign(data.module_id);
                } else {
                    this.onDeleteAssign(data.module_id);
                }
            }
        });
    }

    private onCreateAssign(module_id: string) {
        const payload = {
            role_id: this._activatedRoute.snapshot.params['role_id'],
            module_id: module_id,
        };

        this._roleModuleAksesService
            .createAssign(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Module Berhasil Diaktifkan' });
                    this.getAll();
                }
            })
    }

    private onDeleteAssign(module_id: string) {
        const payload = {
            role_id: this._activatedRoute.snapshot.params['role_id'],
            module_id: module_id,
        };

        this._roleModuleAksesService
            .deleteAssign(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Module Berhasil Dinonaktifkan' });
                    this.getAll();
                }
            })
    }

    handleOpenConfig(module: any) {
        this.PageState = 'config';
        this.SelectedModule$.next(module);

        const payload = {
            role_id: this._activatedRoute.snapshot.params['role_id'],
            module_id: module.module_id
        };

        this._roleModuleAksesService
            .getAllConfig(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.success) {
                    this.ConfigDatasource = {
                        module_access_id: result.data.role_module_association.module_access_id,
                        role_id: result.data.role.role_id,
                    };
                    this.Config = result.data.list_menu;
                    console.log("config =>", this.Config);
                }
            })
    }

    handleSaveConfig(menu_id: string, access: any) {
        const payload = {
            ...this.ConfigDatasource,
            menu_id: menu_id,
            list_access: access.map((item: any) => {
                return {
                    access_name: item.access_name,
                    access_status: item.access_status,
                }
            })
        };

        this._roleModuleAksesService
            .insertConfig(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.success) {
                    this.handleOpenConfig(this.SelectedModule$.value)
                }
            })
    }
}
