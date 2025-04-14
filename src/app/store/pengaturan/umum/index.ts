import { IdentitasState } from "./identitas";
import { KategoriJabatanState } from "./kategori-jabatan";
import { SatuanKerjaState } from "./satuan-kerja";
import { SumberDanaState } from "./sumber-dana";
import { UserState } from "./user";

export const PENGATURAN_UMUM_STATE = [
    UserState,
    IdentitasState,
    SumberDanaState,
    SatuanKerjaState,
    KategoriJabatanState,
]