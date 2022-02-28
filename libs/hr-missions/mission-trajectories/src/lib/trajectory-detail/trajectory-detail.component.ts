import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Trajectory} from '../trajectory';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {TrajectoryService} from '../trajectory.service';

@Component({
  selector: 'ss-trajectory-detail',
  templateUrl: './trajectory-detail.component.html',
  styleUrls: ['./trajectory-detail.component.scss']
})
export class TrajectoryDetailComponent extends BaseEntityDetailComponent<Trajectory>{
    constructor(
        public detailSrv: TrajectoryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'MISSION_TRAJECTORIES');
    }


    setupForm(b: Trajectory): FormGroup {
        return this.formBuilder.group({
            id: [b.id],
            distance: [b.distance, Validators.required],
            description: [b.description, [Validators.required, Validators.maxLength(50)]],
        });
    }

}
