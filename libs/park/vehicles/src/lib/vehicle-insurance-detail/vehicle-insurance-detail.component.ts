import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { VehicleInsurance } from '../vehicle-api';
import { VehicleInsuranceService } from '../services/vehicle-insurance.service';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from "@angular/forms";
import { InsuranceAgencyService, InsurancePolicyService } from "@ss/common/api-lookup";
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { DatePickerComponent } from "@ss/common/ui-datepicker";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: 'ss-vehicle-insurance-detail',
    standalone: true,
    imports: [CommonModule, DatePickerComponent, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, UiAutoCompleteComponent],
    templateUrl: './vehicle-insurance-detail.component.html',
    styleUrls: ['./vehicle-insurance-detail.component.css']
})
export class VehicleInsuranceDetailComponent extends BaseChildEntityDetailComponent<VehicleInsurance> {
    private fb = inject(FormBuilder);
    private policySrv = inject(InsurancePolicyService);
    private agencySrv = inject(InsuranceAgencyService);

    policyLookup = new DefaultAutoCompleteModel(this.policySrv);
    agencyLookup = new DefaultAutoCompleteModel(this.agencySrv);

    constructor(protected override entitySrv: VehicleInsuranceService) {
        super(entitySrv, 'VehicleInsurance');
    }

    setupForm(e: VehicleInsurance): UntypedFormGroup {
        return this.fb.group( {
            id:          [e.id],
            parentId:    [e.parentId || this.entitySrv.getParentId()],
            date:        [e.date, Validators.required],
            nextDate:    [e.nextDate, Validators.required],
            agency:      [e.agency, Validators.required],
            policy:      [e.policy, Validators.required],
            amount:      [e.amount, Validators.required],
        });
    }
}
