import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Store } from '@ngxs/store';
import { SatuanKerjaState } from 'src/app/store/pengaturan/umum/satuan-kerja';
import { RoleState } from 'src/app/store/pengaturan/hak-akses/role';
import { SatuanKerjaActions } from 'src/app/store/pengaturan/umum/satuan-kerja/satuan-kerja.action';
import { RoleActions } from 'src/app/store/pengaturan/hak-akses/role/role.action';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-user-form',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        FileUploadModule,
        RadioButtonModule,
        InputSwitchModule
    ],
    template: `
        <form [formGroup]="userForm" (ngSubmit)="handleSubmit()" class="flex flex-col gap-4">
            <!-- Profile Image Upload -->
            <div class="flex flex-col gap-2">
                <label>Foto Profile</label>
                <p-fileUpload 
                    mode="basic" 
                    accept="image/*" 
                    (onSelect)="onFileSelect($event)"
                    [maxFileSize]="1000000"
                    chooseLabel="Pilih Foto">
                </p-fileUpload>
            </div>

            <!-- Name -->
            <div class="flex flex-col gap-2">
                <label for="name">Nama Lengkap</label>
                <input pInputText id="name" formControlName="name" placeholder="Masukkan nama lengkap" />
            </div>

            <!-- Email -->
            <div class="flex flex-col gap-2">
                <label for="email">Email <span class="text-red-500">*</span></label>
                <input pInputText id="email" formControlName="email" placeholder="Masukkan email" />
                <small class="text-red-500" *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched">
                    Email harus diisi
                </small>
            </div>

            <!-- Phone Number -->
            <div class="flex flex-col gap-2">
                <label for="phone_number">Nomor Telepon</label>
                <input pInputText id="phone_number" formControlName="phone_number" placeholder="Masukkan nomor telepon" />
            </div>

            <!-- Gender -->
            <div class="flex flex-col gap-2">
                <label>Jenis Kelamin</label>
                <div class="flex gap-4">
                    <div class="flex items-center">
                        <p-radioButton name="gender" value="male" formControlName="gender" inputId="male"></p-radioButton>
                        <label for="male" class="ml-2">Laki-laki</label>
                    </div>
                    <div class="flex items-center">
                        <p-radioButton name="gender" value="female" formControlName="gender" inputId="female"></p-radioButton>
                        <label for="female" class="ml-2">Perempuan</label>
                    </div>
                </div>
            </div>

            <!-- Has Work Unit -->
            <div class="flex flex-col gap-2">
                <label>Memiliki Satuan Kerja?</label>
                <p-inputSwitch formControlName="has_work_unit" [trueValue]="1" [falseValue]="0"></p-inputSwitch>
            </div>

            <!-- Unit ID -->
            <div class="flex flex-col gap-2" *ngIf="userForm.get('has_work_unit')?.value === 1">
                <label for="unit_id">Satuan Kerja</label>
                <p-dropdown 
                    id="unit_id" 
                    formControlName="unit_id"
                    [options]="workUnits" 
                    optionLabel="unit_name"
                    optionValue="unit_id"
                    [appendTo]="'body'"
                    [virtualScroll]="true"
                    [filter]="true"
                    placeholder="Pilih Satuan Kerja">
                </p-dropdown>
            </div>

            <!-- Role ID -->
            <div class="flex flex-col gap-2">
                <label for="role_id">Role Akses</label>
                <p-dropdown 
                    id="role_id" 
                    formControlName="role_id"
                    [options]="roles" 
                    optionLabel="role_name"
                    optionValue="role_id"
                    [appendTo]="'body'"
                    [virtualScroll]="true"
                    [filter]="true"
                    placeholder="Pilih Role Akses">
                </p-dropdown>
            </div>

            <!-- Buttons -->
            <div class="flex justify-end gap-2">
                <p-button label="Batal" severity="secondary" (onClick)="onClose.emit()"></p-button>
                <p-button label="Simpan" severity="primary" type="submit" [disabled]="!userForm.valid"></p-button>
            </div>
        </form>
    `,
    styles: [`
        :host {
            display: block;
        }
    `]
})
export class UserFormComponent implements OnInit, OnDestroy {
    @Output() onClose = new EventEmitter<void>();
    @Output() onFormSubmit = new EventEmitter<any>();

    userForm: FormGroup;
    workUnits: any[] = [];
    roles: any[] = [];
    private destroy$ = new Subject<void>();

    constructor(
        private fb: FormBuilder,
        private store: Store
    ) {
        this.userForm = this.fb.group({
            file_image: [''],
            name: [''],
            email: ['', Validators.required],
            phone_number: [''],
            gender: ['male'],
            has_work_unit: [0],
            unit_id: [''],
            role_id: ['']
        });
    }

    ngOnInit(): void {
        // Fetch work units
        this.store.dispatch(new SatuanKerjaActions.GetAllSatuanKerja({}))
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.workUnits = this.store.selectSnapshot(SatuanKerjaState.satuanKerjaEntities);
            });

        // Fetch roles
        this.store.dispatch(new RoleActions.GetAllRole({}))
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.roles = this.store.selectSnapshot(RoleState.roleEntities);
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onFileSelect(event: any) {
        const file = event.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.userForm.patchValue({
                    file_image: e.target.result.split(',')[1] // Get base64 string
                });
            };
            reader.readAsDataURL(file);
        }
    }

    handleSubmit() {
        if (this.userForm.valid) {
            this.onFormSubmit.emit(this.userForm.value);
        }
    }
} 