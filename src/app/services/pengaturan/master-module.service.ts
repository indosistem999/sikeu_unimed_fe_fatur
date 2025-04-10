import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http/http-request.service';
import { ModulModel } from 'src/app/model/pages/pengaturan/modul.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MasterModuleService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(query?: ModulModel.GetAllQuery): Observable<ModulModel.GetAllModul> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/master-module`, {}, query);
    }

    getById(module_id: string): Observable<ModulModel.GetByIdModul> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/master-module/${module_id}`);
    }

    create(payload: ModulModel.CreateModul): Observable<ModulModel.GetByIdModul> {
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/master-module`, payload);
    }

    update(payload: ModulModel.UpdateModul): Observable<ModulModel.GetByIdModul> {
        const { module_id, ...data } = payload;
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/master-module/${module_id}`, data);
    }

    delete(module_id: string): Observable<ModulModel.GetByIdModul> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/master-module/${module_id}`);
    }
}
