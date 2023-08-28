import { Component, inject } from '@angular/core';
import { UntypedFormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { LoginService } from '@ss/common/api-common';
import {EmployeeDecisionService, Decision, DecisionMotiveService} from '@ss/payroll/api-employee';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-emp-decision-detail',
    templateUrl: './employee-decision-detail.component.html',
    styleUrls: ['./employee-decision-detail.component.scss']
})
export class EmployeeDecisionDetailComponent extends BaseChildEntityDetailComponent<Decision> {
    private loginSrv = inject(LoginService);
    private formBuilder = inject(FormBuilder);
    private motiveSrv = inject(DecisionMotiveService);
    decisionLookup = new DefaultAutoCompleteModel(this.motiveSrv);

    entity: Decision;

    constructor(public employeeDecisionSrv: EmployeeDecisionService) {
        super(employeeDecisionSrv);
    }

    override setupForm(a: Decision): UntypedFormGroup {
        this.entity = a;
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
