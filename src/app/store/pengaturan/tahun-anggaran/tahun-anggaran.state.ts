import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { of, switchMap, tap } from "rxjs";
import { TahunAnggaranModel } from "src/app/model/pages/pengaturan/tahun-anggaran/tahun-anggaran.model";
import { TahunAnggaranService } from "src/app/services/pengaturan/tahun-anggaran/tahun-anggaran.service";
import { TahunAnggaranActions } from "./tahun-anggaran.action";

interface TahunAnggaranStateModel {
    entities: TahunAnggaranModel.ITahunAnggaran[];
    single?: TahunAnggaranModel.ITahunAnggaran;
    success?: boolean;
    totalRows?: number;
}

@State<TahunAnggaranStateModel>({
    name: 'tahun_anggaran',
    defaults: {
        entities: [],
        success: true
    }
})
@Injectable()
export class TahunAnggaranState {

    constructor(
        private _masterTahunAnggaranService: TahunAnggaranService,
    ) { }

    @Selector()
    static tahunAnggaranEntities(state: TahunAnggaranStateModel) {
        return state.entities;
    }

    @Selector()
    static tahunAnggaranSingle(state: TahunAnggaranStateModel) {
        return state.single;
    }

    @Selector()
    static tahunAnggaranTotalRows(state: TahunAnggaranStateModel) {
        return state.totalRows;
    }

    @Action(TahunAnggaranActions.GetAllTahunAnggaran)
    getAll(ctx: StateContext<TahunAnggaranStateModel>, actions: any) {
        return this._masterTahunAnggaranService
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

    @Action(TahunAnggaranActions.GetByIdTahunAnggaran)
    getById(ctx: StateContext<TahunAnggaranStateModel>, actions: any) {
        return this._masterTahunAnggaranService
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

    @Action(TahunAnggaranActions.CreateTahunAnggaran)
    create(ctx: StateContext<TahunAnggaranStateModel>, actions: any) {
        return this._masterTahunAnggaranService
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
                        return ctx.dispatch(new TahunAnggaranActions.GetAllTahunAnggaran());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(TahunAnggaranActions.UpdateTahunAnggaran)
    update(ctx: StateContext<TahunAnggaranStateModel>, actions: any) {
        return this._masterTahunAnggaranService
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
                        return ctx.dispatch(new TahunAnggaranActions.GetAllTahunAnggaran());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(TahunAnggaranActions.DeleteTahunAnggaran)
    delete(ctx: StateContext<TahunAnggaranStateModel>, actions: any) {
        return this._masterTahunAnggaranService
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
                        return ctx.dispatch(new TahunAnggaranActions.GetAllTahunAnggaran());
                    } else {
                        return of([]);
                    }
                })
            )
    }

}