import { Routes } from "@angular/router";

export const pengaturanModulRoutes: Routes = [
    {
        path: '',
        loadComponent: async () => (await import('./list-modul/list-modul.component')).ListModulComponent,
        data: {
            title: 'Daftar Modul',
            breadcrumbs: ['Pengaturan', 'Modul', 'Daftar Modul']
        }
    },
    {
        path: 'detail',
        loadComponent: async () => (await import('./detail-modul/detail-modul.component')).DetailModulComponent,
        data: {
            title: 'Detail Modul',
            breadcrumbs: ['Pengaturan', 'Modul', 'Detail Modul']
        }
    },
]