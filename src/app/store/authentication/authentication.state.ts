import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AuthenticationModel } from "src/app/model/pages/authentication/authentication.model";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { AuthenticationActions } from "./authentication.action";
import { of, switchMap, tap } from "rxjs";
import { MasterUserService } from "src/app/services/pengaturan/hak-akses/master-user.service";

interface AuthStateModel {
    entities: AuthenticationModel.IAuthentication;
    success?: boolean;
}

@State<AuthStateModel>({
    name: 'authentication',
    defaults: {
        entities: null as any,
        success: true
    }
})
@Injectable()
export class AuthenticationState {

    constructor(
        private _userService: MasterUserService,
        private _authenticationService: AuthenticationService,
    ) {
        const userData = this._authenticationService.getUserData();
    }

    @Selector()
    static authEntities(state: AuthStateModel) {
        return state.entities;
    }

    @Action(AuthenticationActions.SignIn)
    signIn(ctx: StateContext<AuthStateModel>, actions: any) {
        return this._authenticationService
            .signIn(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    ctx.setState({
                        ...state,
                        entities: result.data,
                    });
                })
            )
    }

    @Action(AuthenticationActions.GetProfile)
    getProfile(ctx: StateContext<AuthStateModel>) {
        const userData = this._authenticationService.getUserData();
        const state = ctx.getState();
        ctx.setState({
            ...state,
            entities: userData
        });

        return userData ? true : false;
    }

    @Action(AuthenticationActions.GetProfileFromApi)
    getProfileApi(ctx: StateContext<AuthStateModel>) {
        const userData = this._authenticationService.getUserData();

        return this._authenticationService
            .getProfile(userData.access_token)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    const data = { ...result.data, access_token: userData.access_token, refresh_token: userData.refresh_token };

                    localStorage.setItem("_SIMKEU_UD_", JSON.stringify(data));

                    this._authenticationService.setUserData();

                    ctx.setState({
                        ...state,
                        entities: data,
                    });
                })
            )
    }

    @Action(AuthenticationActions.UpdateProfile)
    updateProfile(ctx: StateContext<AuthStateModel>, actions: any) {
        return this._userService
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
                        return ctx.dispatch(new AuthenticationActions.GetProfileFromApi());
                    } else {
                        return of([]);
                    }
                })
            )
    }
}