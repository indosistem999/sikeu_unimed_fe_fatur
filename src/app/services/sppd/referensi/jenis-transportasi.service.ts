import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpBaseResponse } from 'src/app/model/http/http-request.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http/http-request.service';
import { UtilityService } from '../../utility/utility.service';

@Injectable({
    providedIn: 'root'
})
export class JenisTransportasiService {

    constructor(
        private _utilityService: UtilityService,
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(query?: any): Observable<HttpBaseResponse> {
        return this._httpRequestService
            .getRequest(`${environment.webApiUrl}/sppd-jenis-transportasi`, {}, query)
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

    getById(transportation_type_id: string): Observable<HttpBaseResponse> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/sppd-jenis-transportasi/${transportation_type_id}`);
    }

    create(payload: any): Observable<HttpBaseResponse> {
        const { transportation_type_id, ...data } = payload;
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/sppd-jenis-transportasi`, payload);
    }

    update(payload: any): Observable<HttpBaseResponse> {
        const { transportation_type_id, ...data } = payload;
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/sppd-jenis-transportasi/${transportation_type_id}`, data);
    }

    delete(transportation_type_id: string): Observable<HttpBaseResponse> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/sppd-jenis-transportasi/${transportation_type_id}`);
    }
}
