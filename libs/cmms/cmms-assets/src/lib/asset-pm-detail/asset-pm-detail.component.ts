import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { PM } from '@ss/cmms/cmms-api';
import { AssetPmService } from '../asset-pm.service';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService, MaterialModule } from "@ss/common/api-common";
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
    CmmsChecklistService,
    CMMSFaultCauseService,
    CMMSFaultService,
    CMMSPriorityService,
    CMMSRoutingService
} from '@ss/cmms/lookups';
import { CMMSPlanService } from '@ss/cmms/plans';
import { AssetsService } from '@ss/assets-component';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'ss-asset-pm-detail',
    standalone: true,
    imports: [CommonModule, CommonUiAutoCompleteModule, CommonUiDatepickerModule, CommonUiLangModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MaterialModule],
    templateUrl: './asset-pm-detail.component.html',
    styleUrls: ['./asset-pm-detail.component.css'],
})
export class AssetPmDetailComponent extends BaseChildEntityDetailComponent<PM> {
    private faultSrv = inject(CMMSFaultService);
    private causeSrv = inject(CMMSFaultCauseService);
    private routingSrv = inject(CMMSRoutingService);
    private checklistSrv = inject(CmmsChecklistService);
    private planSrv = inject(CMMSPlanService);
    private assetSrv = inject(AssetsService);
    private prioritySrv = inject(CMMSPriorityService);
    private loginSrv = inject(LoginService);
    private fb = inject(FormBuilder);

    planLookup = new DefaultAutoCompleteModel(this.planSrv);
    assetLookup = new DefaultAutoCompleteModel(this.assetSrv);
    priorityLookup = new DefaultAutoCompleteModel(this.prioritySrv);
    routingLookup = new DefaultAutoCompleteModel(this.routingSrv);
    checklistLookup = new DefaultAutoCompleteModel(this.checklistSrv);
    faultLookup = new DefaultAutoCompleteModel(this.faultSrv);
    causeLookup = new DefaultAutoCompleteModel(this.causeSrv);
    isChecklist = false;

    constructor(protected override entitySrv: AssetPmService) {
        super(entitySrv);
        this.isChecklist = this.route.snapshot.data['inspection'] ?? false;
        this.entitySrv.inspection = this.isChecklist;
    }

    setupForm(b: PM): UntypedFormGroup {
        return this.fb.group({
            id:           [b.id],
            centerId:     [b.centerId || this.loginSrv.appCtx.center],
            parentId:     [{ value: b.parentId || this.entitySrv.getParentId, disabled: true }, Validators.required],
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
