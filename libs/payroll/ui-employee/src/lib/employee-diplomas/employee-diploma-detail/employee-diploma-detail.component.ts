import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {SubjectService} from '@ss/payroll/api-employee';
import {EmployeeDiploma} from '../employee-diploma-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {HttpService} from '@ss/common/api-common';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DiplomaService, EducationLevelService, LookupsService} from '@ss/common/api-lookup';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {EmployeeDiplomaService} from '../employee-diploma.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {SupplierService} from '@ss/logistics/api-agent';

@Component({
    selector: 'ss-employee-diploma-detail',
    templateUrl: './employee-diploma-detail.component.html',
    styleUrls: ['./employee-diploma-detail.component.scss']
})
export class EmployeeDiplomaDetailComponent extends BaseEntityDetailComponent<EmployeeDiploma> implements OnInit, OnDestroy  {
    private diplomaSrv =  inject(DiplomaService);
    private subjectSrv =  inject(SubjectService);
    private supplierSrv =  inject(SupplierService);
    private educationLevelSrv =  inject(EducationLevelService);

    educationLevelAutoCompleteModel = new DefaultAutoCompleteModel(this.educationLevelSrv);
    diplomaAutoCompleteModel = new DefaultAutoCompleteModel(this.diplomaSrv);
    supplierAutoCompleteModel = new DefaultAutoCompleteModel(this.supplierSrv, 'id', 'denomination');
    subjectAutoCompleteModel = new DefaultAutoCompleteModel(this.subjectSrv);
    entity: EmployeeDiploma = null;

    constructor(
        public employeeDiplomaSrv: EmployeeDiplomaService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public httpSrv: HttpService,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(employeeDiplomaSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_DIPLOMAS');
    }

    protected override getRouteParam(): Observable<any> {
        return this.route.parent.parent.params
            .pipe(
                switchMap(p => {
                    const parentId = +p['id'];
                    this.employeeDiplomaSrv.setParentId(parentId);
                    return super.getRouteParam();
                })
            );
    }

    override setupForm(a: EmployeeDiploma): UntypedFormGroup {
        this.entity = a;
        return this.form = this.formBuilder.group({
            id: a.id,
            employee: a.employee || this.employeeDiplomaSrv.getParentId(),
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
