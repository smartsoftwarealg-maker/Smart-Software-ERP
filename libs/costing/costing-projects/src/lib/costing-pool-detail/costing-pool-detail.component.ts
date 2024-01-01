import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CPool } from '@ss/costing/costing-utils';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CostingPoolService } from '../services/costing-pool.service';
import { CostCenterService } from '@ss/logistics/api-cost-center';
import { CostingKeyService } from '@ss/costing/costing-keys';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
    selector: 'ss-costing-pool-detail',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        CommonUiConfirmationDialogModule,
        CommonUiLangModule,
        MatAutocompleteModule,
        CommonUiAutoCompleteModule
    ],
    templateUrl: './costing-pool-detail.component.html',
    styleUrl: './costing-pool-detail.component.css'
})
export class CostingPoolDetailComponent extends BaseChildEntityDetailComponent<CPool> {
    private costCenterSrv = inject(CostCenterService);
    private keySrv = inject(CostingKeyService);
    private fb = inject(FormBuilder);

    costServiceLookup = new DefaultAutoCompleteModel(this.costCenterSrv);
    keyLookup = new DefaultAutoCompleteModel(this.keySrv);

    constructor(protected override entitySrv: CostingPoolService) {
        super(entitySrv, 'CPool');
    }

    override setupForm(e: CPool): UntypedFormGroup {
        return this.fb.group({
            id:           [e.id],
            parentId:     [e.parentId, Validators.required],
            costCenterId: [e.costCenterId],
            keyId:        [e.keyId || 10, Validators.required],
            isSupport:    [e.isSupport || false, Validators.required],
        });
    }
}
