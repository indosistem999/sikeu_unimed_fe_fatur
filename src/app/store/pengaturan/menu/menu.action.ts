
export namespace MenuActions {
    export class GetAllMenu {
        static readonly type = '[MENU] Get All Menu';
        constructor(public query?: any) { }
    }

    export class GetByIdMenu {
        static readonly type = '[MENU] Get By Id Menu';
        constructor(public payload: string) { }
    }

    export class CreateMenu {
        static readonly type = '[MENU] Create Menu';
        constructor(public payload: any) { }
    }

    export class CreateSubMenu {
        static readonly type = '[MENU] Create Sub Menu';
        constructor(public payload: any) { }
    }

    export class UpdateMenu {
        static readonly type = '[MENU] Update Menu';
        constructor(public payload: any) { }
    }

    export class DeleteMenu {
        static readonly type = '[MENU] Delete Menu';
        constructor(public payload: string) { }
    }
}