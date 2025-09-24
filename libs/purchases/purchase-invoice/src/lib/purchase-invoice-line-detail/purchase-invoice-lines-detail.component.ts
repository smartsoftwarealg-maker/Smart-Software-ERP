import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_RECEPTION, TransactionLine
} from '@ss/logistics/api-transaction';

import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { ReceptionLinesService } from '../../../../ui-reception/src/lib/reception-lines.service';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import {PurchaseInvoiceLineService} from "../purchase-invoice-line.service";

@Component({
    selector: 'ss-purchase-lines-detail',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    templateUrl: './purchase-invoice-lines-detail.component.html',
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    ReactiveFormsModule,
    UiAutoCompleteComponent
]
})
export class PurchaseInvoiceLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(public receptionLinesSrv: PurchaseInvoiceLineService) {
        super(receptionLinesSrv,  DOC_RECEPTION);
    }

    override setupForm(b: TransactionLine): UntypedFormGroup {
        const fg = super.setupForm(b);
        fg.controls['qtySatisfied'].disable({onlySelf: true});
        fg.controls['charge']?.setValue(Math.abs(fg.controls['charge']?.value||0));
        return fg;
    }
}
