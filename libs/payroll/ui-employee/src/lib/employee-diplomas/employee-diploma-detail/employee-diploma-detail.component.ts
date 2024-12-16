import { Component, inject } from '@angular/core';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import {SubjectService} from '@ss/payroll/api-employee';
import {PersonDiploma} from '../employee-diploma-api';
import { FormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DiplomaService, EducationLevelService} from '@ss/common/api-lookup';
import {EmployeeDiplomaService} from '../employee-diploma.service';
import {SupplierService} from '@ss/logistics/api-agent';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { NgIf } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatInput } from '@angular/material/input';
import { MaterialModule } from '@ss/common/api-common';

@Component({
    selector: 'ss-employee-diploma-detail',
    templateUrl: './employee-diploma-detail.component.html',
    styleUrls: ['./employee-diploma-detail.component.scss'],
    standalone: true,
    imports: [NgIf, MaterialModule, MatMiniFabButton, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, UiAutoCompleteComponent, MatError, DatePickerComponent, MatInput]
})
export class EmployeeDiplomaDetailComponent extends BaseChildEntityDetailComponent<PersonDiploma> {
    private formBuilder = inject(FormBuilder);
    private diplomaSrv =  inject(DiplomaService);
    private subjectSrv =  inject(SubjectService);
    private supplierSrv =  inject(SupplierService);
    private educationLevelSrv =  inject(EducationLevelService);

    educationLevelAutoCompleteModel = new DefaultAutoCompleteModel(this.educationLevelSrv);
    diplomaAutoCompleteModel = new DefaultAutoCompleteModel(this.diplomaSrv);
    supplierAutoCompleteModel = new DefaultAutoCompleteModel(this.supplierSrv, 'id', 'denomination');
    subjectAutoCompleteModel = new DefaultAutoCompleteModel(this.subjectSrv);
    // entity: PersonDiploma = null;

    constructor(public employeeDiplomaSrv: EmployeeDiplomaService) {
        super(employeeDiplomaSrv, 'PersonDiploma');
    }


    override setupForm(a: PersonDiploma): UntypedFormGroup {
        // this.entity = a;
        return this.form = this.formBuilder.group({
            id: a.id,
            parentId: a.parentId || this.employeeDiplomaSrv.getParentId(),
            diploma: [a.diploma, Validators.required],
            subject: [a.subject],
            diploma_year: a.diploma_year,
            agent: a.agent,
            memo: a.memo,
            institution: a.institution,
            from_date: [a.from_date, Validators.required],
            to_date: a.to_date,
            education_level: a.education_level,
        });
    }
}
