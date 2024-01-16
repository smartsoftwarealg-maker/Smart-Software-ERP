import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CProductLine } from '@ss/costing/costing-utils';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CProductLineService } from '../services/product-line.service';
import { ArticleService } from '@ss/master-data/api-article';
import { ProductLineKeysService } from '../services/product-line-keys.service';
import {
    ProductLineKeysComponent
} from '../product-line-keys/product-line-keys.component';
import { ProductLineCostsService } from '../services/product-line-costs.service';
import { CProductLineCostComponent } from '../product-line-costs/product-line-items.component';

@Component({
    selector: 'ss-product-line-detail',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        CommonUiConfirmationDialogModule,
        CommonUiLangModule,
        MatAutocompleteModule,
        CommonUiAutoCompleteModule,
        ProductLineKeysComponent,
        CProductLineCostComponent
    ],
    templateUrl: './product-line-detail.component.html',
    styleUrls: ['./product-line-detail.component.css']
})
export class ProductLineDetailComponent extends BaseChildEntityDetailComponent<CProductLine> implements OnInit {
    private articleSrv = inject(ArticleService);
    private fb = inject(FormBuilder);

    protected keySrv = inject(ProductLineKeysService);
    protected itemSrv = inject(ProductLineCostsService);
    articleLookup = new DefaultAutoCompleteModel(this.articleSrv, 'id', 'description2');

    constructor(protected override entitySrv: CProductLineService) {
        super(entitySrv, 'CProductLine');
    }

    override setupForm(e: CProductLine): UntypedFormGroup {
        this.keySrv.setParentId(e?.id || 0);
        this.itemSrv.setParentId(e?.id || 0);
        return this.fb.group({
            id:             [e.id],
            parentId:       [e.parentId, Validators.required],
            productId:      [e.productId],
            directMaterial: [e.directMaterial || 0, Validators.required],
            directLabor:    [e.directLabor || 0, Validators.required],
            units:          [e.units || 0, Validators.min(1)],
        });
    }
}
