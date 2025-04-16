import { TahunAnggaranModel } from "src/app/model/pages/pengaturan/tahun-anggaran/tahun-anggaran.model";

export namespace TahunAnggaranActions {
    export class GetAllTahunAnggaran {
        static readonly type = '[TAHUN ANGGARAN] Get All Tahun Anggaran';
        constructor(public query?: TahunAnggaranModel.GetAllQuery) { }
    }

    export class GetByIdTahunAnggaran {
        static readonly type = '[TAHUN ANGGARAN] Get By Id Tahun Anggaran';
        constructor(public payload: string) { }
    }

    export class CreateTahunAnggaran {
        static readonly type = '[TAHUN ANGGARAN] Create Tahun Anggaran';
        constructor(public payload: TahunAnggaranModel.CreateTahunAnggaran) { }
    }

    export class UpdateTahunAnggaran {
        static readonly type = '[TAHUN ANGGARAN] Update Tahun Anggaran';
        constructor(public payload: TahunAnggaranModel.UpdateTahunAnggaran) { }
    }

    export class DeleteTahunAnggaran {
        static readonly type = '[TAHUN ANGGARAN] Delete Tahun Anggaran';
        constructor(public payload: string) { }
    }
}