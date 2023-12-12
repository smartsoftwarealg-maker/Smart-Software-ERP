import { Component, inject } from '@angular/core';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import {Training} from '../employee-training';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {DiplomaService} from '@ss/common/api-lookup';
import {JudicialFrameService, MotiveService} from '@ss/payroll/api-employee';
import {EmployeeTrainingService} from '../employee-training.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-employee-training-dist',
    templateUrl: './employee-training-detail.component.html',
    styleUrls: ['./employee-training-detail.component.scss']
})
export class EmployeeTrainingDetailComponent extends BaseChildEntityDetailComponent<Training> {
    private formBuilder = inject(FormBuilder);
    private motiveSrv =  inject(MotiveService);
    private diplomaSrv =  inject(DiplomaService);
    private judicialSrv = inject(JudicialFrameService);
    motiveAutoCompleteModel = new DefaultAutoCompleteModel(this.motiveSrv);
    diplomaAutoCompleteModel = new DefaultAutoCompleteModel(this.diplomaSrv);
    judicialFrameAutoCompleteModel = new DefaultAutoCompleteModel(this.judicialSrv);

    constructor(public trainingSrv: EmployeeTrainingService) {
        super(trainingSrv, 'Training');
    }


    override setupForm(a: Training): UntypedFormGroup {
        return this.form = this.formBuilder.group({
            id: a.id,
            parentId: [a.parentId || this.trainingSrv.getParentId()],
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
            center: [a.center || this.loginSrv.appCtx.center]
        });
    }
}
