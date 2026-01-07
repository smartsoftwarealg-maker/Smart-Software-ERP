import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_PRODUCTION_ORDER, TransactionLine
} from '@ss/logistics/api-transaction';
import { ProductionOrderLinesService } from '../production-order-services/production-order-lines.service';

import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
    Article,
    BOM,
    ManufacturedArticleService,
} from '@ss/master-data/api-article';
import { ArticleAutoCompleteModel } from '@ss/master-data/api-article';
import { BomLookupClass, BomService } from '@ss/master-data/ui-article';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { PRODUCTION_ORDER } from '@ss/workflow';

@Component({
    selector: 'ss-production-order-lines-detail',
    styleUrls: [
        '../../../../../common/assets/src/assets/transac-lines-detail.scss',
    ],
    templateUrl: './production-order-lines-detail.component.html',
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
        MatOption,
        MatSelect,
    ],
})
export class ProductionOrderLinesDetailComponent
    extends BaseTransactionLinesDetailComponent
    implements OnInit, OnDestroy {
    #articleSrv = inject(ManufacturedArticleService);
    #bomSrv = inject(BomService);

    override articleLookup: ArticleAutoCompleteModel =
        new ArticleAutoCompleteModel(this.#articleSrv);
    bomLookup: BomLookupClass = new BomLookupClass(this.#bomSrv);

    constructor(protected detailSrv: ProductionOrderLinesService) {
        super(detailSrv, DOC_PRODUCTION_ORDER);
        this.articleLookup.onObjectSelected = (a) => this.onArticleLookup(a);
        this.bomLookup.onObjectSelected = b => this.onBomLookup(b);
    }

    override setupForm(b: TransactionLine): UntypedFormGroup {
        this.bomLookup.reference = b?.reference;
        b.document = PRODUCTION_ORDER;
        return super.setupForm(b);
    }

    override onArticle(a: Article) {
        super.onArticle(a);
        this.bomLookup.reference = a?.reference;
    }


    onBomLookup(b: BOM) {
        this.form.get('units')?.setValue(b.units);
    }
}
