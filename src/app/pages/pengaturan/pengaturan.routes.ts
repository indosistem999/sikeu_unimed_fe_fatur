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
    {
        path: 'umum',
        loadChildren: async () => (await import('./umum/umum.routes')).pengaturanUmumRoutes
    },
    {
        path: 'modul',
        loadChildren: async () => (await import('./modul/modul.routes')).pengaturanModulRoutes
    },
    {
        path: 'hak-akses',
        loadChildren: async () => (await import('./hak-akses/hak-akses.routes')).pengaturanHakAksesRoutes
    },
    {
        path: 'tahun-anggaran',
        loadComponent: async () => (await import('./tahun-anggaran/tahun-anggaran.component')).TahunAnggaranComponent,
        data: {
            title: 'Tahun Anggaran',
            breadcrumbs: ['Pengaturan', 'Tahun Anggaran']
        }
    },
]