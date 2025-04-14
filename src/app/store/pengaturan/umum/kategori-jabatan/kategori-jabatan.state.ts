import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { of, switchMap, tap } from "rxjs";
import { KategoriJabatanModel } from "src/app/model/pages/pengaturan/umum/kategori-jabatan.model";
import { KategoriJabatanService } from "src/app/services/pengaturan/umum/kategori-jabatan.service";
import { KategoriJabatanActions } from "./kategori-jabatan.action";

interface KategoriJabatanStateModel {
    entities: KategoriJabatanModel.IKategoriJabatan[];
    single?: KategoriJabatanModel.IKategoriJabatan;
    success?: boolean;
    totalRows?: number;
}

@State<KategoriJabatanStateModel>({
    name: 'kategori_jabatan',
    defaults: {
        entities: [],
        success: true
    }
})
@Injectable()
export class KategoriJabatanState {

    constructor(
        private _masterKategoriJabatanService: KategoriJabatanService,
    ) { }

    @Selector()
    static kategoriJabatanEntities(state: KategoriJabatanStateModel) {
        return state.entities;
    }

    @Selector()
    static kategoriJabatanSingle(state: KategoriJabatanStateModel) {
        return state.single;
    }

    @Selector()
    static kategoriJabatanTotalRows(state: KategoriJabatanStateModel) {
        return state.totalRows;
    }

    @Action(KategoriJabatanActions.GetAllKategoriJabatan)
    getAll(ctx: StateContext<KategoriJabatanStateModel>, actions: any) {
        return this._masterKategoriJabatanService
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

    @Action(KategoriJabatanActions.GetByIdKategoriJabatan)
    getById(ctx: StateContext<KategoriJabatanStateModel>, actions: any) {
        return this._masterKategoriJabatanService
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

    @Action(KategoriJabatanActions.CreateKategoriJabatan)
    create(ctx: StateContext<KategoriJabatanStateModel>, actions: any) {
        return this._masterKategoriJabatanService
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
                        return ctx.dispatch(new KategoriJabatanActions.GetAllKategoriJabatan());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(KategoriJabatanActions.UpdateKategoriJabatan)
    update(ctx: StateContext<KategoriJabatanStateModel>, actions: any) {
        return this._masterKategoriJabatanService
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
                        return ctx.dispatch(new KategoriJabatanActions.GetAllKategoriJabatan());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(KategoriJabatanActions.DeleteKategoriJabatan)
    delete(ctx: StateContext<KategoriJabatanStateModel>, actions: any) {
        return this._masterKategoriJabatanService
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
                        return ctx.dispatch(new KategoriJabatanActions.GetAllKategoriJabatan());
                    } else {
                        return of([]);
                    }
                })
            )
    }

}