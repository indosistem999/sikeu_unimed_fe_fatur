import { HttpBaseResponse } from "../../../http/http-request.model"

export namespace RoleModel {
    export interface IRole {
        role_id: string
        role_name: string
        role_slug: string
        created_at: string
        updated_at: any
    }

    export class GetAllRole implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: {
            records: IRole[],
            total_row: number
        }
    }

    export class GetByIdRole implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: IRole
    }

    export interface GetAllQuery {
        direction_name?: string;
        order_name?: string;
        page?: string;
        limit?: string;
        search?: string;
    }

    export interface CreateRole {
        role_name: string
    }

    export interface UpdateRole {
        role_id: string
        role_name: string
    }
}