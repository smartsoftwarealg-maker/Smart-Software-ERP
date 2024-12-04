import { Component, inject } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { PM } from '@ss/cmms/cmms-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CMMSPMService } from '../services/cmms-p-m.service';
import { CMMSPlanService } from '@ss/cmms/plans';
import { AssetsService } from '@ss/assets-component';
import { CMMSFaultCauseService, CMMSFaultService, CMMSPriorityService } from '@ss/cmms/lookups';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { LoginService } from '@ss/common/api-common';
import { CMMSRoutingService } from '@ss/master-data/cmms-routing';
import { NgIf } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

@Component({
    selector: 'ss-pm-detail',
    templateUrl: './pm-detail.component.html',
    styleUrls: ['./pm-detail.component.css'],
    standalone: true,
    imports: [
        NgIf,
        MatCard,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        MatError,
        UiAutoCompleteComponent,
        DatePickerComponent,
    ],
})
export class PMDetailComponent extends BaseEntityDetailComponent<PM> {
    private faultSrv = inject(CMMSFaultService);
    private causeSrv = inject(CMMSFaultCauseService);
    private routingSrv = inject(CMMSRoutingService);
    private planSrv = inject(CMMSPlanService);
    private assetSrv = inject(AssetsService);
    private prioritySrv = inject(CMMSPriorityService);
    private loginSrv = inject(LoginService);

    planLookup = new DefaultAutoCompleteModel(this.planSrv);
    assetLookup = new DefaultAutoCompleteModel(this.assetSrv);
    priorityLookup = new DefaultAutoCompleteModel(this.prioritySrv);
    routingLookup = new DefaultAutoCompleteModel(this.routingSrv);
    faultLookup = new DefaultAutoCompleteModel(this.faultSrv);
    causeLookup = new DefaultAutoCompleteModel(this.causeSrv);

    constructor(
        public override entitySrv: CMMSPMService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'CMMS_PM');
    }


    public override setupForm(b: PM) {
        return this.formBuilder.group({
            id:           [b.id],
            centerId:     [b.centerId || this.loginSrv.appCtx.center],
            parentId:     [b.parentId, Validators.required],
            description:  [b.description, Validators.required],
            planId:       [b.planId, Validators.required],
            daysAhead:    [b.daysAhead, Validators.required],
            priority:     [b.priority, Validators.required],
            routingId:    [b.routingId, Validators.required],
            lastReleased: [b.lastReleased, Validators.required],
            nextDue:      [b.nextDue, Validators.required],
            fault:        [b.fault],
            cause:        [b.cause],
            orderNumber:  [{ value: b.orderNumber, disabled: true }],
        });
    }

}
