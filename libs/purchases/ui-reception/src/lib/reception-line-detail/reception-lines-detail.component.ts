import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_RECEPTION, TransactionLine
} from '@ss/logistics/api-transaction';

import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { ReceptionLinesService } from '../reception-lines.service';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { Article } from '@ss/master-data/api-article';

@Component({
    selector: 'ss-reception-lines-detail',
    styleUrls: [
        '../../../../../common/assets/src/assets/transac-lines-detail.scss',
    ],
    templateUrl: './reception-lines-detail.component.html',
    standalone: true,
    imports: [
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        UiAutoCompleteComponent,
        TranslatePipe,
    ],
})
export class ReceptionLinesDetailComponent
    extends BaseTransactionLinesDetailComponent
    implements OnInit, OnDestroy
{
    constructor(public receptionLinesSrv: ReceptionLinesService) {
        super(receptionLinesSrv, DOC_RECEPTION);
    }

    readForm(): TransactionLine {
        const value = super.readForm();
        value.qtyInvoiced = value.qtySatisfied;
        return value;
    }

    setupForm(b: TransactionLine): UntypedFormGroup {
        const fg = super.setupForm(b);
        fg.controls['charge']?.setValue(
            Math.abs(fg.controls['charge']?.value || 0),
        );
        fg.controls['charge3']?.setValue(0);
        return fg;
    }

    override onArticle(a: Article) {
        super.onArticle(a);
        this.form.controls['charge3'].setValue(0);
    }
}
