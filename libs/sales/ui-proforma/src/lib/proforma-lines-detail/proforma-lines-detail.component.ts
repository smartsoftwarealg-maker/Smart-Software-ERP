import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent,
    DOC_QUOTATION
} from "@ss/logistics/api-transaction";
import {OfferLinesService} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-proforma-lines-detail',
    templateUrl: './proforma-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class ProformaLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(
        public inventoryLinesService: OfferLinesService) {
        super(inventoryLinesService, DOC_QUOTATION);
    }
}
