import { HttpBaseResponse } from "../../../http/http-request.model"

export namespace PejabatModel {
    export interface IPejabat {
        officers_id: string
        name: string
        nip: string
        posititon_name: string
        position_type: string
        job_category_id: string
        unit_id: string
        start_date_position: Date
        end_date_position: Date
        is_not_specified: number;
        created_at: string
        created_by: string
        updated_at: any
        updated_by: any
        deleted_at: any
        deleted_by: any
    }

    export class GetAllPejabat implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: {
            records: IPejabat[],
            total_row: number
        }
    }

    export class GetByIdPejabat implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: IPejabat
    }

    export interface GetAllQuery {
        direction_name?: string;
        order_name?: string;
        page?: string;
        limit?: string;
        search?: string;
    }

    export interface GetAllInSatkerQuery {
        direction_name?: string;
        order_name?: string;
        page?: string;
        limit?: string;
        search?: string;
        unit_id: string;
        start_date_position?: string;
        end_date_position?: string;
        job_category_id?: string;
    }

    export interface CreatePejabat {
        name: string
        nip: string
        posititon_name: string
        position_type: string
        job_category_id: string
        unit_id: string
        start_date_position: Date
        end_date_position: Date
        is_not_specified: number;
    }

    export interface UpdatePejabat {
        officers_id: string
        name: string
        nip: string
        posititon_name: string
        position_type: string
        job_category_id: string
        unit_id: string
        start_date_position: Date
        end_date_position: Date
        is_not_specified: number;
    }
}