import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../http/http-request.service';
import { UtilityService } from '../utility/utility.service';

@Injectable({
    providedIn: 'root'
})
export class MasterMenuService {

    constructor(
        private _utilityService: UtilityService,
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(query?: any): Observable<any> {
        return this._httpRequestService
            .getRequest(`${environment.webApiUrl}/master-menu`, {}, query)
            .pipe(
                map((result) => {
                    result.data = result.data.length
                        ? result.data
                            .sort((a: any, b: any) => {
                                return parseInt(a.order_number) - parseInt(b.order_number)
                            })
                        : [];

                    return result;
                })
            )
    }

    getById(menu_id: string): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/master-menu/${menu_id}`);
    }

    create(payload: any): Observable<any> {
        delete (<any>payload).menu_id;
        const formData = this._utilityService.jsonToFormData(payload);
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/master-menu`, formData);
    }

    createSubMenu(payload: any): Observable<any> {
        delete (<any>payload).menu_id;
        const formData = this._utilityService.jsonToFormData(payload);
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/master-menu/sub-menu`, formData);
    }

    update(payload: any): Observable<any> {
        const { menu_id, ...data } = payload;
        const formData = this._utilityService.jsonToFormData(data);
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/master-menu/${menu_id}`, formData);
    }

    delete(menu_id: string): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/master-menu/${menu_id}`);
    }
}
