import { Component, inject } from '@angular/core';
import {
    EmploymentTypeService,
    LookupsService,
    SuspensionReasonService
} from '@ss/common/api-lookup';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { EmployeeActivationService, EmployeeActivation } from '@ss/payroll/api-employee';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { LoginService } from '@ss/common/api-common';
import { map } from 'rxjs/operators';

@Component({
    selector: 'ss-emp-active-detail',
    templateUrl: './employee-activation-detail.component.html',
    styleUrls: ['./employee-activation-detail.component.scss']
})
export class EmployeeActivationDetailComponent extends BaseChildEntityDetailComponent<EmployeeActivation> {
    private lookupSrv = inject(LookupsService);
    private loginSrv = inject(LoginService);
    private suspensionReasonSrv = inject(SuspensionReasonService);
    private empTypeSrv = inject(EmploymentTypeService);
    private fb = inject(FormBuilder);

    empId = 0;
    entity: EmployeeActivation;
    employmentTypes = this.empTypeSrv.getList(0, 500).pipe(map(res => res.body));
    suspensionReasons = this.suspensionReasonSrv.getList(0, 500).pipe(map(res => res.body));

    constructor(
        public entitySrv: EmployeeActivationService) {
        super(entitySrv);
    }

    override setupForm(a: EmployeeActivation): UntypedFormGroup {
        this.entity = a;
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
            inConflict:       [a.inConflict]
        });
    }
}
