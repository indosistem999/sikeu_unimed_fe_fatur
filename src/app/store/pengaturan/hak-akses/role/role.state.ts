import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { of, switchMap, tap } from "rxjs";
import { RoleModel } from "src/app/model/pages/pengaturan/hak-akses/role.model";
import { RoleActions } from "./role.action";
import { RoleAksesService } from "src/app/services/pengaturan/hak-akses/role-akses.service";

interface RoleStateModel {
    entities: RoleModel.IRole[];
    single?: RoleModel.IRole;
    success?: boolean;
    totalRows?: number;
}

@State<RoleStateModel>({
    name: 'role',
    defaults: {
        entities: [],
        success: true
    }
})
@Injectable()
export class RoleState {

    constructor(
        private _masterRoleService: RoleAksesService,
    ) { }

    @Selector()
    static roleEntities(state: RoleStateModel) {
        return state.entities;
    }

    @Selector()
    static roleSingle(state: RoleStateModel) {
        return state.single;
    }

    @Selector()
    static roleTotalRows(state: RoleStateModel) {
        return state.totalRows;
    }

    @Action(RoleActions.GetAllRole)
    getAll(ctx: StateContext<RoleStateModel>, actions: any) {
        return this._masterRoleService
            .getAll(actions.query)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    ctx.setState({
                        ...state,
                        entities: result.data.records,
                        totalRows: result.data.total_row
                    });
                })
            )
    }

    @Action(RoleActions.GetByIdRole)
    getById(ctx: StateContext<RoleStateModel>, actions: any) {
        return this._masterRoleService
            .getById(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    ctx.setState({
                        ...state,
                        single: result.data,
                    });
                })
            )
    }

    @Action(RoleActions.CreateRole)
    create(ctx: StateContext<RoleStateModel>, actions: any) {
        return this._masterRoleService
            .create(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    if (result.success) {
                        ctx.setState({
                            ...state,
                            success: true
                        })
                    } else {
                        ctx.patchState({
                            ...state,
                            success: false
                        })
                    }
                }),
                switchMap((result: any) => {
                    if (result.success) {
                        return ctx.dispatch(new RoleActions.GetAllRole());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(RoleActions.UpdateRole)
    update(ctx: StateContext<RoleStateModel>, actions: any) {
        return this._masterRoleService
            .update(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    if (result.success) {
                        ctx.setState({
                            ...state,
                            success: true
                        })
                    } else {
                        ctx.patchState({
                            ...state,
                            success: false
                        })
                    }
                }),
                switchMap((result: any) => {
                    if (result.success) {
                        return ctx.dispatch(new RoleActions.GetAllRole());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(RoleActions.DeleteRole)
    delete(ctx: StateContext<RoleStateModel>, actions: any) {
        return this._masterRoleService
            .delete(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    if (result.success) {
                        ctx.setState({
                            ...state,
                            success: true
                        })
                    } else {
                        ctx.patchState({
                            ...state,
                            success: false
                        })
                    }
                }),
                switchMap((result: any) => {
                    if (result.success) {
                        return ctx.dispatch(new RoleActions.GetAllRole());
                    } else {
                        return of([]);
                    }
                })
            )
    }

}