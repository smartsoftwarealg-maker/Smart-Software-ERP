import { Component, inject } from '@angular/core';

import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { WorkArticle } from '@ss/cmms/cmms-api';
import { CMMSWorkOrderArticleService } from '../services/c-m-m-s-work-order-article.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { ArticleService } from '@ss/master-data/api-article';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

import { MatTableModule } from '@angular/material/table';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-work-order-article-detail',
    standalone: true,
    imports: [
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    TranslateDirective,
    MatButtonModule,
    MaterialModule,
    UiAutoCompleteComponent
],
    templateUrl: './work-order-article-detail.component.html',
    styleUrls: ['./work-order-article-detail.component.css'],
})
export class WorkOrderArticleDetailComponent extends BaseChildEntityDetailComponent<WorkArticle> {
    private articleSrv = inject(ArticleService);
    private fb = inject(FormBuilder);

    articleLookup = new DefaultAutoCompleteModel(this.articleSrv, 'id', 'description2');

    constructor(protected override entitySrv: CMMSWorkOrderArticleService) {
        super(entitySrv, 'WorkArticle');
    }

    setupForm(e: WorkArticle): UntypedFormGroup {
        return this.fb.group({
            id:        [e.id],
            parentId:  [e.parentId || this.entitySrv.getParentId()],
            articleId: [e.articleId],
            qty:       [e.qty|0,   Validators.required],
            price:     [e.price|0, Validators.required]
        });
    }
}
