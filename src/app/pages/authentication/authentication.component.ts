import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { FormModel } from 'src/app/model/components/form.model';
import { ButtonModule } from 'primeng/button';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CheckboxModule } from 'primeng/checkbox';
import { InputOtpModule } from 'primeng/inputotp';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-authentication',
    standalone: true,
    imports: [
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

    constructor(
        private _router: Router,
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
                    required: true,
                    type: 'password',
                    value: '',
                },
                {
                    id: 'captcha',
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
        }, 1);
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleRefreshCaptcha() {
        const indexCaptcha = this.FormProps.fields.findIndex(item => item.id == 'captcha');
        this.FormProps.fields[indexCaptcha].label = `Hasil dari ${this.Captcha.question}`;
    }

    handleSignIn() {
        const formValue = this.FormComps.onGetFormValue();

        // if (formValue) {
        //     this._authenticationService
        //         .signIn(formValue)
        //         .pipe(takeUntil(this.Destroy$))
        //         .subscribe((result) => {
        //             if (result.status) {
        //                 this._authenticationService.setUserData();
        this._router.navigateByUrl("/list-module");
        //             }
        //         })
        // }
    }
}
