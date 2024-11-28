import { Component, inject } from '@angular/core';
import { BaseChildEntityDetailComponent } from 'libs/common/ui-base-entity/src';
import { RoutingPart } from 'libs/cmms/cmms-api/src';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { CMMSRoutingPartService } from '@ss/cmms/lookups';
import { ArticleService } from 'libs/master-data/api-article/src';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from 'libs/common/ui-auto-complete/src';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'libs/common/api-common/src';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'ss-cmms-routing-parts-detail',
    templateUrl: './cmms-routing-parts-detail.component.html',
    styleUrls: ['./cmms-routing-parts-detail.component.css'],
    standalone: true,
    imports: [
        CommonModule,

        MatSortModule,
        MatTableModule,

        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterOutlet,
        CommonUiAutoCompleteModule
    ],
})
export class CMMSRoutingPartsDetailComponent extends BaseChildEntityDetailComponent<RoutingPart> {
    private articleSrv = inject(ArticleService);
    private fb = inject(FormBuilder);

    articleLookup = new DefaultAutoCompleteModel(this.articleSrv, 'id', 'description2');

    constructor(protected override entitySrv: CMMSRoutingPartService) {
        super(entitySrv, 'RoutingPart');
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
