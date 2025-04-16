import { SumberDanaModel } from "src/app/model/pages/pengaturan/umum/sumber-dana.model";

export namespace SumberDanaActions {
    export class GetAllSumberDana {
        static readonly type = '[SUMBER DANA] Get All Sumber Dana';
        constructor(public query?: SumberDanaModel.GetAllQuery) { }
    }

    export class GetByIdSumberDana {
        static readonly type = '[SUMBER DANA] Get By Id Sumber Dana';
        constructor(public payload: string) { }
    }

    export class CreateSumberDana {
        static readonly type = '[SUMBER DANA] Create Sumber Dana';
        constructor(public payload: SumberDanaModel.CreateSumberDana) { }
    }

    export class UpdateSumberDana {
        static readonly type = '[SUMBER DANA] Update Sumber Dana';
        constructor(public payload: SumberDanaModel.UpdateSumberDana) { }
    }

    export class DeleteSumberDana {
        static readonly type = '[SUMBER DANA] Delete Sumber Dana';
        constructor(public payload: string) { }
    }
}