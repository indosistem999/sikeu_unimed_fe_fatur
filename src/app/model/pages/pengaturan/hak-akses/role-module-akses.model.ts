import { HttpBaseResponse } from "../../../http/http-request.model"

export namespace RoleModuleAksesModel {
    export interface IRoleModule {
        module_id: string
        module_name: string
        icon: string
        order_number: string
        role_id: string
        module_access_id: string
        assigned_status: string
    }

    export class GetAllRoleModule implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: IRoleModule[]
    }

    export interface CreateAssignRoleModule {
        role_id: string
        module_id: string
    }

    export interface DeleteAssignRoleModule {
        role_id: string
        module_id: string
    }
}