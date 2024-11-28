import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_INVENTORY
} from '@ss/logistics/api-transaction';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';


import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { InventoryLinesService } from "@ss/stock/api-inventory-lines";

@Component({
    selector: 'ss-inventory-lines-detail',
    templateUrl: './inventory-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,


        RouterModule,
        ReactiveFormsModule,


        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
    ],
})
export class InventoryLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(public inventoryLinesSrv: InventoryLinesService) {
        super(inventoryLinesSrv,  DOC_INVENTORY );
    }
}
