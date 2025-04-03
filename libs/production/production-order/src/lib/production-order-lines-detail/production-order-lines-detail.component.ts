import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_PRODUCTION_ORDER
} from '@ss/logistics/api-transaction';
import { ProductionOrderLinesService } from '../production-order-services/production-order-lines.service';
import { NgIf } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
    ManufacturedArticleService
} from '../../../../../master-data/api-article/src/lib/manufactured-article.service';
import { ArticleAutoCompleteModel } from '@ss/master-data/api-article';

@Component({
    selector: 'ss-production-order-lines-detail',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    templateUrl: './production-order-lines-detail.component.html',
    standalone: true,
    imports: [
        NgIf,
        MatMiniFabButton,
        MatCard,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        UiAutoCompleteComponent,
        MatError,
        CdkTextareaAutosize,
    ],
})
export class ProductionOrderLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy  {
    #articleSrv = inject(ManufacturedArticleService);

    override articleLookup: ArticleAutoCompleteModel = new ArticleAutoCompleteModel(this.#articleSrv);

    constructor(protected detailSrv: ProductionOrderLinesService) {
        super(detailSrv, DOC_PRODUCTION_ORDER);
    }
}
