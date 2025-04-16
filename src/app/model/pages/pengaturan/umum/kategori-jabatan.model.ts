import { HttpBaseResponse } from "../../../http/http-request.model"

export namespace KategoriJabatanModel {
    export interface IKategoriJabatan {
        job_category_id: string
        code: string
        name: string
        created_at: string
        created_by: string
        updated_at: any
        updated_by: any
        deleted_at: any
        deleted_by: any
    }

    export class GetAllKategoriJabatan implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: {
            records: IKategoriJabatan[],
            total_row: number
        }
    }

    export class GetByIdKategoriJabatan implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: IKategoriJabatan
    }

    export interface GetAllQuery {
        direction_name?: string;
        order_name?: string;
        page?: string;
        limit?: string;
        search?: string;
    }

    export interface CreateKategoriJabatan {
        code: string
        name: string
    }

    export interface UpdateKategoriJabatan {
        job_category_id: string
        code: string
        name: string
    }
}