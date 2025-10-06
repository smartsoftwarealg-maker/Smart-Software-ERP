import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatError } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { TranslatePipe, TranslateDirective } from '@ss/common/ui-lang';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CrmQuoteItemsService } from '../crm-quote-item.service';
import { CRMQuoteItem } from '../quotes-api';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { ArticleAutoCompleteModel, ArticleService } from '@ss/master-data/api-article';
import { LoginService } from '@ss/common/api-common';

@Component({
    selector: 'ss-crm-quote-line-detail',
    templateUrl: './crm-quotes-lines-detail.component.html',
    styleUrl: './crm-quotes-lines-detail.component.scss',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatError,
        MatButton,
        TranslatePipe,
        TranslateDirective,
        DatePickerComponent,
        UiAutoCompleteComponent
    ]
})
export class QuoteLinesDetailComponent
    extends BaseChildEntityDetailComponent<CRMQuoteItem> {
    private fb = inject(FormBuilder);
    private articleSrv = inject(ArticleService);

    constructor(protected detailSrv: CrmQuoteItemsService) {
        super(detailSrv, 'CRMQuoteLineDetail');
    }

    protected loginSrv = inject(LoginService);
    articleLookup: ArticleAutoCompleteModel = new ArticleAutoCompleteModel(this.articleSrv);

    override setupForm(q: CRMQuoteItem) {
        return this.fb.group({
            id: [q?.id || 0],
            parentId: [q?.parentId || this.detailSrv.getParentId()],
            reference: [q?.reference],
            quantity: [q?.quantity],
            listPrice: [q?.listPrice],
            unitPrice: [q?.unitPrice]
        });
    }
}
