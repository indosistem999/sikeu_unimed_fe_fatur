import { AuthenticationModel } from "src/app/model/pages/authentication/authentication.model";

export namespace AuthenticationActions {
    export class SignIn {
        static readonly type = '[AUTH] Sign In';
        constructor(public payload: AuthenticationModel.ISignIn) { }
    }

    export class GetProfile {
        static readonly type = '[AUTH] Get Profile';
    }

    export class GetProfileFromApi {
        static readonly type = '[AUTH] Get Profile Data';
    }

    export class UpdateProfile {
        static readonly type = '[AUTH] Update Profile';
        constructor(public payload: any) { }
    }
}