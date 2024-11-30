import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Accident } from '../api-work-stoppage';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { WorkStoppageService } from '../services/work-stoppage.service';
import { LoginService, MaterialModule } from '@ss/common/api-common';


import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { PhysicianService } from '../services/physician.service';
import { PhysicianSpecialtyService } from '../services/physician-specialty.service';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { EmployeeService, PersonAutocompleteClass } from '@ss/employee-services/employee-services';
import { AbsenceMotiveService } from '@ss/attendance';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-work-stoppage-detail',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule
    ],
    templateUrl: './work-stoppage-detail.component.html',
    styleUrls: ['./work-stoppage-detail.component.css']
})
export class WorkStoppageDetailComponent extends BaseEntityDetailComponent<Accident> implements OnInit {
    private absenceMotiveSrv = inject(AbsenceMotiveService);
    private employeeSrv = inject(EmployeeService);
    private physicianSrv = inject(PhysicianService);
    private specialtySrv = inject(PhysicianSpecialtyService);
    private loginSrv = inject(LoginService);
    protected router  = inject(Router);

    employeeLookup = new PersonAutocompleteClass(this.employeeSrv);
    physicianLookup = new DefaultAutoCompleteModel(this.physicianSrv);
    specialtyLookup = new DefaultAutoCompleteModel(this.specialtySrv);
    motiveLookup = new DefaultAutoCompleteModel(this.absenceMotiveSrv);

    constructor(
        public override entitySrv: WorkStoppageService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_WORK_STOPPAGES');
    }

    public override setupForm(b: Accident): FormGroup {
        return this.formBuilder.group({
            id:                  [b.id || 0],
            centerId:            [b.centerId || this.loginSrv.appCtx.center],
            employee:            [b.employee, Validators.required],
            parentId:            [b.parentId || this.entitySrv.getParentId()],
            date:                [b.date, Validators.required],
            duration:            [b.duration, Validators.required],
            dateBack:            [b.dateBack, Validators.required],
            motive:              [b.motive],
            pickDate:            [b.pickDate],
            vacType:             [b.vacType],
            payMonth:            [b.payMonth],
            salary:              [b.salary],
            certificationNumber: [b.certificationNumber],
            certificationRef:    [b.certificationRef  ],
            physician:           [b.physician],
            specialty:           [b.specialty],
        });
    }

    override ngOnInit() {
        if (this.entitySrv.getParentId()) {
            super.ngOnInit();
        } else {
            this.router.navigate(['../'], { relativeTo: this.route }).then();
        }
    }
}
