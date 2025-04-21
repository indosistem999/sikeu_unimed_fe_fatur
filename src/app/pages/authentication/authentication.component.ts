import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { FormModel } from 'src/app/model/components/form.model';
import { ButtonModule } from 'primeng/button';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Subject, takeUntil, map } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CheckboxModule } from 'primeng/checkbox';
import { InputOtpModule } from 'primeng/inputotp';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Store } from '@ngxs/store';
import { AuthenticationActions } from 'src/app/store/authentication';

@Component({
    selector: 'app-authentication',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        ButtonModule,
        CheckboxModule,
        PasswordModule,
        InputOtpModule,
        InputTextModule,
        DynamicFormComponent,
    ],
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit, AfterViewInit, OnDestroy {

    PageState: 'login' | 'email_confirm' | 'otp' | 'password_confirm' | 'success' = 'login'

    Destroy$ = new Subject();

    FormState: 'insert' | 'update' = 'insert';
    FormProps: FormModel.IForm;
    @ViewChild('FormComps') FormComps!: DynamicFormComponent;

    Version = environment.version;

    Year = new Date().getFullYear();

    Captcha = this._authenticationService.generateCaptcha();

    RememberMe: boolean = false;

    EmailForgotPassword = "";
    OtpVerifikasi = "";
    NewPassword: string = "";
    ConfirmPassword: string = "";

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _authenticationService: AuthenticationService,
    ) {
        this.FormProps = {
            id: 'authentication',
            fields: [
                {
                    id: 'email',
                    label: 'Email',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'password',
                    label: 'Password',
                    required: false,
                    type: 'password',
                    value: '',
                },
                {
                    id: 'security_question_answer',
                    label: 'Captcha',
                    required: true,
                    type: 'captcha',
                    value: '',
                    onRefresh: (args) => {
                        console.log(args);
                        this.Captcha = this._authenticationService.generateCaptcha();
                        this.handleRefreshCaptcha();
                    }
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-3',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {
        // const userData = this._authenticationService.getUserData();

        // if (userData) {
        //     this._router.navigateByUrl("beranda");
        // };
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.handleRefreshCaptcha()
        }, 100);
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleRefreshCaptcha() {
        const indexCaptcha = this.FormProps.fields.findIndex(item => item.id == 'security_question_answer');
        this.FormProps.fields[indexCaptcha].label = `Hasil dari ${this.Captcha.question}`;
    }

    handleSignIn() {
        const formValue = this.FormComps.onGetFormValue();

        if (formValue) {
            const payload = { ...formValue, remember_me: this.RememberMe };

            this._store
                .dispatch(new AuthenticationActions.SignIn(payload))
                .pipe(
                    takeUntil(this.Destroy$),
                    map(result => result.authentication)
                )
                .subscribe((result) => {
                    if (result.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Login Berhasil' });
                        this._router.navigateByUrl("/list-module");
                    }
                })
        }
    }

    handleForgotPassword(email: string) {
        const payload = { email: email };

        this._authenticationService
            .forgotPassword(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Mohon Cek OTP pada Email Anda' });
                    this.PageState = 'otp';
                }
            })
    }

    handleVerifyOtp(otp: string) {
        const payload = { email: this.EmailForgotPassword, reset_token_code: otp };

        this._authenticationService
            .verifyOtp(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'OTP Terverifikasi', detail: 'Mohon Input Password Baru Anda' });
                    this.PageState = 'password_confirm';
                }
            })
    }

    handleResetPassword(new_password: string, confirm_password: string) {
        if (new_password == confirm_password) {
            const payload = {
                email: this.EmailForgotPassword,
                new_password: new_password,
                confirm_password: confirm_password,
            };

            this._authenticationService
                .resetPassword(payload)
                .pipe(takeUntil(this.Destroy$))
                .subscribe((result) => {
                    if (result.success) {
                        this.PageState = 'success';
                    }
                })
        } else {
            this._messageService.clear();
            this._messageService.add({ severity: 'warning', summary: 'Oops', detail: 'Mohon Periksa Kembali Password Anda' });
        }
    }
}
