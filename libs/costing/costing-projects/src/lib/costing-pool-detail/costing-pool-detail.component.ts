import { Component, inject, signal } from '@angular/core';
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


import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CostingPoolKeysService } from '../services/costing-pool-keys.service';
import { CostingPoolKeysComponent } from '../costing-pool-keys/costing-pool-keys.component';
import { CProductLineCostComponent } from '../product-line-costs/product-line-items.component';
import { ProductLineKeysComponent } from '../product-line-keys/product-line-keys.component';
import { CostingPoolCostComponent } from '../costing-pools-costs/costing-pool-costs.component';
import { CostingPoolsCostsService } from '../services/costing-pools-costs.service';

@Component({
    selector: 'ss-costing-pool-detail',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,


        MatAutocompleteModule,
        CommonUiAutoCompleteModule,
        CostingPoolKeysComponent,
        CProductLineCostComponent,
        ProductLineKeysComponent,
        CostingPoolCostComponent
    ],
    templateUrl: './costing-pool-detail.component.html',
    styleUrl: './costing-pool-detail.component.css'
})
export class CostingPoolDetailComponent extends BaseChildEntityDetailComponent<CPool> {
    private keySrv = inject(CostingKeyService);
    private detailSrv = inject(CostingPoolKeysService);
    private costCenterSrv = inject(CostCenterService);
    private fb = inject(FormBuilder);

    childEditMode = false;
    costSrv = inject(CostingPoolsCostsService);
    costServiceLookup = new DefaultAutoCompleteModel(this.costCenterSrv);
    keyLookup = new DefaultAutoCompleteModel(this.keySrv);
    loaded = signal<boolean>(false);

    constructor(protected override entitySrv: CostingPoolService) {
        super(entitySrv, 'CPool');
    }

    override setupForm(e: CPool): UntypedFormGroup {
        const id = e.id || 0;
        this.detailSrv.setParentId(id);
        this.costSrv.setParentId(id);
        this.keySrv.setParentId(id);
        this.loaded.set(id > 0);
        return this.fb.group({
            id:           [e.id],
            parentId:     [e.parentId, Validators.required],
            costCenterId: [e.costCenterId],
            keyId:        [e.keyId, Validators.required],
            isSupport:    [e.isSupport || false, Validators.required],
        });
    }

    onChildEdit(event: boolean) {
        this.childEditMode = event;
    }
}
