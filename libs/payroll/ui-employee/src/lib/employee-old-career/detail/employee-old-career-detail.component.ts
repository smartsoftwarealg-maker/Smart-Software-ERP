import { Component, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { EmployeeOldCareerService, OldCareer } from '@ss/payroll/api-employee';

@Component({
    selector: 'ss-emp-old-career-detail',
    templateUrl: './employee-old-career-detail.component.html',
    styleUrls: ['./employee-old-career-detail.component.scss']
})
export class EmployeeOldCareerDetailComponent extends BaseChildEntityDetailComponent<OldCareer>  {
    private formBuilder = inject(UntypedFormBuilder);

    constructor(
        public employeeOldCareerSrv: EmployeeOldCareerService) {
        super(employeeOldCareerSrv, 'OldCareer');
    }


    override setupForm(a: OldCareer): UntypedFormGroup {
        return this.form = this.formBuilder.group({
            id:        [a.id],
            parentId:  [a.parentId],
            post:      [a.post, Validators.required],
            from_date: [a.from_date, Validators.required],
            to_date:   [a.to_date, Validators.required],
            rate:      [a.rate]
        });
    }
}
