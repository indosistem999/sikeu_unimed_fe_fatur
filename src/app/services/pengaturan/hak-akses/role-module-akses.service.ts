import { Injectable } from '@angular/core';
import { Observable, map, takeUntil } from 'rxjs';
import { RoleModel } from 'src/app/model/pages/pengaturan/hak-akses/role.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http/http-request.service';
import { UtilityService } from '../../utility/utility.service';
import { RoleModuleAksesModel } from 'src/app/model/pages/pengaturan/hak-akses/role-module-akses.model';
import { HttpBaseResponse } from 'src/app/model/http/http-request.model';

@Injectable({
    providedIn: 'root'
})
export class RoleModuleAksesService {

    STANDARD_ACCESS = [
        "read",
        "add",
        "edit",
        "delete",
        "print",
        "import",
        "export"
    ];

    constructor(
        private _utilityService: UtilityService,
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(role_id: string): Observable<RoleModuleAksesModel.GetAllRoleModule> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/role-assign-module/${role_id}`);
    }

    createAssign(payload: RoleModuleAksesModel.CreateAssignRoleModule): Observable<HttpBaseResponse> {
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/role-assign-module/${payload.role_id}`, { module_id: payload.module_id });
    }

    deleteAssign(payload: RoleModuleAksesModel.DeleteAssignRoleModule): Observable<HttpBaseResponse> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/role-assign-module/${payload.role_id}/${payload.module_id}`);
    }

    getAllConfig(payload: RoleModuleAksesModel.CreateAssignRoleModule): Observable<HttpBaseResponse> {
        return this._httpRequestService
            .getRequest(`${environment.webApiUrl}/feature-access/${payload.role_id}/${payload.module_id}`)
            .pipe(
                map((result) => {
                    result.data.list_menu = this.updateMenuAccess(result.data.list_menu);
                    return result;
                })
            )
    }

    private transformAccessMenu(accessMenuFromApi: any[]) {
        return this.STANDARD_ACCESS.map(access => {
            const match = accessMenuFromApi.find((a: any) => a.access_name === access);
            return {
                access_name: access,
                access_label: this.transformAccessLabel(access),
                access_status: match ? match.access_status : "0",
                access_id: match ? match.access_id : null
            };
        });
    }

    private updateMenuAccess(menuList: any[]) {
        return menuList.map(menu => {
            // Transform access_menu
            menu.access_menu = this.transformAccessMenu(menu.access_menu || []);

            // Recursively process children
            if (menu.children && menu.children.length > 0) {
                menu.children = this.updateMenuAccess(menu.children);
            }

            return menu;
        });
    }

    private transformAccessLabel(access: any) {
        let label = "";

        if (access == 'read') {
            label = "Lihat";
        };

        if (access == 'add') {
            label = "Tambah";
        };

        if (access == 'edit') {
            label = "Edit";
        };

        if (access == 'delete') {
            label = "Hapus";
        };

        if (access == 'print') {
            label = "Cetak";
        };

        if (access == 'import') {
            label = "Import";
        };

        if (access == 'export') {
            label = "Export";
        };

        return label;
    }

    insertConfig(payload: any): Observable<HttpBaseResponse> {
        const data = {
            features: [
                {
                    module_access_id: payload.module_access_id,
                    list_menu: [
                        {
                            menu_id: payload.menu_id,
                            list_access: payload.list_access
                        }
                    ]
                }
            ]
        };

        return this._httpRequestService.postRequest(`${environment.webApiUrl}/feature-access/${payload.role_id}`, data)
    }

}
