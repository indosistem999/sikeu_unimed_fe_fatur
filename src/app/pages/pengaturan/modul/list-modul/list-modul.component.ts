import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
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
import { ModulModel } from 'src/app/model/pages/pengaturan/modul.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ModulActions, ModuleState } from 'src/app/store/pengaturan/module';

@Component({
    selector: 'app-list-modul',
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
    templateUrl: './list-modul.component.html',
    styleUrl: './list-modul.component.scss'
})
export class ListModulComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'add',
            title: 'Tambah Modul',
            icon: 'pi pi-plus'
        }
    ];

    Module$ = this._store
        .select(ModuleState.modulEntities)
        .pipe(takeUntil(this.Destroy$));

    SelectedModule!: ModulModel.IModul;

    FormState: 'insert' | 'update' = 'insert';
    FormProps: FormModel.IForm;
    FormDialogToggle: boolean = false;
    @ViewChild('FormComps') FormComps!: DynamicFormComponent;

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _confirmationService: ConfirmationService,
        private _authenticationService: AuthenticationService,
    ) {
        this.FormProps = {
            id: 'form_modul',
            fields: [
                {
                    id: 'module_id',
                    label: 'ID',
                    required: true,
                    type: 'text',
                    value: '',
                    hidden: true,
                },
                {
                    id: 'module_name',
                    label: 'Nama Modul',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'module_path',
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
                    label: 'Logo Universitas',
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
            ],
            style: 'not_inline',
            class: 'grid-rows-4 grid-cols-1',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {

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

    handleToolbarClick(type: 'detail' | 'maintenance' | 'edit' | 'hapus', data: ModulModel.IModul) {
        console.log(type, data);

        switch (type) {
            case 'detail':
                break;
            case 'maintenance':
                this._messageService.clear();
                this._messageService.add({ severity: 'warning', summary: 'Coming Soon', detail: 'Fitur Akan Segera Datang' })
                break;
            case 'edit':
                this.FormState = 'update';
                this.FormDialogToggle = true;
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
        this._store
            .dispatch(new ModulActions.CreateModul(args))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.module.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Modul Berhasil Disimpan' });
                    this.FormDialogToggle = false;
                    this.FormComps.FormGroup.reset();
                    this.FormComps.ImagePreviews = {};
                }
            })
    }

    handleUpdate(args: any) {
        this._store
            .dispatch(new ModulActions.UpdateModul(args))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.module.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Modul Berhasil Diperbarui' });
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
                    .dispatch(new ModulActions.DeleteModul(args.module_id))
                    .pipe(takeUntil(this.Destroy$))
                    .subscribe((result) => {
                        if (result.module.success) {
                            this._messageService.clear();
                            this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Modul Berhasil Dihapus' });
                        }
                    })
            }
        });

    }
}
