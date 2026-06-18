import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { CMMSRoutingPartService } from '@ss/cmms/lookups';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateDirective } from '@ss/common/ui-lang';
import {MaterialModule} from "@ss/common/api-common";
import {DefaultAutoCompleteModel, UiAutoCompleteComponent} from '@ss/common/ui-auto-complete';
import {RoutingPart} from "@ss/cmms/cmms-api";
import {BaseChildEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ArticleService} from '@ss/master-data/api-article';

@Component({
    selector: 'ss-cmms-routing-parts-detail',
    templateUrl: './cmms-routing-parts-detail.component.html',
    styleUrls: ['./cmms-routing-parts-detail.component.css'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
    MatSortModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialModule,
    ReactiveFormsModule,
    UiAutoCompleteComponent,
    TranslateDirective
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
