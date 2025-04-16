import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { of, switchMap, tap } from "rxjs";
import { UserActions } from "./user.action";
import { MasterUserService } from "src/app/services/pengaturan/hak-akses/master-user.service";
import { UserModel } from "src/app/model/pages/pengaturan/module/user.model";

interface UserStateModel {
    entities: UserModel.IUser[];
    single?: UserModel.IUser;
    success?: boolean;
    totalRows?: number;
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        entities: [],
        success: true
    }
})
@Injectable()
export class UserState {

    constructor(
        private _masterUserService: MasterUserService,
    ) { }

    @Selector()
    static userEntities(state: UserStateModel) {
        return state.entities;
    }

    @Selector()
    static userSingle(state: UserStateModel) {
        return state.single;
    }

    @Selector()
    static userTotalRows(state: UserStateModel) {
        return state.totalRows;
    }

    @Action(UserActions.GetAllUser)
    getAll(ctx: StateContext<UserStateModel>, actions: any) {
        return this._masterUserService
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

    @Action(UserActions.GetByIdUser)
    getById(ctx: StateContext<UserStateModel>, actions: any) {
        return this._masterUserService
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

    @Action(UserActions.CreateUser)
    create(ctx: StateContext<UserStateModel>, actions: any) {
        return this._masterUserService
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
                        return ctx.dispatch(new UserActions.GetAllUser());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(UserActions.UpdateUser)
    update(ctx: StateContext<UserStateModel>, actions: any) {
        return this._masterUserService
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
                        return ctx.dispatch(new UserActions.GetAllUser());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(UserActions.DeleteUser)
    delete(ctx: StateContext<UserStateModel>, actions: any) {
        return this._masterUserService
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
                        return ctx.dispatch(new UserActions.GetAllUser());
                    } else {
                        return of([]);
                    }
                })
            )
    }

}