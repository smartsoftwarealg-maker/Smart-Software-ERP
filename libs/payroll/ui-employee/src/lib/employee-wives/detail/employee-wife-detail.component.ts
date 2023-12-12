import { Component, inject } from "@angular/core";
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Wife, EmployeeWivesService } from '@ss/payroll/api-employee';
import { Post, Department, Division, Service, Category } from '@ss/common/api-lookup';


@Component({
    selector: 'ss-emp-wife-detail',
    templateUrl: './employee-wife-detail.component.html',
    styleUrls: ['./employee-wife-detail.component.scss']
})
export class EmployeeWifeDetailComponent extends BaseChildEntityDetailComponent<Wife> {
    private formBuilder = inject(FormBuilder);

    // posts: Post[] = [];
    // departments: Department[] = [];
    // divisions: Division[] = [];
    // services: Service[] = [];
    // categories: Category[] = [];

    // parentId = 0;

    constructor(protected employeeWivesSrv: EmployeeWivesService) {
        super(employeeWivesSrv, 'Wife');
    }


    override setupForm(a: Wife): UntypedFormGroup {
        return this.form = this.formBuilder.group({
            id:         [a.id],
            parentId:   [a.parentId || this.employeeWivesSrv.getParentId()],
            birthdate:  [a.birthdate],
            birthPlace: [a.birthPlace],
            name:       [a.name, Validators.required],
            name_ar:    [a.name_ar],
            father:     [a.father],
            father_ar:  [a.father_ar],
            mother:     [a.mother],
            mother_ar:  [a.mother_ar]
        });
    }
}
