import { Component } from '@angular/core';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';

@Component({
    selector: 'app-beranda',
    standalone: true,
    imports: [
        DashboardComponent
    ],
    templateUrl: './beranda.component.html',
    styleUrl: './beranda.component.scss'
})
export class BerandaComponent {

}
