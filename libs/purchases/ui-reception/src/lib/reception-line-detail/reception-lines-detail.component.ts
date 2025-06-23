import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_RECEPTION, Transaction, TransactionLine
} from '@ss/logistics/api-transaction';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { ReceptionLinesService } from '../reception-lines.service';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-reception-lines-detail',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    templateUrl: './reception-lines-detail.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        UiAutoCompleteComponent,
        TranslatePipe
    ]
})
export class ReceptionLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(public receptionLinesSrv: ReceptionLinesService) {
        super(receptionLinesSrv,  DOC_RECEPTION);
    }

    readForm(): TransactionLine {
        const value =  super.readForm();
        value.qtyInvoiced = value.qtySatisfied;
        return value;
    }

    setupForm(b: TransactionLine): UntypedFormGroup {
        const fg = super.setupForm(b);
        fg.controls['charge']?.setValue(Math.abs(fg.controls['charge']?.value||0));
        return fg;
    }

}
