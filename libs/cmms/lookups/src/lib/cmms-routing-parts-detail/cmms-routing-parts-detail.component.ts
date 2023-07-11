import { Component, inject } from '@angular/core';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { RoutingPart } from '../../../../cmms-api/cmms-api';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CMMSRoutingPartService } from '../services/cmms-routing-parts.service';
import { ArticleService } from '@ss/stock/api-article';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-cmms-routing-parts-detail',
    templateUrl: './cmms-routing-parts-detail.component.html',
    styleUrls: ['./cmms-routing-parts-detail.component.css'],
})
export class CMMSRoutingPartsDetailComponent extends BaseChildEntityDetailComponent<RoutingPart> {
    private articleSrv = inject(ArticleService);
    private fb = inject(FormBuilder);

    articleLookup = new DefaultAutoCompleteModel(this.articleSrv, 'id', 'description2');

    constructor(protected override entitySrv: CMMSRoutingPartService) {
        super(entitySrv);
    }

    setupForm(e: RoutingPart): UntypedFormGroup {
        return this.fb.group( {
            id:       [e.id],
            parentId: [e.parentId],
            partId:   [e.partId, Validators.required],
            qty:      [e.qty, Validators.required],
        });
    }
}
