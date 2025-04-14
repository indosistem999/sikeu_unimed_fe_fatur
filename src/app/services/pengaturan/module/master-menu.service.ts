import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http/http-request.service';
import { UtilityService } from '../../utility/utility.service';

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
                            .filter((item: any) => {
                                return item.parent == null;
                            })
                            .sort((a: any, b: any) => {
                                return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                            })
                        : [];

                    result.data = this.nestMenus(result.data);

                    return result;
                })
            )
    }

    buildNestedMenuTree(input: any[]): any[] {
        const menuMap = new Map<string, any>();

        // Step 1: Normalize and store all menus
        for (const item of input) {
            const id = item.menu_id;
            if (!menuMap.has(id)) {
                menuMap.set(id, { ...item, children: [] });
            } else {
                const existing = menuMap.get(id);
                menuMap.set(id, { ...existing, ...item, children: existing.children });
            }
        }

        // Step 2: Merge children arrays (avoid duplication)
        for (const item of input) {
            const current = menuMap.get(item.menu_id);

            // Merge children from original input (if not already merged)
            if (Array.isArray(item.children)) {
                for (const child of item.children) {
                    const existingChild = menuMap.get(child.menu_id);
                    if (existingChild && !current.children.some((c: any) => c.menu_id === child.menu_id)) {
                        current.children.push(existingChild);
                    }
                }
            }
        }

        // Step 3: Nest children into their parents
        for (const item of menuMap.values()) {
            const parentId = item.parent?.menu_id || item.parent;
            if (parentId && menuMap.has(parentId)) {
                const parent = menuMap.get(parentId);
                if (!parent.children.some((c: any) => c.menu_id === item.menu_id)) {
                    parent.children.push(item);
                }
            }
        }

        // Step 4: Return only top-level nodes (parent === null)
        const rootMenus: any[] = [];
        for (const item of menuMap.values()) {
            const parentId = item.parent?.menu_id || item.parent;
            if (!parentId) {
                rootMenus.push(item);
            }
        }

        return rootMenus;
    }

    nestMenus(data: any[]): any[] {
        const menuMap = new Map<string, any>();

        // Step 1: Create map and initialize children arrays
        for (const item of data) {
            menuMap.set(item.menu_id, { ...item, children: item.children || [] });
        }

        // Step 2: Nest each item under its parent
        for (const item of menuMap.values()) {
            const parentId = item.parent?.menu_id || item.parent;
            if (parentId && menuMap.has(parentId)) {
                const parent = menuMap.get(parentId);

                // Avoid duplicates
                if (!parent.children.some((child: any) => child.menu_id === item.menu_id)) {
                    parent.children.push(item);
                }
            }
        }

        // Step 3: Return only root nodes
        const nested = [];
        for (const item of menuMap.values()) {
            const parentId = item.parent?.menu_id || item.parent;
            if (!parentId) {
                nested.push(item);
            }
        }

        return nested;
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
