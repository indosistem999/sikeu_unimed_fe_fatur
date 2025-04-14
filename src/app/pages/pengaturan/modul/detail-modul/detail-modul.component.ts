import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Subject, takeUntil } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MenuState, MenuActions } from 'src/app/store/pengaturan/menu';
import { ModulActions, ModuleState } from 'src/app/store/pengaturan/module';

@Component({
    selector: 'app-detail-modul',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        DashboardComponent,
        OverlayPanelModule,
        ConfirmDialogModule,
        DynamicFormComponent,
    ],
    templateUrl: './detail-modul.component.html',
    styleUrl: './detail-modul.component.scss'
})
export class DetailModulComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'add',
            title: 'Tambah Menu',
            icon: 'pi pi-plus'
        }
    ];

    ActiveModule$ = this._store
        .select(ModuleState.modulSingle)
        .pipe(takeUntil(this.Destroy$));

    Menu: any[] = [];

    ToolbarMenu = [
        { id: 'insert_children', icon: 'pi pi-plus text-sky-500', label: 'Tambah Sub Menu' },
        { id: 'edit', icon: 'pi pi-pencil text-yellow-500', label: 'Edit Menu' },
        { id: 'hapus', icon: 'pi pi-trash text-red-500', label: 'Hapus Menu' },
    ];

    SelectedMenu!: any;

    FormState: 'insert_parent' | 'insert_children' | 'insert_subchildren' | 'update' = 'insert_parent';
    FormProps: FormModel.IForm;
    FormDialogToggle: boolean = false;
    FormDialogHeader: string = "Tambah Menu";
    @ViewChild('FormComps') FormComps!: DynamicFormComponent;

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _activatedRoute: ActivatedRoute,
        private _confirmationService: ConfirmationService,
        private _authenticationService: AuthenticationService,
    ) {
        this.FormProps = {
            id: 'form_menu',
            fields: [
                {
                    id: 'module_id',
                    label: 'Menu Id',
                    required: true,
                    type: 'text',
                    value: '',
                    hidden: true,
                },
                {
                    id: 'menu_id',
                    label: 'Menu Id',
                    required: true,
                    type: 'text',
                    value: '',
                    hidden: true,
                },
                {
                    id: 'parent_id',
                    label: 'Parent Id',
                    required: true,
                    type: 'text',
                    value: '',
                    hidden: true,
                },
                {
                    id: 'parent_name',
                    label: 'Menu Utama',
                    required: true,
                    type: 'text',
                    value: '',
                    readonly: true,
                    hidden: true,
                },
                {
                    id: 'name',
                    label: 'Nama Menu',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'slug',
                    label: 'Slug',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'order_number',
                    label: 'Urutan',
                    required: true,
                    type: 'number',
                    value: '',
                },
                {
                    id: 'file_icon',
                    label: 'Logo Menu',
                    required: false,
                    type: 'fileinput',
                    file_accept: 'image/*',
                    value: '',
                    onChange: (files: File) => {
                        if (files) {
                            const type = files.name.split("."),
                                fileName = `logo_menu_${new Date().getTime()}.${type[1]}`;
                        }
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
        const queryParams = this._activatedRoute.snapshot.queryParams['id'];
        this.getModule(queryParams);
        this.getAllMenu(queryParams);
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getModule(module_id: string) {
        this._store
            .dispatch(new ModulActions.GetByIdModul(module_id))
            .pipe(takeUntil(this.Destroy$));
    }

    private getAllMenu(module_id: string) {
        this._store
            .dispatch(new MenuActions.GetAllMenu({ module_id: module_id }))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.menu.success) {
                    this.Menu = result.menu.entities;
                    this.Menu = this.Menu.map((item: any) => {
                        return {
                            ...item,
                            toggle_children: false,
                        }
                    })
                }
            })
    }

    handleClickButtonNavigation(data: LayoutModel.IButtonNavigation) {
        if (data.id == 'add') {
            this.FormState = 'insert_parent';
            this.FormDialogHeader = "Tambah Menu";
            const index = this.FormProps.fields.findIndex(item => item.id == 'parent_name');
            this.FormProps.fields[index].hidden = true;
            this.FormProps.class = "grid-rows-4 grid-cols-1"
            this.FormDialogToggle = true;
            this.FormComps.FormGroup.reset();
        };
    }

    handleTogglingToolbar(is_child: boolean, data: any) {
        this.SelectedMenu = data;

        if (is_child) {
            this.ToolbarMenu = [
                { id: 'insert_children', icon: 'pi pi-plus text-sky-500', label: 'Tambah Sub Menu' },
                { id: 'edit', icon: 'pi pi-pencil text-yellow-500', label: 'Edit Menu' },
                { id: 'hapus', icon: 'pi pi-trash text-red-500', label: 'Hapus Menu' },
            ];
        } else {
            this.ToolbarMenu = [
                { id: 'insert_subchildren', icon: 'pi pi-plus text-sky-500', label: 'Tambah Item Menu' },
                { id: 'edit', icon: 'pi pi-pencil text-yellow-500', label: 'Edit Menu' },
                { id: 'hapus', icon: 'pi pi-trash text-red-500', label: 'Hapus Menu' },
            ];
        }
    }

    handleToolbarClick(type: string, data: any) {
        console.log(type, data);
        const index = this.FormProps.fields.findIndex(item => item.id == 'parent_name');

        switch (type) {
            case 'insert_children':
                this.FormState = 'insert_children';
                this.FormDialogHeader = "Tambah Sub Menu";
                this.FormDialogToggle = true;
                this.FormComps.ImagePreviews = {};
                this.FormComps.ImagePreviews['file_icon'] = data.icon;

                this.FormProps.fields[index].hidden = false;
                this.FormProps.class = "grid-rows-5 grid-cols-1"

                this.FormComps.FormGroup.get('parent_id')?.setValue(data.menu_id);
                this.FormComps.FormGroup.get('parent_name')?.setValue(data.name);

                break;
            case 'insert_subchildren':
                this.FormState = 'insert_subchildren';
                this.FormDialogHeader = "Tambah Item Menu";
                this.FormDialogToggle = true;
                this.FormComps.ImagePreviews = {};
                this.FormComps.ImagePreviews['file_icon'] = data.icon;

                this.FormProps.fields[index].hidden = false;
                this.FormProps.class = "grid-rows-5 grid-cols-1"

                this.FormComps.FormGroup.get('parent_id')?.setValue(data.menu_id);
                this.FormComps.FormGroup.get('parent_name')?.setValue(data.name);
                break;
            case 'edit':
                this.FormState = 'update';
                this.FormDialogToggle = true;
                this.FormDialogHeader = "Ubah Menu";
                this.FormComps.FormGroup.patchValue(data);
                this.FormComps.ImagePreviews = {};
                this.FormComps.ImagePreviews['file_icon'] = data.icon;
                break;
            case 'hapus':
                this.handleDelete(data);
                break;
            default:
                break;
        }
    }

    handleSave(args: any) {
        args.module_id = this._activatedRoute.snapshot.queryParams['id'];
        delete args.menu_id;
        delete args.parent_id;
        delete args.parent_name;

        this._store
            .dispatch(new MenuActions.CreateMenu(args))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.module.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Menu Berhasil Disimpan' });
                    this.FormDialogToggle = false;
                    this.FormComps.FormGroup.reset();
                    this.FormComps.ImagePreviews = {};
                }
            })
    }

    handleSaveSubmenu(args: any) {
        args.module_id = this._activatedRoute.snapshot.queryParams['id'];
        delete args.menu_id;
        delete args.parent_name;

        this._store
            .dispatch(new MenuActions.CreateSubMenu(args))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.module.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Menu Berhasil Disimpan' });
                    this.FormDialogToggle = false;
                    this.FormComps.FormGroup.reset();
                    this.FormComps.ImagePreviews = {};
                }
            })
    }

    handleUpdate(args: any) {
        args.module_id = this._activatedRoute.snapshot.queryParams['id'];

        delete args.parent_name;

        this._store
            .dispatch(new MenuActions.UpdateMenu(args))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.module.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Menu Berhasil Diperbarui' });
                    this.FormDialogToggle = false;
                    this.FormComps.FormGroup.reset();
                    this.FormComps.ImagePreviews = {};
                }
            })
    }

    handleDelete(args: any) {
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
                this._store
                    .dispatch(new MenuActions.DeleteMenu(args.module_id))
                    .pipe(takeUntil(this.Destroy$))
                    .subscribe((result) => {
                        if (result.module.success) {
                            this._messageService.clear();
                            this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Menu Berhasil Dihapus' });
                        }
                    })
            }
        });

    }

}   
