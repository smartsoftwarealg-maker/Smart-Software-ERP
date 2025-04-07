import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_PRODUCTION
} from '@ss/logistics/api-transaction';
import { NgIf } from '@angular/common';
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
import {
    ManufacturedArticleService
} from '../../../../../master-data/api-article/src/lib/manufactured-article.service';



@Component({
    selector: 'ss-production-lines-detail',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    templateUrl: './production-lines-detail.component.html',
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
export class ProductionLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy  {
    #articleSrv = inject(ManufacturedArticleService);

    override articleLookup: ArticleAutoCompleteModel = new ArticleAutoCompleteModel(this.#articleSrv);

    constructor(protected detailSrv: ProductionLinesService) {
        super(detailSrv, DOC_PRODUCTION);
    }



}
