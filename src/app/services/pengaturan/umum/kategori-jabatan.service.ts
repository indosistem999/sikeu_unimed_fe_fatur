import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http/http-request.service';
import { UtilityService } from '../../utility/utility.service';
import { KategoriJabatanModel } from 'src/app/model/pages/pengaturan/umum/kategori-jabatan.model';

@Injectable({
    providedIn: 'root'
})
export class KategoriJabatanService {

    constructor(
        private _utilityService: UtilityService,
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(query?: KategoriJabatanModel.GetAllQuery): Observable<KategoriJabatanModel.GetAllKategoriJabatan> {
        return this._httpRequestService
            .getRequest(`${environment.webApiUrl}/master-job-category`, {}, query)
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

    getById(job_category_id: string): Observable<KategoriJabatanModel.GetByIdKategoriJabatan> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/master-job-category/${job_category_id}`);
    }

    create(payload: KategoriJabatanModel.CreateKategoriJabatan): Observable<KategoriJabatanModel.GetByIdKategoriJabatan> {
        const { job_category_id, ...data } = payload as any;
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/master-job-category`, data);
    }

    update(payload: KategoriJabatanModel.UpdateKategoriJabatan): Observable<KategoriJabatanModel.GetByIdKategoriJabatan> {
        const { job_category_id, ...data } = payload;
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/master-job-category/${job_category_id}`, data);
    }

    delete(job_category_id: string): Observable<KategoriJabatanModel.GetByIdKategoriJabatan> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/master-job-category/${job_category_id}`);
    }
}
