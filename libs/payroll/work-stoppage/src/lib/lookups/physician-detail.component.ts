
import { Component } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';

import { MaterialModule } from '@ss/common/api-common';
import { PhysicianService } from '../services/physician.service';
import { BaseLookupDetailClass } from './detail-template/base-lookup-detail.class';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-physician-detail',
    templateUrl: './detail-template/cmms-fault-detail.component.html',
    styleUrls: ['./detail-template/cmms-fault-detail.component.css'],
    standalone: true,
    imports: [
    MaterialModule,
    ReactiveFormsModule,
    TranslateDirective,
    RouterOutlet
],
})
export class PhysicianDetailComponent extends BaseLookupDetailClass {
    constructor(
        public override entitySrv: PhysicianService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_PHYSICIANS');
    }
}
