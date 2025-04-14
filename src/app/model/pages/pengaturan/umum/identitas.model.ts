import { HttpBaseResponse } from "../../../http/http-request.model"

export namespace IdentitasModel {
    export interface IIdentitas {
        identity_id: string
        name: string
        file_logo: string
        phone: string
        email: string
        address: string
        website: string
        created_at: string
        created_by: string
        updated_at: any
        updated_by: any
        deleted_at: any
        deleted_by: any
    }

    export class GetAllIdentitas implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: IIdentitas
    }

    export class GetByIdIdentitas implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: IIdentitas
    }

    export interface GetAllQuery {
        direction_name?: string;
        order_name?: string;
        page?: string;
        limit?: string;
        search?: string;
    }

    export interface CreateIdentitas {
        name: string
        file_logo: string
        phone: string
        email: string
        address: string
        website: string
    }

    export interface UpdateIdentitas {
        identity_id: string
        name: string
        file_logo: string
        phone: string
        email: string
        address: string
        website: string
    }
}