import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SatuanKerjaModel } from 'src/app/model/pages/pengaturan/umum/satuan-kerja.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http/http-request.service';
import { UtilityService } from '../../utility/utility.service';

@Injectable({
    providedIn: 'root'
})
export class SatuanKerjaService {

    constructor(
        private _utilityService: UtilityService,
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(query?: SatuanKerjaModel.GetAllQuery): Observable<SatuanKerjaModel.GetAllSatuanKerja> {
        return this._httpRequestService
            .getRequest(`${environment.webApiUrl}/work-unit`, {}, query)
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

    getById(unit_id: string): Observable<SatuanKerjaModel.GetByIdSatuanKerja> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/work-unit/${unit_id}`);
    }

    create(payload: SatuanKerjaModel.CreateSatuanKerja): Observable<SatuanKerjaModel.GetByIdSatuanKerja> {
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/work-unit`, payload);
    }

    update(payload: SatuanKerjaModel.UpdateSatuanKerja): Observable<SatuanKerjaModel.GetByIdSatuanKerja> {
        const { unit_id, ...data } = payload;
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/work-unit/${unit_id}`, data);
    }

    delete(unit_id: string): Observable<SatuanKerjaModel.GetByIdSatuanKerja> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/work-unit/${unit_id}`);
    }

    getAllPejabatSatker(query?: SatuanKerjaModel.GetAllQuery): Observable<SatuanKerjaModel.GetAllSatuanKerja> {
        return this._httpRequestService
            .getRequest(`${environment.webApiUrl}/pejabat-satker/list-satker`, {}, query)
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
