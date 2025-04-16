import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { of, switchMap, tap } from "rxjs";
import { SumberDanaModel } from "src/app/model/pages/pengaturan/umum/sumber-dana.model";
import { SumberDanaService } from "src/app/services/pengaturan/umum/sumber-dana.service";
import { SumberDanaActions } from "./sumber-dana.action";

interface SumberDanaStateModel {
    entities: SumberDanaModel.ISumberDana[];
    single?: SumberDanaModel.ISumberDana;
    success?: boolean;
    totalRows?: number;
}

@State<SumberDanaStateModel>({
    name: 'sumber_dana',
    defaults: {
        entities: [],
        success: true
    }
})
@Injectable()
export class SumberDanaState {

    constructor(
        private _masterSumberDanaService: SumberDanaService,
    ) { }

    @Selector()
    static sumberDanaEntities(state: SumberDanaStateModel) {
        return state.entities;
    }

    @Selector()
    static sumberDanaSingle(state: SumberDanaStateModel) {
        return state.single;
    }

    @Selector()
    static sumberDanaTotalRows(state: SumberDanaStateModel) {
        return state.totalRows;
    }

    @Action(SumberDanaActions.GetAllSumberDana)
    getAll(ctx: StateContext<SumberDanaStateModel>, actions: any) {
        return this._masterSumberDanaService
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

    @Action(SumberDanaActions.GetByIdSumberDana)
    getById(ctx: StateContext<SumberDanaStateModel>, actions: any) {
        return this._masterSumberDanaService
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

    @Action(SumberDanaActions.CreateSumberDana)
    create(ctx: StateContext<SumberDanaStateModel>, actions: any) {
        return this._masterSumberDanaService
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
                        return ctx.dispatch(new SumberDanaActions.GetAllSumberDana());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(SumberDanaActions.UpdateSumberDana)
    update(ctx: StateContext<SumberDanaStateModel>, actions: any) {
        return this._masterSumberDanaService
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
                        return ctx.dispatch(new SumberDanaActions.GetAllSumberDana());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(SumberDanaActions.DeleteSumberDana)
    delete(ctx: StateContext<SumberDanaStateModel>, actions: any) {
        return this._masterSumberDanaService
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
                        return ctx.dispatch(new SumberDanaActions.GetAllSumberDana());
                    } else {
                        return of([]);
                    }
                })
            )
    }

}