import { Component } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CMMSPlan } from '../../../../cmms-api/cmms-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CMMSPlanService } from '../cmms-plan.service';
import { Lookup } from '@ss/common/api-lookup';

@Component({
    selector: 'ss-cmms-plan-detail',
    templateUrl: './cmms-plan-detail.component.html',
    styleUrls: ['./cmms-plan-detail.component.css'],
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
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_EDIT_BANK');
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
