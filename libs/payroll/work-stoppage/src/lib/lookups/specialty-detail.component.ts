import { Component } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';


import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { BaseLookupDetailClass } from './detail-template/base-lookup-detail.class';
import { PhysicianSpecialtyService } from '../services/physician-specialty.service';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-physician-specialty-detail',
    templateUrl: './detail-template/cmms-fault-detail.component.html',
    styleUrls: ['./detail-template/cmms-fault-detail.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,
        CommonUiAutoCompleteModule
    ],
})
export class SpecialtyDetailComponent extends BaseLookupDetailClass {
    constructor(
        public override entitySrv: PhysicianSpecialtyService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_PHYSICIAN_SPECIALTIES');
    }
}
