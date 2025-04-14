import { ModulModel } from "src/app/model/pages/pengaturan/module/modul.model";

export namespace ModulActions {
    export class GetAllModul {
        static readonly type = '[MODUL] Get All Modul';
        constructor(public query?: ModulModel.GetAllQuery) { }
    }

    export class GetByIdModul {
        static readonly type = '[MODUL] Get By Id Modul';
        constructor(public payload: string) { }
    }

    export class CreateModul {
        static readonly type = '[MODUL] Create Modul';
        constructor(public payload: ModulModel.CreateModul) { }
    }

    export class UpdateModul {
        static readonly type = '[MODUL] Update Modul';
        constructor(public payload: ModulModel.UpdateModul) { }
    }

    export class DeleteModul {
        static readonly type = '[MODUL] Delete Modul';
        constructor(public payload: string) { }
    }
}