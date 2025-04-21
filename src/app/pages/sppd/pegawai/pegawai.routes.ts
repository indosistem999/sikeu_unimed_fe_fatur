import { Routes } from '@angular/router';

export const sppdPegawaiRoutes: Routes = [
    {
        path: '',
        loadComponent: async () => (await import('./list-pegawai/list-pegawai.component')).ListPegawaiComponent,
        data: {
            title: 'Data Pegawai',
            breadcrumbs: ['SPPD', 'Pegawai', 'Data Pegawai']
        }
    },
    {
        path: 'tambah',
        loadComponent: async () => (await import('./tambah-pegawai/tambah-pegawai.component')).TambahPegawaiComponent,
        data: {
            title: 'Tambah Pegawai',
            breadcrumbs: ['SPPD', 'Pegawai', 'Tambah Pegawai']
        }
    },
    {
        path: 'edit/:pegawai_id',
        loadComponent: async () => (await import('./edit-pegawai/edit-pegawai.component')).EditPegawaiComponent,
        data: {
            title: 'Ubah Pegawai',
            breadcrumbs: ['SPPD', 'Pegawai', 'Ubah Pegawai']
        }
    },
    {
        path: 'detail/:pegawai_id',
        loadComponent: async () => (await import('./detail-pegawai/detail-pegawai.component')).DetailPegawaiComponent,
        data: {
            title: 'Detail Pegawai',
            breadcrumbs: ['SPPD', 'Pegawai', 'Detail Pegawai']
        }
    },
    {
        path: 'preview',
        loadComponent: async () => (await import('./detail-pegawai/detail-pegawai.component')).DetailPegawaiComponent,
        data: {
            title: 'Preview Pegawai',
            breadcrumbs: ['SPPD', 'Pegawai', 'Preview Pegawai']
        }
    },
    {
        path: 'history-integrasi',
        loadComponent: async () => (await import('./history-integrasi/history-integrasi.component')).HistoryIntegrasiComponent,
        data: {
            title: 'History Integrasi SIMPEG',
            breadcrumbs: ['SPPD', 'Pegawai', 'History Integrasi SIMPEG']
        }
    },
    {
        path: 'history-import',
        loadComponent: async () => (await import('./history-import/history-import.component')).HistoryImportComponent,
        data: {
            title: 'History Import Data Pegawai',
            breadcrumbs: ['SPPD', 'Pegawai', 'History Import Data Pegawai']
        }
    },
]