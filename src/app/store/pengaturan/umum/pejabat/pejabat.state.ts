import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { of, switchMap, tap } from "rxjs";
import { PejabatModel } from "src/app/model/pages/pengaturan/umum/pejabat.model";
import { PejabatService } from "src/app/services/pengaturan/umum/pejabat.service";
import { PejabatActions } from "./pejabat.action";

interface PejabatStateModel {
    entities: PejabatModel.IPejabat[];
    single?: PejabatModel.IPejabat;
    satker?: PejabatModel.IPejabat[];
    success?: boolean;
    totalRows?: number;
}

@State<PejabatStateModel>({
    name: 'pejabat',
    defaults: {
        entities: [],
        satker: [],
        success: true
    }
})
@Injectable()
export class PejabatState {

    constructor(
        private _masterPejabatService: PejabatService,
    ) { }

    @Selector()
    static pejabatEntities(state: PejabatStateModel) {
        return state.entities;
    }

    @Selector()
    static pejabatSatker(state: PejabatStateModel) {
        return state.satker;
    }

    @Selector()
    static pejabatSingle(state: PejabatStateModel) {
        return state.single;
    }

    @Selector()
    static pejabatTotalRows(state: PejabatStateModel) {
        return state.totalRows;
    }

    @Action(PejabatActions.GetAllPejabat)
    getAll(ctx: StateContext<PejabatStateModel>, actions: any) {
        return this._masterPejabatService
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

    @Action(PejabatActions.GetAllPejabatInSatker)
    getAllInSatker(ctx: StateContext<PejabatStateModel>, actions: any) {
        return this._masterPejabatService
            .getAllInSatker(actions.query)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    ctx.setState({
                        ...state,
                        satker: result.data.records,
                    });
                })
            )
    }

    @Action(PejabatActions.GetByIdPejabat)
    getById(ctx: StateContext<PejabatStateModel>, actions: any) {
        return this._masterPejabatService
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

    @Action(PejabatActions.CreatePejabat)
    create(ctx: StateContext<PejabatStateModel>, actions: any) {
        return this._masterPejabatService
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
                        return ctx.dispatch(new PejabatActions.GetAllPejabat());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(PejabatActions.UpdatePejabat)
    update(ctx: StateContext<PejabatStateModel>, actions: any) {
        return this._masterPejabatService
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
                        return ctx.dispatch(new PejabatActions.GetAllPejabat());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(PejabatActions.DeletePejabat)
    delete(ctx: StateContext<PejabatStateModel>, actions: any) {
        return this._masterPejabatService
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
                        return ctx.dispatch(new PejabatActions.GetAllPejabat());
                    } else {
                        return of([]);
                    }
                })
            )
    }

}