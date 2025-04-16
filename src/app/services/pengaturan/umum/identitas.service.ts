import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IdentitasModel } from 'src/app/model/pages/pengaturan/umum/identitas.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http/http-request.service';
import { UtilityService } from '../../utility/utility.service';

@Injectable({
    providedIn: 'root'
})
export class IdentitasService {

    constructor(
        private _utilityService: UtilityService,
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(query?: IdentitasModel.GetAllQuery): Observable<IdentitasModel.GetAllIdentitas> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/master-identity`, {}, query);
    }

    getById(identity_id: string): Observable<IdentitasModel.GetByIdIdentitas> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/master-identity/${identity_id}`);
    }

    create(payload: IdentitasModel.CreateIdentitas): Observable<IdentitasModel.GetByIdIdentitas> {
        delete (<any>payload).identity_id;
        const formData = this._utilityService.jsonToFormData(payload);
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/master-identity`, formData);
    }

    update(payload: IdentitasModel.UpdateIdentitas): Observable<IdentitasModel.GetByIdIdentitas> {
        const { identity_id, ...data } = payload;
        const formData = this._utilityService.jsonToFormData(data);
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/master-identity/${identity_id}`, formData);
    }

    delete(identity_id: string): Observable<IdentitasModel.GetByIdIdentitas> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/master-identity/${identity_id}`);
    }
}
