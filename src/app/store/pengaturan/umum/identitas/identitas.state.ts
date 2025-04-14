import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { of, switchMap, tap } from "rxjs";
import { IdentitasModel } from "src/app/model/pages/pengaturan/umum/identitas.model";
import { IdentitasService } from "src/app/services/pengaturan/umum/identitas.service";
import { IdentitasActions } from "./identitas.action";

interface IdentitasStateModel {
    entities: IdentitasModel.IIdentitas[];
    single?: IdentitasModel.IIdentitas;
    success?: boolean;
    totalRows?: number;
}

@State<IdentitasStateModel>({
    name: 'identitas',
    defaults: {
        entities: [],
        success: true
    }
})
@Injectable()
export class IdentitasState {

    constructor(
        private _masterIdentitasService: IdentitasService,
    ) { }

    @Selector()
    static identitasEntities(state: IdentitasStateModel) {
        return state.entities;
    }

    @Selector()
    static identitasSingle(state: IdentitasStateModel) {
        return state.single;
    }

    @Selector()
    static identitasTotalRows(state: IdentitasStateModel) {
        return state.totalRows;
    }

    @Action(IdentitasActions.GetAllIdentitas)
    getAll(ctx: StateContext<IdentitasStateModel>, actions: any) {
        return this._masterIdentitasService
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

    @Action(IdentitasActions.GetByIdIdentitas)
    getById(ctx: StateContext<IdentitasStateModel>, actions: any) {
        return this._masterIdentitasService
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

    @Action(IdentitasActions.CreateIdentitas)
    create(ctx: StateContext<IdentitasStateModel>, actions: any) {
        return this._masterIdentitasService
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
                    if (result.responseResult) {
                        return ctx.dispatch(new IdentitasActions.GetAllIdentitas());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(IdentitasActions.UpdateIdentitas)
    update(ctx: StateContext<IdentitasStateModel>, actions: any) {
        return this._masterIdentitasService
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
                    if (result.responseResult) {
                        return ctx.dispatch(new IdentitasActions.GetAllIdentitas());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(IdentitasActions.DeleteIdentitas)
    delete(ctx: StateContext<IdentitasStateModel>, actions: any) {
        return this._masterIdentitasService
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
                    if (result.responseResult) {
                        return ctx.dispatch(new IdentitasActions.GetAllIdentitas());
                    } else {
                        return of([]);
                    }
                })
            )
    }

}