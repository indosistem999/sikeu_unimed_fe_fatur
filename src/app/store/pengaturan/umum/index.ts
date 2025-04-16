import { IdentitasState } from "./identitas";
import { KategoriJabatanState } from "./kategori-jabatan";
import { PejabatState } from "./pejabat";
import { SatuanKerjaState } from "./satuan-kerja";
import { SumberDanaState } from "./sumber-dana";
import { UserState } from "./user";

export const PENGATURAN_UMUM_STATE = [
    UserState,
    PejabatState,
    IdentitasState,
    SumberDanaState,
    SatuanKerjaState,
    KategoriJabatanState,
]