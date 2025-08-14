import { Component, inject } from '@angular/core';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { VacationPlanningDetail } from '../vacation-planning-api';
import {
    UntypedFormGroup,
    Validators,
    FormsModule,
    ReactiveFormsModule,
    FormBuilder,
} from '@angular/forms';
import { MaterialModule } from '@ss/common/api-common';
import { VacationPlanningDetailService } from '../vacation-planning-detail.service';
import { Lookup } from '@ss/logistics/ui-doc-import';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { LookupsService } from '@ss/common/api-lookup';

@Component({
    selector: 'ss-vacation-planning-detail-detail',
    templateUrl: './vacation-planning-detail-detail.component.html',
    styleUrls: ['./vacation-planning-detail-detail.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        MatCard,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatSelect,
        MatOption,
        MatInput,
        DatePickerComponent,
        MatError,
        TranslatePipe,
    ],
})
export class VacationPlanningDetailDetailComponent extends BaseChildEntityDetailComponent<VacationPlanningDetail> {
    vacationTypes: Array<Lookup> = [];
    private formBuilder = inject(FormBuilder);
    private planningSrv = inject(VacationPlanningDetailService);
    private lookupsSrv = inject(LookupsService);

    constructor(public override entitySrv: VacationPlanningDetailService) {
        super(entitySrv, 'REMUN_VACATION_PLANNING');
    }

    setupForm(e: VacationPlanningDetail): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id | 0],
            fromDate: [e.fromDate, Validators.required],
            toDate: [e.toDate, Validators.required],
            address: [e.address],
            reference: [e.reference],
            planning_id: [e.planning_id || this.planningSrv.getParentId()],
            vac_type: [e.vac_type, Validators.required],
        });
    }

    override ngOnInit() {
        this.lookupsSrv
            .getTable('/lookups/vacation_types', 'vacation-types')
            .subscribe({
                next: (res) => {
                    this.vacationTypes = res;
                },
            });
        super.ngOnInit();
    }
}
