import { KategoriJabatanModel } from "src/app/model/pages/pengaturan/umum/kategori-jabatan.model";

export namespace KategoriJabatanActions {
    export class GetAllKategoriJabatan {
        static readonly type = '[KATEGORI JABATAN] Get All Kategori Jabatan';
        constructor(public query?: KategoriJabatanModel.GetAllQuery) { }
    }

    export class GetByIdKategoriJabatan {
        static readonly type = '[KATEGORI JABATAN] Get By Id Kategori Jabatan';
        constructor(public payload: string) { }
    }

    export class CreateKategoriJabatan {
        static readonly type = '[KATEGORI JABATAN] Create Kategori Jabatan';
        constructor(public payload: KategoriJabatanModel.CreateKategoriJabatan) { }
    }

    export class UpdateKategoriJabatan {
        static readonly type = '[KATEGORI JABATAN] Update Kategori Jabatan';
        constructor(public payload: KategoriJabatanModel.UpdateKategoriJabatan) { }
    }

    export class DeleteKategoriJabatan {
        static readonly type = '[KATEGORI JABATAN] Delete Kategori Jabatan';
        constructor(public payload: string) { }
    }
}