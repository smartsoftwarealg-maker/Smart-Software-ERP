import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {INVOICE_URL} from './invoice-api';
import {DELIVERY_LINE_URL} from '@ss/sales/api-delivery-lines';
import { TransactionLinesClass } from '@ss/logistics/api-transaction';

@Injectable({
    providedIn: 'root'
})
export class InvoiceLinesService extends TransactionLinesClass {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv,  DELIVERY_LINE_URL, INVOICE_URL);
    }
}
