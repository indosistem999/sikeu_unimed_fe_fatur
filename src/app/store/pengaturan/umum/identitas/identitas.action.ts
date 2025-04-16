import { IdentitasModel } from "src/app/model/pages/pengaturan/umum/identitas.model";

export namespace IdentitasActions {
    export class GetAllIdentitas {
        static readonly type = '[IDENTITAS] Get All Identitas';
        constructor(public query?: IdentitasModel.GetAllQuery) { }
    }

    export class GetByIdIdentitas {
        static readonly type = '[IDENTITAS] Get By Id Identitas';
        constructor(public payload: string) { }
    }

    export class CreateIdentitas {
        static readonly type = '[IDENTITAS] Create Identitas';
        constructor(public payload: IdentitasModel.CreateIdentitas) { }
    }

    export class UpdateIdentitas {
        static readonly type = '[IDENTITAS] Update Identitas';
        constructor(public payload: IdentitasModel.UpdateIdentitas) { }
    }

    export class DeleteIdentitas {
        static readonly type = '[IDENTITAS] Delete Identitas';
        constructor(public payload: string) { }
    }
}