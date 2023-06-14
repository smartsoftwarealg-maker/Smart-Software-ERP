import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_QUOTATION
} from "@ss/logistics/api-transaction";
import {OfferLinesService} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-quotation-lines-detail',
    templateUrl: './quotation-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class QuotationLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {

    constructor(public  detailSrv: OfferLinesService) {
        super(detailSrv, DOC_QUOTATION);
    }
}
