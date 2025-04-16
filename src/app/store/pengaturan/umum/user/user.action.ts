import { UserModel } from "src/app/model/pages/pengaturan/module/user.model";

export namespace UserActions {
    export class GetAllUser {
        static readonly type = '[User] Get All User';
        constructor(public query?: UserModel.GetAllQuery) { }
    }

    export class GetByIdUser {
        static readonly type = '[User] Get By Id User';
        constructor(public payload: string) { }
    }

    export class CreateUser {
        static readonly type = '[User] Create User';
        constructor(public payload: UserModel.CreateUser) { }
    }

    export class UpdateUser {
        static readonly type = '[User] Update User';
        constructor(public payload: UserModel.UpdateUser) { }
    }

    export class DeleteUser {
        static readonly type = '[User] Delete User';
        constructor(public payload: string) { }
    }
}