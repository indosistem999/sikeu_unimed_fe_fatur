import { HttpBaseResponse } from "src/app/model/http/http-request.model";

export namespace PegawaiModel {
    export interface IPegawai {
        pegawai_id: string;
        file_image: string;
        nik: string;
        nip: string;
        nama: string;
        gelar_depan: string;
        email: string;
        phone: string;
        pangkat_id: string;
        unit_id: string;
        jabatan: string;
        jenis_kepegawaian: 'dosen' | 'pegawai';
        status_kepegawaian: 'pns' | 'cpns' | 'p3k' | 'honor';
        status_active: number;
        simpeg_id: string;
        username: string;
        created_at: string
        created_by: string
        updated_at: any
        updated_by: any
        deleted_at: any
        deleted_by: any
    }

    export class GetAllPegawai implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: {
            records: IPegawai[],
            total_row: number
        }
    }

    export class GetByIdPegawai implements HttpBaseResponse {
        success!: boolean
        message!: string
        data!: IPegawai
    }

    export interface GetAllQuery {
        direction_name?: string;
        order_name?: string;
        page?: string;
        limit?: string;
        search?: string;
        unit_id?: string;
        jenis_kepegawaian?: string;
        status_kepegawaian?: string;
        status_active?: string;
    }

    export interface CreatePegawai {
        file_image: string;
        nik: string;
        nip: string;
        nama: string;
        gelar_depan: string;
        email: string;
        phone: string;
        pangkat_id: string;
        unit_id: string;
        jabatan: string;
        jenis_kepegawaian: 'dosen' | 'pegawai';
        status_kepegawaian: 'pns' | 'cpns' | 'p3k' | 'honor';
        status_active: number;
        simpeg_id: string;
        username: string;
    }

    export interface UpdatePegawai {
        pegawai_id: string;
        file_image: string;
        nik: string;
        nip: string;
        nama: string;
        gelar_depan: string;
        email: string;
        phone: string;
        pangkat_id: string;
        unit_id: string;
        jabatan: string;
        jenis_kepegawaian: 'dosen' | 'pegawai';
        status_kepegawaian: 'pns' | 'cpns' | 'p3k' | 'honor';
        status_active: number;
        simpeg_id: string;
        username: string;
    }
}