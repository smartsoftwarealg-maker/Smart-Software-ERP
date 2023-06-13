import { Component } from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, BaseTransactionLinesDetailComponent2, DOC_TRANSFER_RECEPTION
} from "@ss/logistics/api-transaction";
import {TransactionLinesService} from '@ss/logistics/api-transaction';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ArticleService} from '@ss/stock/api-article';
import {LookupsService, LotsService} from '@ss/common/api-lookup';

@Component({
    selector: 'ss-transfer-reception-lines-detail',
    templateUrl: './transfer-reception-lines-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class TransferReceptionLinesDetailComponent  extends BaseTransactionLinesDetailComponent2 {
    constructor(public inventoryLinesService: TransactionLinesService) {
        super(inventoryLinesService, DOC_TRANSFER_RECEPTION);
    }
}
