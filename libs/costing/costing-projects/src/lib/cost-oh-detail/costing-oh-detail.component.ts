import { Component, inject, OnInit } from '@angular/core';

import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { OH } from '@ss/costing/costing-utils';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProductLineKeysService } from '@ss/costing/costing-projects';
import { CostingOhService } from '@ss/costing/costing-projects';
import { CostingKeyService } from '@ss/costing/costing-keys';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-product-line-detail',
    standalone: true,
    imports: [
        RouterModule,
        MaterialModule,
        MatAutocompleteModule,
        UiAutoCompleteComponent,
        TranslateDirective,
    ],
    templateUrl: './costing-oh-detail.component.html',
    styleUrls: ['./costing-oh-detail.component.scss'],
})
export class CostingOhDetailComponent
    extends BaseChildEntityDetailComponent<OH>
    implements OnInit
{
    private keySrv = inject(CostingKeyService);
    private fb = inject(FormBuilder);

    protected lineSrv = inject(ProductLineKeysService);
    keyLookup = new DefaultAutoCompleteModel(this.keySrv);

    constructor(protected override entitySrv: CostingOhService) {
        super(entitySrv, 'COH');
    }

    override setupForm(e: OH): UntypedFormGroup {
        this.lineSrv.setParentId(e?.id || 0);
        return this.fb.group({
            id: [e.id],
            parentId: [e.parentId, Validators.required],
            keyId: [e.keyId],
            description: [e.description, Validators.required],
            amount: [e.amount || 0, Validators.min(1)],
        });
    }
}
