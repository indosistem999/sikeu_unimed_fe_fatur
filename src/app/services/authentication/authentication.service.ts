import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http/http-request.service';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationModel } from 'src/app/model/pages/authentication/authentication.model';
// import { SettingMenuRolesService } from '../management-user/setting-menu-roles.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    UserData$ = new BehaviorSubject<AuthenticationModel.IAuthentication>({
        id_user: 101,
        id_setting_company: 202,
        company_name: 'TechNova Solutions',
        id_user_group: 3,
        user_group: 'Administrator',
        username: 'johndoe',
        full_name: 'John Doe',
        email: 'johndoe@technova.com',
        phone: '+1-555-1234',
        whatsapp: '+1-555-5678',
        notes: 'Main admin user',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.sampletoken.payload'
    } as any);

    SidebarMenu$ = new BehaviorSubject<AuthenticationModel.IUserGroupMenu[]>([]);

    Module$ = new BehaviorSubject<AuthenticationModel.IModuleMenu[]>([
        {
            module_id: '1',
            module_name: 'Pengaturan',
            module_icon: '../../../assets/icon/pengaturan.png',
            module_path: 'pengaturan',
            order_number: 1,
            module_menu: [
                {
                    module_id: '1',
                    menu_id: '11',
                    menu_name: 'Beranda',
                    menu_path: '/pengaturan/beranda',
                },
                {
                    module_id: '1',
                    menu_id: '12',
                    menu_name: 'Umum',
                    sub_menu: [
                        {
                            module_id: '1',
                            menu_id: '121',
                            menu_name: 'Satuan Kerja',
                            menu_path: '/pengaturan/umum/satuan-kerja',
                        },
                        {
                            module_id: '1',
                            menu_id: '122',
                            menu_name: 'Pejabat',
                            menu_path: '/pengaturan/umum/pejabat',
                        },
                        {
                            module_id: '1',
                            menu_id: '123',
                            menu_name: 'Identitas',
                            menu_path: '/pengaturan/umum/identitas',
                        },
                        {
                            module_id: '1',
                            menu_id: '124',
                            menu_name: 'Sumber Dana',
                            menu_path: '/pengaturan/umum/sumber-dana',
                        },
                    ]
                },
                {
                    module_id: '1',
                    menu_id: '13',
                    menu_name: 'Modul',
                    menu_path: '/pengaturan/modul',
                },
                {
                    module_id: '1',
                    menu_id: '14',
                    menu_name: 'Hak Akses',
                    sub_menu: [
                        {
                            module_id: '1',
                            menu_id: '141',
                            menu_name: 'Role Akses',
                            menu_path: '/pengaturan/hak-akses/role-akses',
                        },
                        {
                            module_id: '1',
                            menu_id: '142',
                            menu_name: 'Daftar User',
                            menu_path: '/pengaturan/hak-akses/daftar-user',
                        }
                    ]
                },
                {
                    module_id: '1',
                    menu_id: '15',
                    menu_name: 'Tahun Anggaran',
                    menu_path: '/pengaturan/tahun-anggaran',
                },
            ]
        },
        {
            module_id: '2',
            module_name: 'SPPD',
            module_icon: '../../../assets/icon/sppd.png',
            module_path: 'sppd',
            order_number: 2
        },
        {
            module_id: '3',
            module_name: 'BKU',
            module_icon: '../../../assets/icon/bku.png',
            module_path: 'bku',
            order_number: 3
        },
        {
            module_id: '4',
            module_name: 'Website',
            module_icon: '../../../assets/icon/website.png',
            module_path: 'website',
            order_number: 4
        },
        {
            module_id: '5',
            module_name: 'Gaji Honor',
            module_icon: '../../../assets/icon/gaji.png',
            module_path: 'gaji-honor',
            order_number: 5
        },
    ])

    constructor(
        private _cookieService: CookieService,
        private _httpRequestService: HttpRequestService,
        // private _settingMenuRolesService: SettingMenuRolesService,
    ) { }

    signIn(payload: AuthenticationModel.ISignIn): Observable<AuthenticationModel.SignIn> {
        return this._httpRequestService
            .postRequest(`${environment.webApiUrl}/authentication/login`, payload)
            .pipe(
                tap((result) => {
                    if (result.status) {
                        this.handleSignIn(result.data);
                    }
                })
            )
    }

    getProfile(loginResult: any) {
        localStorage.removeItem("_LBS_MENU_");

        this._httpRequestService
            .getRequest(`${environment.webApiUrl}/authentication/profile`)
            .pipe(
                tap((result) => {
                    if (result.status) {

                    }
                })
            )
            .subscribe((result) => {
                const newRes = {
                    ...loginResult,
                    ...result.data,
                };

                localStorage.setItem("_LBS_UD_", JSON.stringify(newRes));
            })
    }

    setUserData() {
        const user_data = localStorage.getItem("_LBS_UD_");
        const layanan_data = localStorage.getItem("_LBS_UD_");
        this.UserData$.next({ ...JSON.parse(user_data as any), ...JSON.parse(layanan_data as any) });
    }

    getUserData() {
        const user_data = localStorage.getItem("_LBS_UD_");
        const layanan_data = localStorage.getItem("_LBS_UD_");
        return { ...JSON.parse(user_data as any), ...JSON.parse(layanan_data as any) };
    }

    setMenu(id_user_group: number) {
        // this._settingMenuRolesService
        //     .getAllAssigned(id_user_group)
        //     .subscribe((result) => {
        //         if (result.status) {
        //             localStorage.setItem("_LBS_MENU_", JSON.stringify(result.data));
        //             this.SidebarMenu$.next(result.data);
        //         }
        //     })
    }

    private handleSignIn(data: AuthenticationModel.IAuthentication) {
        localStorage.clear();
        localStorage.setItem("_LBS_UD_", JSON.stringify(data));
        setTimeout(() => {
            this.getProfile(data);
        }, 1000);
    }

    generateCaptcha() {
        const operators = ['+', '-', '*'];

        const num1 = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        const num2 = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        const operator = operators[Math.floor(Math.random() * operators.length)];

        let answer: number = 0;
        let question: string = "";

        switch (operator) {
            case '+':
                answer = num1 + num2;
                break;
            case '-':
                answer = num1 - num2;
                break;
            case '*':
                answer = num1 * num2;
                break;
        }

        question = `${num1} ${operator} ${num2}`;

        return { question, answer };
    }

    getModuleList() {
        return of(this.Module$.value);
    }

    getModuleMenu() {
        return JSON.parse(localStorage.getItem("_SIMKEU_MN_") as any);
    }
}
