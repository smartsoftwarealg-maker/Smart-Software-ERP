import { Component, inject } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {AttendanceMachine} from '../attendance-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {AttendanceMachineService} from '../attendance-machine.service';
import { MatCard, MatCardContent } from '@angular/material/card';

import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { LoginService } from '@ss/common/api-common';

@Component({
    selector: 'ss-attendance-machine-detail',
    templateUrl: './attendance-machine-detail.component.html',
    styleUrls: ['./attendance-machine-detail.component.scss'],
    standalone: true,
    imports: [
    MatCard,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    TranslateDirective,
    MatInput,
    MatError
],
})
export class AttendanceMachineDetailComponent extends BaseEntityDetailComponent<AttendanceMachine> {
    #loginSrv = inject(LoginService);

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
            centerId:    [b.centerId||this.#loginSrv.appCtx.center],
            ipAddress:   [b.ipAddress, Validators.required],
            port:        [b.port, Validators.required],
            description: [b.description],
        });
    }

}
