import { Routes } from "@angular/router";

export const pengaturanUmumRoutes: Routes = [
    {
        path: 'satuan-kerja',
        loadComponent: async () => (await import('./satuan-kerja/satuan-kerja.component')).SatuanKerjaComponent,
        data: {
            title: 'Satuan Kerja',
            breadcrumbs: ['Pengaturan', 'Umum', 'Satuan Kerja']
        }
    },
    {
        path: 'pejabat',
        loadComponent: async () => (await import('./pejabat/pejabat.component')).PejabatComponent,
        data: {
            title: 'Pejabat Pada Satuan Kerja',
            breadcrumbs: ['Pengaturan', 'Umum', 'Pejabat Pada Satuan Kerja']
        }
    },
    {
        path: 'identitas',
        loadComponent: async () => (await import('./identitas/identitas.component')).IdentitasComponent,
        data: {
            title: 'Identitas',
            breadcrumbs: ['Pengaturan', 'Umum', 'Identitas']
        }
    },
    {
        path: 'sumber-dana',
        loadComponent: async () => (await import('./sumber-dana/sumber-dana.component')).SumberDanaComponent,
        data: {
            title: 'Sumber Dana',
            breadcrumbs: ['Pengaturan', 'Umum', 'Sumber Dana']
        }
    },
]