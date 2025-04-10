import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http/http-request.service';
import { ModulModel } from 'src/app/model/pages/pengaturan/modul.model';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilityService } from '../utility/utility.service';

@Injectable({
    providedIn: 'root'
})
export class MasterModuleService {

    constructor(
        private _utilityService: UtilityService,
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(query?: ModulModel.GetAllQuery): Observable<ModulModel.GetAllModul> {
        return this._httpRequestService
            .getRequest(`${environment.webApiUrl}/master-module`, {}, query)
            .pipe(
                map((result) => {
                    result.data.rows = result.data.rows.sort((a: any, b: any) => { return parseInt(a.order_number) - parseInt(b.order_number) });
                    return result;
                })
            )
    }

    getById(module_id: string): Observable<ModulModel.GetByIdModul> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/master-module/${module_id}`);
    }

    create(payload: ModulModel.CreateModul): Observable<ModulModel.GetByIdModul> {
        delete (<any>payload).module_id;
        const formData = this._utilityService.jsonToFormData(payload);
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/master-module`, formData);
    }

    update(payload: ModulModel.UpdateModul): Observable<ModulModel.GetByIdModul> {
        const { module_id, ...data } = payload;
        const formData = this._utilityService.jsonToFormData(data);
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/master-module/${module_id}`, formData);
    }

    delete(module_id: string): Observable<ModulModel.GetByIdModul> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/master-module/${module_id}`);
    }
}
