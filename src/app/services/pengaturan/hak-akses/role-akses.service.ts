import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RoleModel } from 'src/app/model/pages/pengaturan/hak-akses/role.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http/http-request.service';
import { UtilityService } from '../../utility/utility.service';

@Injectable({
    providedIn: 'root'
})
export class RoleAksesService {

    constructor(
        private _utilityService: UtilityService,
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(query?: RoleModel.GetAllQuery): Observable<RoleModel.GetAllRole> {
        return this._httpRequestService
            .getRequest(`${environment.webApiUrl}/role`, {}, query)
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

    getById(role_id: string): Observable<RoleModel.GetByIdRole> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/role/${role_id}`);
    }

    create(payload: RoleModel.CreateRole): Observable<RoleModel.GetByIdRole> {
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/role`, payload);
    }

    update(payload: RoleModel.UpdateRole): Observable<RoleModel.GetByIdRole> {
        const { role_id, ...data } = payload;
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/role/${role_id}`, data);
    }

    delete(role_id: string): Observable<RoleModel.GetByIdRole> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/role/${role_id}`);
    }
}
