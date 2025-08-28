import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent,
    DOC_QUOTATION
} from "@ss/logistics/api-transaction";

import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { SalesProformaLinesService } from '../sales-proforma-lines.service';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-proforma-lines-detail',
    templateUrl: './proforma-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    ReactiveFormsModule,
    RouterModule,
    UiAutoCompleteComponent
],
})
export class ProformaLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(
        public inventoryLinesService: SalesProformaLinesService) {
        super(inventoryLinesService, DOC_QUOTATION);
    }
}
