import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpBaseResponse } from 'src/app/model/http/http-request.model';
import { SatuanKerjaModel } from 'src/app/model/pages/pengaturan/umum/satuan-kerja.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http/http-request.service';
import { UtilityService } from '../../utility/utility.service';

@Injectable({
    providedIn: 'root'
})
export class KopSuratService {

    constructor(
        private _utilityService: UtilityService,
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(query?: any): Observable<HttpBaseResponse> {
        return this._httpRequestService
            .getRequest(`${environment.webApiUrl}/sppd-kop-surat`, {}, query)
            .pipe(
                map((result) => {
                    if (result.data.records.length) {
                        result.data.records = result.data.records
                            .sort((a: any, b: any) => { return parseInt(a.order_number) - parseInt(b.order_number) })
                            .map((item: any, index: number) => {
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

    getById(kopsurat_id: string): Observable<HttpBaseResponse> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/sppd-kop-surat/${kopsurat_id}`);
    }

    create(payload: any): Observable<HttpBaseResponse> {
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/sppd-kop-surat/batch`, payload);
    }

    update(payload: any): Observable<HttpBaseResponse> {
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/sppd-kop-surat/batch`, payload);
    }

    delete(kopsurat_id: string): Observable<HttpBaseResponse> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/sppd-kop-surat/${kopsurat_id}`);
    }

    preview(kopsurat_id: string): Observable<HttpBaseResponse> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/${kopsurat_id}/preview`);
    }
}
