import { MenuState } from "./menu";
import { ModuleState } from "./module";
import { PENGATURAN_UMUM_STATE } from "./umum";

export const PENGATURAN_STATE = [
    MenuState,
    ModuleState,
    ...PENGATURAN_UMUM_STATE
]