import { Routes } from "@angular/router";

export const pengaturanRoutes: Routes = [
    {
        path: 'beranda',
        loadComponent: async () => (await import('./beranda/beranda.component')).BerandaComponent,
        data: {
            title: 'Beranda',
            breadcrumbs: ['Pengaturan', 'Beranda']
        }
    },
]