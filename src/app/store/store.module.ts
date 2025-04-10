import { NgModule, ModuleWithProviders } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { environment } from "src/environments/environment";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { AuthenticationState } from "./authentication";
import { PENGATURAN_STATE } from "./pengaturan";

const STATES: any[] = [
    AuthenticationState,
    ...PENGATURAN_STATE
];

@NgModule({
    imports: [
        NgxsModule.forRoot([...STATES], {
            developmentMode: !environment.production,
        }),
        NgxsLoggerPluginModule.forRoot(),
    ],
})
export class StateModule {
    static forRoot(): ModuleWithProviders<StateModule> {
        return {
            ngModule: StateModule,
        }
    }
}