import { HttpBaseResponse } from "../../http/http-request.model"

export namespace ModulModel {
    export interface IModul {
        module_id: string
        module_name: string
        module_path: string
        icon: any
        order_number: string
        created_at: string
        created_by: string
        updated_at: string
        updated_by: string
        deleted_at: any
        deleted_by: any
    }

    export class GetAllModul implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: {
            rows: IModul[],
            totalRows: number
        }
    }
}