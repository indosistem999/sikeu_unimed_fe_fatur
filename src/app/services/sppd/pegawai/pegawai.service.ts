import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http/http-request.service';
import { UtilityService } from '../../utility/utility.service';
import { PegawaiModel } from 'src/app/model/pages/sppd/pegawai/pegawai.model';
import { HttpBaseResponse } from 'src/app/model/http/http-request.model';

@Injectable({
    providedIn: 'root'
})
export class PegawaiService {

    constructor(
        private _utilityService: UtilityService,
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(query?: PegawaiModel.GetAllQuery): Observable<PegawaiModel.GetAllPegawai> {
        return this._httpRequestService
            .getRequest(`${environment.webApiUrl}/sppd-pegawai`, {}, query)
            .pipe(
                map((result) => {
                    if (result.data.records.length) {
                        result.data.records = result.data.records.map((item: any, index: number) => {
                            return {
                                ...item,
                                no: index + 1,
                            }
                        });
                    }

                    return result;
                })
            )
    }

    getById(pegawai_id: string): Observable<PegawaiModel.GetByIdPegawai> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/sppd-pegawai/${pegawai_id}`);
    }

    create(payload: PegawaiModel.CreatePegawai): Observable<PegawaiModel.GetByIdPegawai> {
        const { pegawai_id, ...data } = payload as any;
        const formData = this._utilityService.jsonToFormData(data);
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/sppd-pegawai`, formData);
    }

    update(payload: PegawaiModel.UpdatePegawai): Observable<PegawaiModel.GetByIdPegawai> {
        const { pegawai_id, ...data } = payload as any;
        const formData = this._utilityService.jsonToFormData(data);
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/sppd-pegawai/${pegawai_id}`, formData);
    }

    delete(pegawai_id: string): Observable<PegawaiModel.GetByIdPegawai> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/sppd-pegawai/${pegawai_id}`);
    }

    import(file: string): Observable<HttpBaseResponse> {
        const formData = this._utilityService.jsonToFormData({ file: file })
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/sppd-pegawai/import/excel`, formData);
    }

    getTemplateExcel(): Observable<HttpBaseResponse> {
        const headers = { 'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/download/template/excel`, headers);
    }

    getHistoryImport(query?: PegawaiModel.GetAllQuery): Observable<HttpBaseResponse> {
        return this._httpRequestService
            .getRequest(`${environment.webApiUrl}/history-import-pegawai`, {}, query)
            .pipe(
                map((result) => {
                    if (result.data.records.length) {
                        result.data.records = result.data.records.map((item: any, index: number) => {
                            return {
                                ...item,
                                no: index + 1,
                            }
                        });
                    }

                    return result;
                })
            )
    }
}
