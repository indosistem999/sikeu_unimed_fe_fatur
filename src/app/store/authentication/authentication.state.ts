import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AuthenticationModel } from "src/app/model/pages/authentication/authentication.model";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { AuthenticationActions } from "./authentication.action";
import { tap } from "rxjs";

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
}