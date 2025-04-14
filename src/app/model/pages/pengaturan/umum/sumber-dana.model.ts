import { HttpBaseResponse } from "../../../http/http-request.model"

export namespace SumberDanaModel {
    export interface ISumberDana {
        sumber_dana_id: string
        code: string
        description: string
        created_at: string
        created_by: string
        updated_at: any
        updated_by: any
        deleted_at: any
        deleted_by: any
    }

    export class GetAllSumberDana implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: {
            records: ISumberDana[],
            total_row: number
        }
    }

    export class GetByIdSumberDana implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: ISumberDana
    }

    export interface GetAllQuery {
        direction_name?: string;
        order_name?: string;
        page?: string;
        limit?: string;
        search?: string;
    }

    export interface CreateSumberDana {
        code: string
        description: string
    }

    export interface UpdateSumberDana {
        sumber_dana_id: string
        code: string
        description: string
    }
}