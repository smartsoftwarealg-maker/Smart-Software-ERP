import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Training} from '../employee-training';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {HttpService, LoginService} from '@ss/common/api-common';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DiplomaService, LookupsService} from '@ss/common/api-lookup';
import {JudicialFrameService, MotiveService, SubjectService} from '@ss/payroll/api-employee';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {EmployeeTrainingService} from '../employee-training.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';

@Component({
  selector: 'ss-employee-training-dist',
  templateUrl: './employee-training-detail.component.html',
  styleUrls: ['./employee-training-detail.component.scss']
})
export class EmployeeTrainingDetailComponent extends BaseEntityDetailComponent<Training> implements OnInit {
    motiveAutoCompleteModel = new DefaultAutoCompleteModel(this.motiveSrv);
    diplomaAutoCompleteModel = new DefaultAutoCompleteModel(this.diplomaSrv);
    judicialFrameAutoCompleteModel = new DefaultAutoCompleteModel(this.judicialSrv);

    constructor(
        public trainingSrv: EmployeeTrainingService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: UntypedFormBuilder,
        public httpSrv: HttpService,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private motiveSrv: MotiveService,
        private subjectSrv: SubjectService,
        private diplomaSrv: DiplomaService,
        private loginSrv: LoginService,
        private judicialSrv: JudicialFrameService) {
        super(trainingSrv,
            shellSrv,
            snackBarSrv, route,
            formBuilder,
            confirmationSrv,
            'PAYROLL_PUNISHMENTS');
    }

    protected getRouteParam(): Observable<any> {
        return this.route.parent.parent.params
            .pipe(
                switchMap(p => {
                    const parentId = +p.id;
                    this.trainingSrv.setParentId(parentId);
                    return super.getRouteParam();
                })
            );
    }

    setupForm(a: Training): UntypedFormGroup {
        return this.form = this.formBuilder.group({
            id: a.id,
            employee: a.employee || this.trainingSrv.getParentId(),
            motive: [a.motive, Validators.required],
            reference: [a.reference],
            ref_date: [a.ref_date],
            from_date: [a.from_date, Validators.required],
            to_date: a.to_date,
            day_count: a.day_count,
            training: a.training,
            trainer: a.trainer,
            location: a.location,
            diploma_id: a.diploma_id,
            mission_expenses: a.mission_expenses || 0.0,
            trn_expenses: a.trn_expenses || 0.0,
            extra_expenses: a.extra_expenses,
            judicial_frame: a.judicial_frame,
            center: [this.loginSrv.appCtx.center]
        });
    }

}
