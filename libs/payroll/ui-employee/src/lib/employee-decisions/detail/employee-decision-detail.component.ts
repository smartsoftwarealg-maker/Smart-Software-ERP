import { Component, inject } from '@angular/core';
import { UntypedFormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { LoginService } from '@ss/common/api-common';
import {EmployeeDecisionService, Decision, DecisionMotiveService} from '@ss/payroll/api-employee';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-emp-decision-detail',
    templateUrl: './employee-decision-detail.component.html',
    styleUrls: ['./employee-decision-detail.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardHeader, NgIf, MatMiniFabButton, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, DatePickerComponent, UiAutoCompleteComponent]
})
export class EmployeeDecisionDetailComponent extends BaseChildEntityDetailComponent<Decision> {
    private formBuilder = inject(FormBuilder);
    private motiveSrv = inject(DecisionMotiveService);
    decisionLookup = new DefaultAutoCompleteModel(this.motiveSrv);

    // entity: Decision;

    constructor(public employeeDecisionSrv: EmployeeDecisionService) {
        super(employeeDecisionSrv, 'Decision');
    }

    override setupForm(a: Decision): UntypedFormGroup {
        // this.entity = a;
        return this.form = this.formBuilder.group({
            id: a.id,
            parentId:           [a.parentId || this.entitySrv.getParentId()],
            centerId:           [a.centerId || this.loginSrv.appCtx.center],
            dec_reference:      [a.dec_reference, Validators.required],
            dec_date:           [a.dec_date, Validators.required],
            application_date:   [a.application_date, Validators.required],
            application_period: [a.application_period],
            dec_motive:         [a.dec_motive],
            dec_header:         [a.dec_header]
        });
    }
}
