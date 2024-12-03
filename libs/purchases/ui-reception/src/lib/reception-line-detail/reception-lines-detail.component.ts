import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_RECEPTION, TransactionLine
} from '@ss/logistics/api-transaction';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { TranslateDirective } from '@ss/common/ui-lang';
import { ReceptionLinesService } from '../reception-lines.service';

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
        DatePickerComponent,


    ],
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
}
