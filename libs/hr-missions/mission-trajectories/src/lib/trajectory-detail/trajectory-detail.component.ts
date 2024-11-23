import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Trajectory} from '../trajectory';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {TrajectoryService} from '../trajectory.service';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '../../../../../common/ui-lang/src/lib/translate.directive';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'ss-trajectory-detail',
    templateUrl: './trajectory-detail.component.html',
    styleUrls: ['./trajectory-detail.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardContent, NgIf, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError]
})
export class TrajectoryDetailComponent extends BaseEntityDetailComponent<Trajectory>{
    constructor(
        public detailSrv: TrajectoryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'MISSION_TRAJECTORIES');
    }


    setupForm(b: Trajectory): UntypedFormGroup {
        return this.formBuilder.group({
            id: [b.id],
            distance: [b.distance, Validators.required],
            description: [b.description, [Validators.required, Validators.maxLength(50)]],
        });
    }

}
