import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { of, switchMap, tap } from "rxjs";
import { ModulModel } from "src/app/model/pages/pengaturan/modul.model";
import { MasterModuleService } from "src/app/services/pengaturan/master-module.service";
import { ModulActions } from "./module.action";

interface ModuleStateModel {
    entities: ModulModel.IModul[];
    single?: ModulModel.IModul;
    success?: boolean;
    totalRows?: number;
}

@State<ModuleStateModel>({
    name: 'module',
    defaults: {
        entities: [],
        success: true
    }
})
@Injectable()
export class ModuleState {

    constructor(
        private _masterModulService: MasterModuleService,
    ) { }

    @Selector()
    static modulEntities(state: ModuleStateModel) {
        return state.entities;
    }

    @Selector()
    static modulSingle(state: ModuleStateModel) {
        return state.single;
    }

    @Selector()
    static modulTotalRows(state: ModuleStateModel) {
        return state.totalRows;
    }

    @Action(ModulActions.GetAllModul)
    getAll(ctx: StateContext<ModuleStateModel>, actions: any) {
        return this._masterModulService
            .getAll(actions.query)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    ctx.setState({
                        ...state,
                        entities: result.data.rows,
                        totalRows: result.data.total_row
                    });
                })
            )
    }

    @Action(ModulActions.GetByIdModul)
    getById(ctx: StateContext<ModuleStateModel>, actions: any) {
        return this._masterModulService
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

    @Action(ModulActions.CreateModul)
    create(ctx: StateContext<ModuleStateModel>, actions: any) {
        return this._masterModulService
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
                        return ctx.dispatch(new ModulActions.GetAllModul());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(ModulActions.UpdateModul)
    update(ctx: StateContext<ModuleStateModel>, actions: any) {
        return this._masterModulService
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
                        return ctx.dispatch(new ModulActions.GetAllModul());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(ModulActions.DeleteModul)
    delete(ctx: StateContext<ModuleStateModel>, actions: any) {
        return this._masterModulService
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
                        return ctx.dispatch(new ModulActions.GetAllModul());
                    } else {
                        return of([]);
                    }
                })
            )
    }

}