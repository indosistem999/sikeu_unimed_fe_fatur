import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PejabatModel } from 'src/app/model/pages/pengaturan/umum/pejabat.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http/http-request.service';
import { UtilityService } from '../../utility/utility.service';

@Injectable({
    providedIn: 'root'
})
export class PejabatService {

    constructor(
        private _utilityService: UtilityService,
        private _httpRequestService: HttpRequestService,
    ) { }

    getAllInSatker(query: PejabatModel.GetAllInSatkerQuery): Observable<PejabatModel.GetAllPejabat> {
        const { unit_id, ...data } = query;

        return this._httpRequestService
            .getRequest(`${environment.webApiUrl}/pejabat-satker/list-pejabat/${query.unit_id}`, {}, data)
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

    getAll(query?: PejabatModel.GetAllQuery): Observable<PejabatModel.GetAllPejabat> {
        return this._httpRequestService
            .getRequest(`${environment.webApiUrl}/master-officers`, {}, query)
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

    getById(officers_id: string): Observable<PejabatModel.GetByIdPejabat> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/master-officers/${officers_id}`);
    }

    create(payload: PejabatModel.CreatePejabat): Observable<PejabatModel.GetByIdPejabat> {
        let { officers_id, ...data } = payload as any;

        if (data.start_date_position) {
            data.start_date_position = this._utilityService.onFormatDate(new Date(data.start_date_position), 'yyyy-MM-DD');
        }

        if (data.end_date_position) {
            data.end_date_position = this._utilityService.onFormatDate(new Date(data.end_date_position), 'yyyy-MM-DD');
        }

        const formData = this._utilityService.jsonToFormData(data);

        return this._httpRequestService.postRequest(`${environment.webApiUrl}/master-officers`, formData);
    }

    update(payload: PejabatModel.UpdatePejabat): Observable<PejabatModel.GetByIdPejabat> {
        let { officers_id, ...data } = payload as any;

        if (data.start_date_position) {
            data.start_date_position = this._utilityService.onFormatDate(new Date(data.start_date_position), 'yyyy-MM-DD');
        }

        if (data.end_date_position) {
            data.end_date_position = this._utilityService.onFormatDate(new Date(data.end_date_position), 'yyyy-MM-DD');
        }

        const formData = this._utilityService.jsonToFormData(data);

        return this._httpRequestService.putRequest(`${environment.webApiUrl}/master-officers/${officers_id}`, formData);
    }

    delete(officers_id: string): Observable<PejabatModel.GetByIdPejabat> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/master-officers/${officers_id}`);
    }
}
