import { HttpBaseResponse } from "../../../http/http-request.model"

export namespace SatuanKerjaModel {
    export interface ISatuanKerja {
        unit_id: string
        unit_code: string
        unit_type: string
        unit_name: string
        created_at: string
        created_by: string
        updated_at: any
        updated_by: any
        deleted_at: any
        deleted_by: any
        pegawai: any[]
    }

    export class GetAllSatuanKerja implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: {
            records: ISatuanKerja[],
            total_row: number
        }
    }

    export class GetByIdSatuanKerja implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: ISatuanKerja
    }

    export interface GetAllQuery {
        direction_name?: string;
        order_name?: string;
        page?: string;
        limit?: string;
        search?: string;
    }

    export interface CreateSatuanKerja {
        unit_code: string
        unit_type: string
        unit_name: string
    }

    export interface UpdateSatuanKerja {
        unit_id: string
        unit_code: string
        unit_type: string
        unit_name: string
    }
}