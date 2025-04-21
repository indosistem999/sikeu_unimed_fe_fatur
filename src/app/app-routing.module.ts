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
        path: 'profile',
        loadComponent: async () => (await import('./pages/profile/profile.component')).ProfileComponent,
        data: {
            show_title: false,
        }
    },
    {
        path: 'pengaturan',
        loadChildren: async () => (await import('./pages/pengaturan/pengaturan.routes')).pengaturanRoutes
    },
    {
        path: 'sppd',
        loadChildren: async () => (await import('./pages/sppd/sppd.routes')).sppdRoutes
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
