import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserModel } from 'src/app/model/pages/pengaturan/user.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../http/http-request.service';
import { UtilityService } from '../utility/utility.service';

@Injectable({
    providedIn: 'root'
})
export class MasterUserService {

    constructor(
        private _utilityService: UtilityService,
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(query?: UserModel.GetAllQuery): Observable<UserModel.GetAllUser> {
        return this._httpRequestService
            .getRequest(`${environment.webApiUrl}/user`, {}, query)
            .pipe(
                map((result) => {
                    if (result.data.records.length) {
                        result.data.records = result.data.records.map((item: any, index: number) => {
                            return {
                                ...item,
                                no: index + 1,
                                full_name: `${item.first_name} ${item.last_name}`
                            }
                        });
                    }

                    return result;
                })
            )
    }

    getById(user_id: string): Observable<UserModel.GetByIdUser> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/user/${user_id}`);
    }

    create(payload: UserModel.CreateUser): Observable<UserModel.GetByIdUser> {
        const data = this._utilityService.jsonToFormData(payload);
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/user`, data);
    }

    update(payload: UserModel.UpdateUser): Observable<UserModel.GetByIdUser> {
        const { user_id, ...data } = payload;
        const formData = this._utilityService.jsonToFormData(data);
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/user/${user_id}`, formData);
    }

    delete(user_id: string): Observable<UserModel.GetByIdUser> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/user/${user_id}`);
    }
}
