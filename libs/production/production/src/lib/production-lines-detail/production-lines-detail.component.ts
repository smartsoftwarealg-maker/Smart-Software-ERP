import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BaseTransactionLinesDetailComponent, DOC_PRODUCTION } from '@ss/logistics/api-transaction';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ProductionLinesService } from '../production-services/production-lines.service';
import { ArticleAutoCompleteModel } from '@ss/master-data/api-article';
import { ManufacturedArticleService } from '@ss/master-data/api-article';

@Component({
    selector: 'ss-production-lines-detail',
    styleUrl: 'production-lines-detail.component.scss',
    templateUrl: './production-lines-detail.component.html',
    standalone: true,
    imports: [
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
export class ProductionLinesDetailComponent
    extends BaseTransactionLinesDetailComponent
    implements OnInit, OnDestroy {
    #articleSrv = inject(ManufacturedArticleService);

    override articleLookup: ArticleAutoCompleteModel = new ArticleAutoCompleteModel(this.#articleSrv);

    constructor(protected detailSrv: ProductionLinesService) {
        super(detailSrv, DOC_PRODUCTION);
    }
}
