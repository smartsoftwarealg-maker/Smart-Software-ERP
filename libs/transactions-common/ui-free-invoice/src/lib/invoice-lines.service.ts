import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import { TransactionLinesClass } from '@ss/logistics/api-transaction';
import {FREE_INVOICE_URL, DETAIL_URL} from "./free-invoice-api";

@Injectable({
    providedIn: 'root'
})
export class FreeInvoiceLinesService extends TransactionLinesClass {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv,  DETAIL_URL, FREE_INVOICE_URL);
    }
}
