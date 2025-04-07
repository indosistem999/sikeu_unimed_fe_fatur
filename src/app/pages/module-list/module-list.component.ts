import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationModel } from 'src/app/model/pages/authentication/authentication.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
    selector: 'app-module-list',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
    ],
    templateUrl: './module-list.component.html',
    styleUrl: './module-list.component.scss'
})
export class ModuleListComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    Module$ = this._authenticationService
        .getModuleList()
        .pipe(takeUntil(this.Destroy$));

    ActiveModule!: AuthenticationModel.IModuleMenu;

    constructor(
        private _router: Router,
        private _authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleNavigate(url: string) {
        this._router.navigateByUrl(url);
    }
}
