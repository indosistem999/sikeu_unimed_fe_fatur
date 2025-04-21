import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Subject, takeUntil } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { FormModel } from 'src/app/model/components/form.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { AuthenticationState, AuthenticationActions } from 'src/app/store/authentication';
import { RoleState } from 'src/app/store/pengaturan/hak-akses/role';

@Component({
    selector: 'app-ubah-password',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        DynamicFormComponent,
    ],
    templateUrl: './ubah-password.component.html',
    styleUrl: './ubah-password.component.scss'
})
export class UbahPasswordComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    FormProps: FormModel.IForm;
    @ViewChild('FormComps') FormComps!: DynamicFormComponent;

    MinLength = false;
    HasUppercase = false;
    HasLowercase = false;
    HasNumber = false;
    HasSpecialChar = false;

    constructor(
        private _store: Store,
        private _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute,
        private _messageService: MessageService,
        private _authenticationService: AuthenticationService,
    ) {
        this.FormProps = {
            id: 'form_change_password',
            fields: [
                {
                    id: 'old_password',
                    label: 'Password Lama',
                    required: true,
                    type: 'password',
                    value: '',
                    additional_link: {
                        label: 'Lupa Password?',
                        url: '/lupa-password'
                    }
                },
                {
                    id: 'new_password',
                    label: 'Password Baru',
                    required: true,
                    type: 'password',
                    value: '',
                    onChange: (args: any) => {
                        this.handlecheckPasswordStrength(args);
                    }
                },
                {
                    id: 'confirm_password',
                    label: 'Ketik Ulang Password Baru',
                    required: true,
                    type: 'password',
                    value: '',
                },
            ],
            style: 'inline',
            class: 'grid-rows-3 grid-cols-1',
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

    handleSave(data: any) {
        this._authenticationService
            .changePassword(data)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Password berhasil diperbarui' });
                    this.FormComps.FormGroup.reset();
                    this.MinLength = false;
                    this.HasUppercase = false;
                    this.HasLowercase = false;
                    this.HasNumber = false;
                    this.HasSpecialChar = false;
                    setTimeout(() => {
                        this._authenticationService.signOut();
                    }, 1000);
                }
            })
    }

    handlecheckPasswordStrength(password: string) {
        this.MinLength = password.length >= 8;
        this.HasUppercase = /[A-Z]/.test(password);
        this.HasLowercase = /[a-z]/.test(password);
        this.HasNumber = /[0-9]/.test(password);
        this.HasSpecialChar = /[!@#$%^&*]/.test(password);
    }
}
