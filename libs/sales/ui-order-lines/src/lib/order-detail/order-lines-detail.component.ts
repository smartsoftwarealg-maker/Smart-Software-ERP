import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_SALES_ORDER
} from '@ss/logistics/api-transaction';
import { SalesOrderLinesService } from '@ss/logistics/api-transaction';

import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-order-lines-detail',
    templateUrl: './order-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    standalone: true,
    imports: [MaterialModule, TranslateDirective, ReactiveFormsModule, UiAutoCompleteComponent],

})
export class OrderLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(public inventoryLinesService: SalesOrderLinesService) {
        super(inventoryLinesService, DOC_SALES_ORDER);
    }
}
