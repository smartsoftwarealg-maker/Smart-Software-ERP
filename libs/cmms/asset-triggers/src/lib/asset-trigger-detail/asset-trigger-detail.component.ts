import { Component, inject } from '@angular/core';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { AssetReading, AssetTrigger } from '@ss/cmms/cmms-api';
import { CMMSMeterService } from '@ss/cmms/lookups';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CMMSAssetTriggerService } from '../cmms-asset-trigger.service';
import { AssetsService } from '@ss/assets-component';
import { CommonModule } from '@angular/common';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-asset-trigger-detail',
    templateUrl: './asset-trigger-detail.component.html',
    styleUrls: ['./asset-trigger-detail.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MatSortModule,
        MatTableModule,
        TranslateDirective,
        MaterialModule,
        UiAutoCompleteComponent
    ],
})
export class AssetTriggerDetailComponent extends BaseChildEntityDetailComponent<AssetTrigger> {
    private assetSrv = inject(AssetsService);
    private meterSrv = inject(CMMSMeterService);
    private fb = inject(FormBuilder);

    meterLookup = new DefaultAutoCompleteModel(this.meterSrv);
    assetLookup = new DefaultAutoCompleteModel(this.assetSrv);

    constructor(public override entitySrv: CMMSAssetTriggerService) {
        super(entitySrv, 'AssetTrigger');
    }

    setupForm(e: AssetReading): UntypedFormGroup {
        // this.saveButton.visible = this.entitySrv.getParentId() > 0;
        return this.fb.group({
            id:       [e.id],
            parentId: [{ value: e.parentId || this.entitySrv.getParentId(), disabled: true }],
            meterId:  [e.meterId, Validators.required],
            amount:   [e.amount, Validators.required]
        });
    }
}
