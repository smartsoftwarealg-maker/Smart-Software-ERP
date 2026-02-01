import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
    BaseTransactionLinesDetailComponent,
    DOC_PRODUCTION_ORDER,
    Transaction,
    TransactionLine,
} from '@ss/logistics/api-transaction';
import { ProductionFormulasLinesService } from '../production-formulas-services/production-formulas-lines.service';

import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { PRODUCTION_FORMULA } from '@ss/workflow';

@Component({
    selector: 'ss-production-formula-lines-detail',
    styleUrls: [
        '../../../../../common/assets/src/assets/transac-lines-detail.scss',
    ],
    templateUrl: './production-formulas-lines-detail.component.html',
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
export class ProductionFormulasLinesDetailComponent
    extends BaseTransactionLinesDetailComponent
    implements OnInit, OnDestroy {
    constructor(protected detailSrv: ProductionFormulasLinesService) {
        super(detailSrv, DOC_PRODUCTION_ORDER);
        this.articleLookup.onObjectSelected = (a) => this.onArticleLookup(a);
    }

    override setupForm(b: TransactionLine): UntypedFormGroup {
        b.document = PRODUCTION_FORMULA;
        return super.setupForm(b);
    }
}

