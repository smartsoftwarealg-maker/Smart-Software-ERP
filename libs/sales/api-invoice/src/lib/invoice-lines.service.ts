import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import { DETAIL_URL, INVOICE_URL } from './invoice-api';
import { TransactionLinesClass } from '@ss/logistics/api-transaction';

@Injectable({
    providedIn: 'root'
})
export class InvoiceLinesService extends TransactionLinesClass {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv,  DETAIL_URL, INVOICE_URL);
    }
}
