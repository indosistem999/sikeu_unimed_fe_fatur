import { HttpBaseResponse } from "../../../http/http-request.model"

export namespace TahunAnggaranModel {
    export interface ITahunAnggaran {
        budget_id: string
        budget_name: string
        budget_start_date: string
        budget_end_date: string
        created_at: string
        created_by: string
        updated_at: any
        updated_by: any
        deleted_at: any
        deleted_by: any
    }

    export class GetAllTahunAnggaran implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: {
            records: ITahunAnggaran[],
            total_row: number
        }
    }

    export class GetByIdTahunAnggaran implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: ITahunAnggaran
    }

    export interface GetAllQuery {
        direction_name?: string;
        order_name?: string;
        page?: string;
        limit?: string;
        search?: string;
    }

    export interface CreateTahunAnggaran {
        budget_name: string
        budget_start_date: string
        budget_end_date: string
    }

    export interface UpdateTahunAnggaran {
        budget_id: string
        budget_name: string
        budget_start_date: string
        budget_end_date: string
    }
}