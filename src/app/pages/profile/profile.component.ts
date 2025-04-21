import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { DetailProfileComponent } from './detail-profile/detail-profile.component';
import { UbahPasswordComponent } from './ubah-password/ubah-password.component';
import { LogAktifitasComponent } from './log-aktifitas/log-aktifitas.component';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        DashboardComponent,
        UbahPasswordComponent,
        LogAktifitasComponent,
        DetailProfileComponent,
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    Tabs = ['Profil', 'Ubah Password', 'Log Aktivitas'];

    SelectedTab = 'Profil';

    constructor(
        private _activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this._activatedRoute
            .url
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result[0].path == 'ubah-password') {
                    this.SelectedTab = 'Ubah Password';
                } else {
                    this.SelectedTab = 'Profil';
                }
            })
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }
}
