import { Component, inject } from '@angular/core';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import {SubjectService} from '@ss/payroll/api-employee';
import {EmployeeDiploma} from '../employee-diploma-api';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {DiplomaService, EducationLevelService} from '@ss/common/api-lookup';
import {EmployeeDiplomaService} from '../employee-diploma.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {SupplierService} from '@ss/logistics/api-agent';

@Component({
    selector: 'ss-employee-diploma-detail',
    templateUrl: './employee-diploma-detail.component.html',
    styleUrls: ['./employee-diploma-detail.component.scss']
})
export class EmployeeDiplomaDetailComponent extends BaseChildEntityDetailComponent<EmployeeDiploma> {
    private formBuilder = inject(FormBuilder);
    private diplomaSrv =  inject(DiplomaService);
    private subjectSrv =  inject(SubjectService);
    private supplierSrv =  inject(SupplierService);
    private educationLevelSrv =  inject(EducationLevelService);

    educationLevelAutoCompleteModel = new DefaultAutoCompleteModel(this.educationLevelSrv);
    diplomaAutoCompleteModel = new DefaultAutoCompleteModel(this.diplomaSrv);
    supplierAutoCompleteModel = new DefaultAutoCompleteModel(this.supplierSrv, 'id', 'denomination');
    subjectAutoCompleteModel = new DefaultAutoCompleteModel(this.subjectSrv);
    entity: EmployeeDiploma = null;

    constructor(public employeeDiplomaSrv: EmployeeDiplomaService) {
        super(employeeDiplomaSrv);
    }


    override setupForm(a: EmployeeDiploma): UntypedFormGroup {
        this.entity = a;
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
