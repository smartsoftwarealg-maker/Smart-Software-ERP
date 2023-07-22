import { Component, inject } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { AssetReading, AssetTrigger } from '@ss/cmms/cmms-api';
import { CMMSMeterService } from '@ss/cmms/lookups';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CMMSAssetTriggerService } from '../cmms-asset-trigger.service';
import { AssetsService } from '@ss/assets-component';

@Component({
    selector: 'ss-asset-trigger-detail',
    templateUrl: './asset-trigger-detail.component.html',
    styleUrls: ['./asset-trigger-detail.component.css'],
})
export class AssetTriggerDetailComponent extends BaseEntityDetailComponent<AssetTrigger> {
    private assetSrv = inject(AssetsService);
    private meterSrv = inject(CMMSMeterService);

    meterLookup = new DefaultAutoCompleteModel(this.meterSrv);
    assetLookup = new DefaultAutoCompleteModel(this.assetSrv);

    constructor(
        public override entitySrv: CMMSAssetTriggerService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'CMMS_READINGS');
    }

    setupForm(e: AssetReading): UntypedFormGroup {
        this.saveButton.visible = this.entitySrv.getParentId() > 0;
        return this.formBuilder.group({
            id:       [e.id],
            parentId: [{ value: e.parentId || this.entitySrv.getParentId(), disabled: true }],
            meterId:  [e.meterId, Validators.required],
            amount:   [e.amount, Validators.required]
        });
    }
}
