import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';
import { FormModel } from 'src/app/model/components/form.model';
import { AuthenticationState } from 'src/app/store/authentication';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { SafeUrlPipe } from 'src/app/middleware/pipe/safeUrl.pipe';

@Component({
    selector: 'app-detail-profile',
    standalone: true,
    imports: [
        SafeUrlPipe,
        CommonModule,
        ButtonModule,
        DynamicFormComponent,
    ],
    templateUrl: './detail-profile.component.html',
    styleUrl: './detail-profile.component.scss'
})
export class DetailProfileComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    PageState: 'edit' | 'detail' = 'detail';

    DetailProfile: any[] = [];

    ProfileObject: any;

    FormProps: FormModel.IForm;
    @ViewChild('FormComps') FormComps!: DynamicFormComponent;

    constructor(
        private _store: Store,
        private _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute
    ) {
        this.FormProps = {
            id: 'form_user',
            fields: [
                {
                    id: 'user_id',
                    label: 'ID',
                    required: true,
                    type: 'text',
                    value: '',
                    readonly: true,
                    hidden: true
                },
                {
                    id: 'nip',
                    label: 'NIP',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'name',
                    label: 'Nama Lengkap',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'email',
                    label: 'Email',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'phone_number',
                    label: 'No. Handphone',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'gender',
                    label: 'Gender',
                    required: true,
                    type: 'radio',
                    value: '',
                    radioButtonProps: [
                        { name: 'gender', label: 'Laki - Laki', value: 'L' },
                        { name: 'gender', label: 'Perempuan', value: 'P' },
                    ]
                },
                {
                    id: 'role_id',
                    label: 'User Akses',
                    required: true,
                    type: 'select',
                    value: '',
                    dropdownProps: {
                        options: [],
                        optionName: 'role_name',
                        optionValue: 'role_id'
                    }
                },
                {
                    id: 'has_work_unit',
                    label: 'Satuan Kerja?',
                    required: true,
                    type: 'radio',
                    value: '',
                    radioButtonProps: [
                        { name: 'has_work_unit', label: 'Ya', value: 1 },
                        { name: 'has_work_unit', label: 'Tidak', value: 0 },
                    ],
                    onChange: (args: any) => {
                        const index = this.FormProps.fields.findIndex(item => item.id == 'unit_id');

                        if (args.value == 1) {
                            this.FormProps.fields[index].hidden = false;
                            this.FormProps.class = 'grid-rows-8 grid-cols-1';
                        } else {
                            this.FormProps.fields[index].hidden = true;
                            this.FormProps.class = 'grid-rows-7 grid-cols-1';
                        }
                    },
                    hidden: true
                },
                {
                    id: 'unit_id',
                    label: 'Pilih Satuan Kerja',
                    required: true,
                    type: 'select',
                    value: '',
                    dropdownProps: {
                        options: [],
                        optionName: 'unit_name',
                        optionValue: 'unit_id'
                    },
                    hidden: true,
                },
                {
                    id: 'start_work_at',
                    label: 'Jam Mulai Kerja',
                    required: true,
                    type: 'time',
                    value: '',
                },
                {
                    id: 'end_work_at',
                    label: 'Jam Selesai Kerja',
                    required: true,
                    type: 'time',
                    value: '',
                },
                {
                    id: 'address',
                    label: 'Alamat',
                    required: true,
                    type: 'text',
                    value: '',
                },
            ],
            style: 'inline',
            class: 'grid-rows-9 grid-cols-1',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {
        this._store
            .select(AuthenticationState.authEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                const startWork = result.start_work_at ?
                    this._utilityService.onFormatDate(new Date(result.start_work_at as any), 'HH:mm') :
                    '08:00';

                const endWork = result.end_work_at ?
                    this._utilityService.onFormatDate(new Date(result.end_work_at as any), 'HH:mm') :
                    '17:00';

                this.DetailProfile = [
                    { label: 'Photo', value: result.photo },
                    { label: 'Nama Lengkap', value: `${result.first_name} ${result.last_name}` },
                    { label: 'NIP', value: result.nip ? result.nip : '-' },
                    { label: 'Email', value: result.email ? result.email : '-' },
                    { label: 'No. Telepon', value: result.phone_number ? result.phone_number : '-' },
                    { label: 'Jenis Kelamin', value: result.gender ? result.gender : '-' },
                    { label: 'Jabatan', value: result.role.role_name ? result.role.role_name : '-' },
                    { label: 'Jam Kerja', value: `${startWork} - ${endWork}` },
                    { label: 'Alamat', value: result.address ? result.address : '-' },
                ];

                this.ProfileObject = result;
            })
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleChangePageState(state: 'edit' | 'detail', data?: any) {
        this.PageState = state;

        if (state == 'edit' && data) {
            this.FormComps.FormGroup.patchValue(data);
        }
    }
}
