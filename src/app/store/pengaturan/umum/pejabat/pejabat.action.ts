import { PejabatModel } from "src/app/model/pages/pengaturan/umum/pejabat.model";

export namespace PejabatActions {
    export class GetAllPejabat {
        static readonly type = '[PEJABAT] Get All Pejabat';
        constructor(public query?: PejabatModel.GetAllQuery) { }
    }

    export class GetAllPejabatInSatker {
        static readonly type = '[PEJABAT] Get All Pejabat In Satker';
        constructor(public query?: PejabatModel.GetAllInSatkerQuery) { }
    }

    export class GetByIdPejabat {
        static readonly type = '[PEJABAT] Get By Id Pejabat';
        constructor(public payload: string) { }
    }

    export class CreatePejabat {
        static readonly type = '[PEJABAT] Create Pejabat';
        constructor(public payload: PejabatModel.CreatePejabat) { }
    }

    export class UpdatePejabat {
        static readonly type = '[PEJABAT] Update Pejabat';
        constructor(public payload: PejabatModel.UpdatePejabat) { }
    }

    export class DeletePejabat {
        static readonly type = '[PEJABAT] Delete Pejabat';
        constructor(public payload: string) { }
    }
}