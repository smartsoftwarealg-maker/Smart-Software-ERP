import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CProductLine } from '@ss/costing/costing-utils';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';


import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CProductLineService } from '../services/product-line.service';
import { ArticleService } from '@ss/master-data/api-article';
import { ProductLineKeysService } from '../services/product-line-keys.service';
import {
    ProductLineKeysComponent
} from '../product-line-keys/product-line-keys.component';
import { ProductLineCostsService } from '../services/product-line-costs.service';
import { CProductLineCostComponent } from '../product-line-costs/product-line-items.component';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-product-line-detail',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
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

    protected lineKeySrv = inject(ProductLineKeysService);
    protected lineCostSrv = inject(ProductLineCostsService);
    articleLookup = new DefaultAutoCompleteModel(this.articleSrv, 'id', 'description2');
    childEditMode = false;
    loaded = signal(false);

    constructor(protected override entitySrv: CProductLineService) {
        super(entitySrv, 'CProductLine');
    }

    override setupForm(e: CProductLine): UntypedFormGroup {
        this.lineKeySrv.setParentId(e?.id || 0);
        this.lineCostSrv.setParentId(e?.id || 0);
        this.loaded.set(true);
        return this.fb.group({
            id:             [e.id],
            parentId:       [e.parentId, Validators.required],
            productId:      [e.productId],
            directMaterial: [e.directMaterial || 0, Validators.required],
            directLabor:    [e.directLabor || 0, Validators.required],
            units:          [e.units || 0, Validators.min(1)],
        });
    }

    onChildEdit(event: boolean) {
        this.childEditMode = event;
    }

    override ngOnInit() {
        this.loaded.set(false);
        super.ngOnInit();
    }
}
