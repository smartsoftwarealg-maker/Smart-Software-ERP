import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {ORDER_URL} from './sales-order-api';
import {DELIVERY_LINE_URL} from '@ss/sales/api-delivery-lines';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {TransactionLine} from '@ss/logistics/api-transaction';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderLinesService extends BaseEntityExtendedService<TransactionLine> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv,  DELIVERY_LINE_URL, ORDER_URL);
    }
}
