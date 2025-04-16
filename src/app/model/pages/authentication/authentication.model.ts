import { HttpBaseResponse } from "../../http/http-request.model"

export namespace AuthenticationModel {
    export interface IAuthentication {
        user_id: string
        email: string
        first_name: string
        last_name: string
        access_token: string;
        refresh_token: string;
        role: {
            role_id: string
            role_name: string
            role_slug: string
        }
    }

    export interface IUserGroupMenu {
        id_user_group_menu: number;
        id_user_group: number;
        user_group: string;
        id_menu: number;
        id_menu_parent: number | null;
        menu: string;
        icon: string;
        url: string;
        is_assigned: boolean;
        is_parent: boolean;
        toggle_child: boolean;
        child: IUserGroupMenu[];
    }

    export interface IModuleChildMenu {
        module_id: string;
        menu_id: string;
        menu_name: string;
        menu_path?: string;
        sub_menu?: IModuleChildMenu[]
    }

    export interface IModuleMenu {
        module_id: string;
        module_name: string;
        module_path: string;
        icon: string;
        order_number: number;
        module_menu?: IModuleChildMenu[]
    }

    export interface ISignIn {
        email: string
        password: string
        security_question_answer: string
        remember_me: boolean
    }

    export class SignIn implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: IAuthentication
    }
}