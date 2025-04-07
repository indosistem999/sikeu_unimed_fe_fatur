import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

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
export class ModuleListComponent {

}
