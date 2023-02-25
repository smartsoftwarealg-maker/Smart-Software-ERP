import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {INVOICE_URL} from './invoice-api';
import {DELIVERY_LINE_URL} from '@ss/sales/api-delivery-lines';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {TransactionLine} from '@ss/logistics/api-transaction';

@Injectable({
  providedIn: 'root'
})
export class InvoiceLinesService extends BaseEntityExtendedService<TransactionLine> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv,  DELIVERY_LINE_URL, INVOICE_URL);
    }
}
