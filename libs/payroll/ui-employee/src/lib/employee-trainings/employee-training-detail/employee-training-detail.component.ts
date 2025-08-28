import { Component, inject } from '@angular/core';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import {Training} from '../employee-training';
import { FormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DiplomaService} from '@ss/common/api-lookup';
import {JudicialFrameService, MotiveService} from '@ss/payroll/api-employee';
import {EmployeeTrainingService} from '../employee-training.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';

import { MatMiniFabButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MaterialModule } from '@ss/common/api-common';
import { ActivePersonnelService } from '../../active-personnel.service';

@Component({
    selector: 'ss-employee-training-dist',
    templateUrl: './employee-training-detail.component.html',
    styleUrls: ['./employee-training-detail.component.scss'],
    standalone: true,
    imports: [MaterialModule, MatMiniFabButton, MatCard, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, DatePickerComponent, MatError, UiAutoCompleteComponent]
})
export class EmployeeTrainingDetailComponent extends BaseChildEntityDetailComponent<Training> {
    private formBuilder = inject(FormBuilder);
    private motiveSrv =  inject(MotiveService);
    private diplomaSrv =  inject(DiplomaService);
    private judicialSrv = inject(JudicialFrameService);
    motiveAutoCompleteModel = new DefaultAutoCompleteModel(this.motiveSrv);
    diplomaAutoCompleteModel = new DefaultAutoCompleteModel(this.diplomaSrv);
    judicialFrameAutoCompleteModel = new DefaultAutoCompleteModel(this.judicialSrv);
    private activePersonnelSrv = inject(ActivePersonnelService);

    constructor(public trainingSrv: EmployeeTrainingService) {
        super(trainingSrv, 'Training');
    }

    override ngOnInit() {
        super.ngOnInit();
        this.isEditable = this.activePersonnelSrv.val;
    }

    override setupForm(a: Training): UntypedFormGroup {
        return this.form = this.formBuilder.group({
            id:               [a.id],
            parentId:         [a.parentId || this.trainingSrv.getParentId()],
            motive:           [a.motive, Validators.required],
            reference:        [a.reference],
            ref_date:         [a.ref_date||new Date()],
            from_date:        [a.from_date, Validators.required],
            to_date:          [a.to_date],
            day_count:        [a.day_count],
            training:         [a.training],
            trainer:          [a.trainer],
            location:         [a.location],
            diploma_id:       [a.diploma_id],
            mission_expenses: [a.mission_expenses || 0.0],
            trn_expenses:     [a.trn_expenses || 0.0],
            extra_expenses:   [a.extra_expenses],
            judicial_frame:   [a.judicial_frame],
            center:           [a.center || this.loginSrv.appCtx.center]
        });
    }
}
