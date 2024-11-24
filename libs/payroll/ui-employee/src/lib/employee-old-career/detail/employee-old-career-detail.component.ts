import { Component, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { EmployeeOldCareerService, OldCareer } from '@ss/payroll/api-employee';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '../../../../../../common/ui-lang/src/lib/translate.directive';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '../../../../../../common/ui-datepicker/src/lib/date-picker.component';

@Component({
    selector: 'ss-emp-old-career-detail',
    templateUrl: './employee-old-career-detail.component.html',
    styleUrls: ['./employee-old-career-detail.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardTitle, NgIf, MatMiniFabButton, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, DatePickerComponent]
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
