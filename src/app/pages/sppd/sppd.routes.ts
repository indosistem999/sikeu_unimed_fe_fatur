import { Routes } from "@angular/router";

export const sppdRoutes: Routes = [
    {
        path: 'beranda',
        loadComponent: async () => (await import('./beranda/beranda.component')).BerandaComponent,
        data: {
            title: 'Beranda',
            breadcrumbs: ['SPPD', 'Beranda']
        }
    },
]