import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CProductLine } from '@ss/costing/costing-utils';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CostCenterService } from '@ss/logistics/api-cost-center';
import { CostingKeyService } from '@ss/costing/costing-keys';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CProductLineService } from '../services/product-line.service';
import { ArticleAutoCompleteModel, ArticleService } from "@ss/master-data/api-article";

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
    templateUrl: './product-line-detail.component.html',
    styleUrls: ['./product-line-detail.component.css']
})
export class ProductLineDetailComponent extends BaseChildEntityDetailComponent<CProductLine> {
    private articleSrv = inject(ArticleService);
    private fb = inject(FormBuilder);

    articleLookup = new DefaultAutoCompleteModel(this.articleSrv, 'id', 'description2');

    constructor(protected override entitySrv: CProductLineService) {
        super(entitySrv, 'CProductLine');
    }

    override setupForm(e: CProductLine): UntypedFormGroup {
        return this.fb.group({
            id:           [e.id],
            parentId:     [e.parentId, Validators.required],
            productId:    [e.productId],
            units:        [e.units || 0, Validators.min(1)],
        });
    }
}
