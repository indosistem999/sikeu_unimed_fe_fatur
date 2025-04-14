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
        path: 'pejabat/detail',
        loadComponent: async () => (await import('./pejabat/detail-pejabat/detail-pejabat.component')).DetailPejabatComponent,
        data: {
            title: 'Detail Pejabat Satuan Kerja',
            breadcrumbs: ['Pengaturan', 'Umum', 'Pejabat Pada Satuan Kerja', 'Detail']
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
    {
        path: 'kategori-jabatan',
        loadComponent: async () => (await import('./kategori-jabatan/kategori-jabatan.component')).KategoriJabatanComponent,
        data: {
            title: 'Kategori Jabatan',
            breadcrumbs: ['Pengaturan', 'Umum', 'Kategori Jabatan']
        }
    },
]