import { Component, inject } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Wife, EmployeeWivesService } from '@ss/payroll/api-employee';
import { NgIf } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MaterialModule } from '@ss/common/api-common';


@Component({
    selector: 'ss-emp-wife-detail',
    templateUrl: './employee-wife-detail.component.html',
    styleUrls: ['./employee-wife-detail.component.scss'],
    standalone: true,
    imports: [NgIf, MaterialModule, MatMiniFabButton, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, DatePickerComponent]
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
