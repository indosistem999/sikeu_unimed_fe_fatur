import { PENGATURAN_HAK_AKSES_STATE } from "./hak-akses";
import { MenuState } from "./menu";
import { ModuleState } from "./module";
import { TahunAnggaranState } from "./tahun-anggaran";
import { PENGATURAN_UMUM_STATE } from "./umum";

export const PENGATURAN_STATE = [
    MenuState,
    ModuleState,
    TahunAnggaranState,
    ...PENGATURAN_UMUM_STATE,
    ...PENGATURAN_HAK_AKSES_STATE,
]