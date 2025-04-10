import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './middleware/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadComponent: async () => (await import('./pages/authentication/authentication.component')).AuthenticationComponent,
        data: {
            title: 'Login'
        }
    },
    {
        path: 'list-module',
        loadComponent: async () => (await import('./pages/module-list/module-list.component')).ModuleListComponent,
        data: {
            title: 'List Module'
        }
    },
    {
        path: 'pengaturan',
        loadChildren: async () => (await import('./pages/pengaturan/pengaturan.routes')).pengaturanRoutes
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
