import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BaseTransactionLinesDetailComponent, DOC_PRODUCTION, TransactionLine } from '@ss/logistics/api-transaction';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ProductionLinesService } from '../production-services/production-lines.service';
import { Article, ArticleAutoCompleteModel } from '@ss/master-data/api-article';
import { ManufacturedArticleService } from '@ss/master-data/api-article';
import { MatTooltip } from '@angular/material/tooltip';
import { BomLookupClass, BomService } from '@ss/master-data/ui-article';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

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
        TranslatePipe,
        MatTooltip,
        MatOption,
        MatSelect,
    ],
})
export class ProductionLinesDetailComponent
    extends BaseTransactionLinesDetailComponent
    implements OnInit, OnDestroy
{
    #articleSrv = inject(ManufacturedArticleService);
    #bomSrv = inject(BomService);

    override articleLookup: ArticleAutoCompleteModel =
        new ArticleAutoCompleteModel(this.#articleSrv);
    bomLookup: BomLookupClass = new BomLookupClass(this.#bomSrv);

    constructor(protected detailSrv: ProductionLinesService) {
        super(detailSrv, DOC_PRODUCTION);
        this.articleLookup.onObjectSelected = (a) => this.onArticleLookup(a);
    }

    override setupForm(b: TransactionLine): UntypedFormGroup {
        this.bomLookup.reference = b?.reference;
        return super.setupForm(b);
    }

    override onArticle(a: Article) {
        super.onArticle(a);
        this.bomLookup.reference = a?.reference;
    }
}
