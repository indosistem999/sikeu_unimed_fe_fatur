import { SatuanKerjaModel } from "src/app/model/pages/pengaturan/umum/satuan-kerja.model";

export namespace SatuanKerjaActions {
    export class GetAllSatuanKerja {
        static readonly type = '[SATUAN KERJA] Get All Satuan Kerja';
        constructor(public query?: SatuanKerjaModel.GetAllQuery) { }
    }

    export class GetByIdSatuanKerja {
        static readonly type = '[SATUAN KERJA] Get By Id Satuan Kerja';
        constructor(public payload: string) { }
    }

    export class CreateSatuanKerja {
        static readonly type = '[SATUAN KERJA] Create Satuan Kerja';
        constructor(public payload: SatuanKerjaModel.CreateSatuanKerja) { }
    }

    export class UpdateSatuanKerja {
        static readonly type = '[SATUAN KERJA] Update Satuan Kerja';
        constructor(public payload: SatuanKerjaModel.UpdateSatuanKerja) { }
    }

    export class DeleteSatuanKerja {
        static readonly type = '[SATUAN KERJA] Delete Satuan Kerja';
        constructor(public payload: string) { }
    }
}