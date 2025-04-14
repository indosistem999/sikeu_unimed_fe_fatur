import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { of, switchMap, tap } from "rxjs";
import { SatuanKerjaModel } from "src/app/model/pages/pengaturan/umum/satuan-kerja.model";
import { SatuanKerjaService } from "src/app/services/pengaturan/umum/satuan-kerja.service";
import { SatuanKerjaActions } from "./satuan-kerja.action";

interface SatuanKerjaStateModel {
    entities: SatuanKerjaModel.ISatuanKerja[];
    single?: SatuanKerjaModel.ISatuanKerja;
    success?: boolean;
    totalRows?: number;
}

@State<SatuanKerjaStateModel>({
    name: 'satuan_kerja',
    defaults: {
        entities: [],
        success: true
    }
})
@Injectable()
export class SatuanKerjaState {

    constructor(
        private _masterSatuanKerjaService: SatuanKerjaService,
    ) { }

    @Selector()
    static satuanKerjaEntities(state: SatuanKerjaStateModel) {
        return state.entities;
    }

    @Selector()
    static satuanKerjaSingle(state: SatuanKerjaStateModel) {
        return state.single;
    }

    @Selector()
    static satuanKerjaTotalRows(state: SatuanKerjaStateModel) {
        return state.totalRows;
    }

    @Action(SatuanKerjaActions.GetAllSatuanKerja)
    getAll(ctx: StateContext<SatuanKerjaStateModel>, actions: any) {
        return this._masterSatuanKerjaService
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

    @Action(SatuanKerjaActions.GetByIdSatuanKerja)
    getById(ctx: StateContext<SatuanKerjaStateModel>, actions: any) {
        return this._masterSatuanKerjaService
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

    @Action(SatuanKerjaActions.CreateSatuanKerja)
    create(ctx: StateContext<SatuanKerjaStateModel>, actions: any) {
        return this._masterSatuanKerjaService
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
                        return ctx.dispatch(new SatuanKerjaActions.GetAllSatuanKerja());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(SatuanKerjaActions.UpdateSatuanKerja)
    update(ctx: StateContext<SatuanKerjaStateModel>, actions: any) {
        return this._masterSatuanKerjaService
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
                        return ctx.dispatch(new SatuanKerjaActions.GetAllSatuanKerja());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(SatuanKerjaActions.DeleteSatuanKerja)
    delete(ctx: StateContext<SatuanKerjaStateModel>, actions: any) {
        return this._masterSatuanKerjaService
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
                        return ctx.dispatch(new SatuanKerjaActions.GetAllSatuanKerja());
                    } else {
                        return of([]);
                    }
                })
            )
    }

}