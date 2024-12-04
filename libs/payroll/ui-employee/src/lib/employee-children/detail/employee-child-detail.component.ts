import { Component, inject } from '@angular/core';
import { UntypedFormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Child, EmployeeChildrenService } from '@ss/payroll/api-employee';
import { NgIf } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

@Component({
    selector: 'ss-emp-child-detail',
    templateUrl: './employee-child-detail.component.html',
    styleUrls: ['./employee-child-detail.component.scss'],
    standalone: true,
    imports: [NgIf, MatMiniFabButton, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatRadioGroup, MatRadioButton, DatePickerComponent]
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
