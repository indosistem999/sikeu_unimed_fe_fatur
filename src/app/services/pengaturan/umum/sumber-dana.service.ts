import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http/http-request.service';
import { UtilityService } from '../../utility/utility.service';
import { SumberDanaModel } from 'src/app/model/pages/pengaturan/umum/sumber-dana.model';

@Injectable({
    providedIn: 'root'
})
export class SumberDanaService {

    constructor(
        private _utilityService: UtilityService,
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(query?: SumberDanaModel.GetAllQuery): Observable<SumberDanaModel.GetAllSumberDana> {
        return this._httpRequestService
            .getRequest(`${environment.webApiUrl}/master-sumber-dana`, {}, query)
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

    getById(sumber_dana_id: string): Observable<SumberDanaModel.GetByIdSumberDana> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/master-sumber-dana/${sumber_dana_id}`);
    }

    create(payload: SumberDanaModel.CreateSumberDana): Observable<SumberDanaModel.GetByIdSumberDana> {
        const { sumber_dana_id, ...data } = payload as any;
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/master-sumber-dana`, data);
    }

    update(payload: SumberDanaModel.UpdateSumberDana): Observable<SumberDanaModel.GetByIdSumberDana> {
        const { sumber_dana_id, ...data } = payload;
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/master-sumber-dana/${sumber_dana_id}`, data);
    }

    delete(sumber_dana_id: string): Observable<SumberDanaModel.GetByIdSumberDana> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/master-sumber-dana/${sumber_dana_id}`);
    }
}
