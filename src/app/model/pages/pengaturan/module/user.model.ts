import { HttpBaseResponse } from "../../../http/http-request.model"

export namespace UserModel {
    export interface IUser {
        user_id: string
        first_name: string
        last_name: string
        email: string
        phone_number: string
        created_at: string
        gender: string
        role: {
            role_id: string
            role_name: string
        }
        work_unit: string
    }

    export class GetAllUser implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: {
            records: IUser[],
            total_row: number
        }
    }

    export class GetByIdUser implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: IUser
    }

    export interface GetAllQuery {
        direction_name?: string;
        order_name?: string;
        page?: string;
        limit?: string;
        search?: string;
    }

    export interface CreateUser {
        file_image: string;
        name: string;
        email: number;
        phone_number: string;
        gender: string;
        has_work_unit: string;
        unit_id: string;
        role_id: string;
    }

    export interface UpdateUser {
        user_id: string
        file_image: string;
        name: string;
        email: number;
        phone_number: string;
        gender: string;
        has_work_unit: string;
        unit_id: string;
        role_id: string;
    }
}