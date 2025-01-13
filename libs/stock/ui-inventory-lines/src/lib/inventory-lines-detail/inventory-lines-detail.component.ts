import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_INVENTORY
} from '@ss/logistics/api-transaction';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { InventoryLinesService } from "@ss/stock/api-inventory-lines";
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-inventory-lines-detail',
    templateUrl: './inventory-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        RouterModule,
        ReactiveFormsModule,
        UiAutoCompleteComponent


    ]
})
export class InventoryLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(public inventoryLinesSrv: InventoryLinesService) {
        super(inventoryLinesSrv,  DOC_INVENTORY );
    }
}
