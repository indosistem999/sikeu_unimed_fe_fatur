import { Routes } from "@angular/router";

export const pengaturanHakAksesRoutes: Routes = [
    {
        path: 'user',
        loadComponent: async () => (await import('./user/user.component')).UserComponent,
        data: {
            title: 'User',
            breadcrumbs: ['Pengaturan', 'Hak Akses', 'User']
        }
    },
    {
        path: 'role-akses',
        loadComponent: async () => (await import('./role-akses/role-akses.component')).RoleAksesComponent,
        data: {
            title: 'Role Akses',
            breadcrumbs: ['Pengaturan', 'Hak Akses', 'Role Akses']
        }
    },
    {
        path: 'role-akses/detail/:role_id',
        loadComponent: async () => (await import('./detail-role-akses/detail-role-akses.component')).DetailRoleAksesComponent,
        data: {
            title: 'Detail Role Akses',
            breadcrumbs: ['Pengaturan', 'Hak Akses', 'Detail Role Akses']
        }
    },
]