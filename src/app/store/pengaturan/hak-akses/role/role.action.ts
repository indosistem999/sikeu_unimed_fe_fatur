import { RoleModel } from "src/app/model/pages/pengaturan/hak-akses/role.model";

export namespace RoleActions {
    export class GetAllRole {
        static readonly type = '[ROLE] Get All Role';
        constructor(public query?: RoleModel.GetAllQuery) { }
    }

    export class GetByIdRole {
        static readonly type = '[ROLE] Get By Id Role';
        constructor(public payload: string) { }
    }

    export class CreateRole {
        static readonly type = '[ROLE] Create Role';
        constructor(public payload: RoleModel.CreateRole) { }
    }

    export class UpdateRole {
        static readonly type = '[ROLE] Update Role';
        constructor(public payload: RoleModel.UpdateRole) { }
    }

    export class DeleteRole {
        static readonly type = '[ROLE] Delete Role';
        constructor(public payload: string) { }
    }
}