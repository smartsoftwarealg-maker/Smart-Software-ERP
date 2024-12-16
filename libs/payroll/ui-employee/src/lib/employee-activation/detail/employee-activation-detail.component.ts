import { Component, inject } from '@angular/core';
import {
    EmploymentTypeService,
    SuspensionReasonService
} from '@ss/common/api-lookup';
import { FormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeActivationService, EmployeeActivation } from '@ss/payroll/api-employee';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { map } from 'rxjs/operators';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { MaterialModule } from '@ss/common/api-common';

@Component({
    selector: 'ss-emp-active-detail',
    templateUrl: './employee-activation-detail.component.html',
    styleUrls: ['./employee-activation-detail.component.scss'],
    standalone: true,
    imports: [MatMiniFabButton, MaterialModule, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, DatePickerComponent, MatSelect, MatOption, NgFor, MatCheckbox, AsyncPipe]
})
export class EmployeeActivationDetailComponent extends BaseChildEntityDetailComponent<EmployeeActivation> {
    private suspensionReasonSrv = inject(SuspensionReasonService);
    private empTypeSrv = inject(EmploymentTypeService);
    private fb = inject(FormBuilder);

    empId = 0;
    // entity: EmployeeActivation;
    employmentTypes = this.empTypeSrv.getList(0, 500).pipe(map(res => res.body));
    suspensionReasons = this.suspensionReasonSrv.getList(0, 500).pipe(map(res => res.body));

    constructor(
        public entitySrv: EmployeeActivationService) {
        super(entitySrv, 'Activation');
    }

    override setupForm(a: EmployeeActivation): UntypedFormGroup {
        // this.entity = a;
        return this.fb.group({
            id:               [a.id],
            centerId:         [a.centerId || this.loginSrv.appCtx.center],
            parentId:         [a.parentId || this.empId],
            activityStatus:   [a.activityStatus],
            hireDate:         [a.hireDate],
            suspended:        [a.suspended],
            suspensionDate:   [a.suspensionDate],
            suspensionReason: [a.suspensionReason],
            employmentType:   [a.employmentType],
            inConflict:       [a.inConflict],
            dasOut:           [a.dasOut],
            isFinal:          [a.isFinal]
        });
    }
}
