import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TahunAnggaranModel } from 'src/app/model/pages/pengaturan/tahun-anggaran/tahun-anggaran.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http/http-request.service';
import { UtilityService } from '../../utility/utility.service';

@Injectable({
    providedIn: 'root'
})
export class TahunAnggaranService {

    constructor(
        private _utilityService: UtilityService,
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(query?: TahunAnggaranModel.GetAllQuery): Observable<TahunAnggaranModel.GetAllTahunAnggaran> {
        return this._httpRequestService
            .getRequest(`${environment.webApiUrl}/master-budget-year`, {}, query)
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

    getById(budget_id: string): Observable<TahunAnggaranModel.GetByIdTahunAnggaran> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/master-budget-year/${budget_id}`);
    }

    create(payload: TahunAnggaranModel.CreateTahunAnggaran): Observable<TahunAnggaranModel.GetByIdTahunAnggaran> {
        let { budget_id, ...data } = payload as any;

        data.budget_start_date = this._utilityService.onFormatDate(new Date(data.budget_start_date), 'yyyy-MM-DD');
        data.budget_end_date = this._utilityService.onFormatDate(new Date(data.budget_end_date), 'yyyy-MM-DD');

        return this._httpRequestService.postRequest(`${environment.webApiUrl}/master-budget-year`, data);
    }

    update(payload: TahunAnggaranModel.UpdateTahunAnggaran): Observable<TahunAnggaranModel.GetByIdTahunAnggaran> {
        const { budget_id, ...data } = payload;
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/master-budget-year/${budget_id}`, data);
    }

    delete(budget_id: string): Observable<TahunAnggaranModel.GetByIdTahunAnggaran> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/master-budget-year/${budget_id}`);
    }
}
