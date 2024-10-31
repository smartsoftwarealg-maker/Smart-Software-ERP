import { Component, inject } from '@angular/core';
import { UntypedFormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Child, EmployeeChildrenService } from '@ss/payroll/api-employee';

@Component({
    selector: 'ss-emp-child-detail',
    templateUrl: './employee-child-detail.component.html',
    styleUrls: ['./employee-child-detail.component.scss']
})
export class EmployeeChildDetailComponent extends BaseChildEntityDetailComponent<Child> {
    private formBuilder = inject(FormBuilder);

    // entity: Child = null;

    constructor(public employeeChildrenSrv: EmployeeChildrenService) {
        super(employeeChildrenSrv, 'Child');
    }

    override setupForm(a: Child): UntypedFormGroup {
        // this.entity = a;
        return this.form = this.formBuilder.group({
            id: a.id,
            parentId:   [a.parentId || this.employeeChildrenSrv.getParentId()],
            name:       [a.name, Validators.required],
            sex:        [a.sex||1],
            birthPlace: [a.birthPlace],
            birthDate: [a.birthDate]
        });
    }
}
