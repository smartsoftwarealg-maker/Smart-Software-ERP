import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Transaction, TransactionLinesClass} from '@ss/logistics/api-transaction';
import {BaseEntityService} from "@ss/common/api-base-entity";

@Injectable({
    providedIn: 'root'
})
export class PurchaseInvoiceService extends BaseEntityService<Transaction> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv,  '/purchase-invoices');
    }
}
