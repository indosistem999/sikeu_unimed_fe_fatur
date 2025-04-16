import { Routes } from "@angular/router";

export const sppdReferensiRoutes: Routes = [
    {
        path: 'kop-surat',
        loadComponent: async () => (await import('./kop-surat/kop-surat.component')).KopSuratComponent,
        data: {
            title: 'Kop Surat',
            breadcrumbs: ['SPPD', 'Referensi', 'Kop Surat']
        }
    },
    {
        path: 'bagian-surat',
        loadComponent: async () => (await import('./bagian-surat/bagian-surat.component')).BagianSuratComponent,
        data: {
            title: 'Bagian Surat',
            breadcrumbs: ['SPPD', 'Referensi', 'Bagian Surat']
        }
    },
    {
        path: 'pangkat-golongan',
        loadComponent: async () => (await import('./pangkat-golongan/pangkat-golongan.component')).PangkatGolonganComponent,
        data: {
            title: 'Pangkat & Golongan',
            breadcrumbs: ['SPPD', 'Referensi', 'Pangkat & Golongan']
        }
    },
    {
        path: 'jenis-transportasi',
        loadComponent: async () => (await import('./jenis-transportasi/jenis-transportasi.component')).JenisTransportasiComponent,
        data: {
            title: 'Jenis Transportasi',
            breadcrumbs: ['SPPD', 'Referensi', 'Jenis Transportasi']
        }
    },
    {
        path: 'jenis-biaya',
        loadComponent: async () => (await import('./jenis-biaya/jenis-biaya.component')).JenisBiayaComponent,
        data: {
            title: 'Jenis Biaya',
            breadcrumbs: ['SPPD', 'Referensi', 'Jenis Biaya']
        }
    },
]