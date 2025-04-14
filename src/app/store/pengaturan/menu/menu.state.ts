import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { of, switchMap, tap } from "rxjs";
import { MasterMenuService } from "src/app/services/pengaturan/module/master-menu.service";
import { MenuActions } from "./menu.action";

interface MenuStateModel {
    entities: any[];
    single?: any;
    success?: boolean;
    totalRows?: number;
}

@State<MenuStateModel>({
    name: 'menu',
    defaults: {
        entities: [
            {
                module_id: '1',
                menu_id: '11',
                menu_name: 'Beranda',
                menu_path: '/pengaturan/beranda',
            },
            {
                module_id: '1',
                menu_id: '12',
                menu_name: 'Umum',
                sub_menu: [
                    {
                        module_id: '1',
                        menu_id: '121',
                        menu_name: 'Satuan Kerja',
                        menu_path: '/pengaturan/umum/satuan-kerja',
                    },
                    {
                        module_id: '1',
                        menu_id: '122',
                        menu_name: 'Pejabat',
                        menu_path: '/pengaturan/umum/pejabat',
                    },
                    {
                        module_id: '1',
                        menu_id: '123',
                        menu_name: 'Identitas',
                        menu_path: '/pengaturan/umum/identitas',
                    },
                    {
                        module_id: '1',
                        menu_id: '124',
                        menu_name: 'Sumber Dana',
                        menu_path: '/pengaturan/umum/sumber-dana',
                    },
                ]
            },
            {
                module_id: '1',
                menu_id: '13',
                menu_name: 'Modul',
                menu_path: '/pengaturan/modul',
            },
            {
                module_id: '1',
                menu_id: '14',
                menu_name: 'Hak Akses',
                sub_menu: [
                    {
                        module_id: '1',
                        menu_id: '141',
                        menu_name: 'Role Akses',
                        menu_path: '/pengaturan/hak-akses/role-akses',
                    },
                    {
                        module_id: '1',
                        menu_id: '142',
                        menu_name: 'Daftar User',
                        menu_path: '/pengaturan/hak-akses/daftar-user',
                    }
                ]
            },
            {
                module_id: '1',
                menu_id: '15',
                menu_name: 'Tahun Anggaran',
                menu_path: '/pengaturan/tahun-anggaran',
            },
        ],
        success: true
    }
})
@Injectable()
export class MenuState {

    constructor(
        private _masterMenuService: MasterMenuService,
    ) { }

    @Selector()
    static menuEntities(state: MenuStateModel) {
        return state.entities;
    }

    @Selector()
    static menuSingle(state: MenuStateModel) {
        return state.single;
    }

    @Selector()
    static menuTotalRows(state: MenuStateModel) {
        return state.totalRows;
    }

    @Action(MenuActions.GetAllMenu)
    getAll(ctx: StateContext<MenuStateModel>, actions: any) {
        return this._masterMenuService
            .getAll(actions.query)
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

    @Action(MenuActions.GetByIdMenu)
    getById(ctx: StateContext<MenuStateModel>, actions: any) {
        return this._masterMenuService
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

    @Action(MenuActions.CreateMenu)
    create(ctx: StateContext<MenuStateModel>, actions: any) {
        return this._masterMenuService
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
                        return ctx.dispatch(new MenuActions.GetAllMenu({ module_id: actions.payload.module_id }));
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(MenuActions.CreateSubMenu)
    createSubMenu(ctx: StateContext<MenuStateModel>, actions: any) {
        return this._masterMenuService
            .createSubMenu(actions.payload)
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
                        return ctx.dispatch(new MenuActions.GetAllMenu({ module_id: actions.payload.module_id }));
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(MenuActions.UpdateMenu)
    update(ctx: StateContext<MenuStateModel>, actions: any) {
        return this._masterMenuService
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
                        return ctx.dispatch(new MenuActions.GetAllMenu({ module_id: actions.payload.module_id }));
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(MenuActions.DeleteMenu)
    delete(ctx: StateContext<MenuStateModel>, actions: any) {
        return this._masterMenuService
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
                        return ctx.dispatch(new MenuActions.GetAllMenu({ module_id: actions.payload.module_id }));
                    } else {
                        return of([]);
                    }
                })
            )
    }

}