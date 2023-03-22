import { Component } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {AttendanceMachine} from '../attendance-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {AttendanceMachineService} from '../attendance-machine.service';

@Component({
    selector: 'ss-attendance-machine-detail',
    templateUrl: './attendance-machine-detail.component.html',
    styleUrls: ['./attendance-machine-detail.component.scss'],
})
export class AttendanceMachineDetailComponent extends BaseEntityDetailComponent<AttendanceMachine> {
    constructor(
        public override entitySrv: AttendanceMachineService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ATT_MACHINES');
    }


    public override setupForm(b: AttendanceMachine) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id:          [b.id],
            ipAddress:   [b.ipAddress, Validators.required],
            port:        [b.port, Validators.required],
            description: [b.description],
        });
    }

}
