import { Component } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CMMSPlan } from '@ss/cmms/cmms-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CMMSPlanService } from '../cmms-plan.service';
import { Lookup } from '@ss/common/api-lookup';

import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-cmms-plan-detail',
    templateUrl: './cmms-plan-detail.component.html',
    styleUrls: ['./cmms-plan-detail.component.css'],
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
    MatError,
    MatSelect,
    MatOption,
    TranslatePipe
],
})
export class CMMSPlanDetailComponent extends BaseEntityDetailComponent<CMMSPlan> {
    readonly TYPES: Lookup[] = [
        { id: 1, description: 'CMMS_TIME'},
        { id: 2, description: 'CMMS_READING'},
        { id: 3, description: 'CMMS_EITHER'}
    ];

    constructor(
        public override entitySrv: CMMSPlanService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'CMMS_PLANS');
    }

    setupForm(e: CMMSPlan): FormGroup {
        return this.formBuilder.group({
            id: [e.id],
            description:  [e.description,  Validators.required],
            repeatMonths: [e.repeatMonths, Validators.required],
            scheduleType: [e.scheduleType, Validators.required]
        });
    }
}
