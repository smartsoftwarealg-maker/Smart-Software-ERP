import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {TransactionLinesClass} from './transaction-lines.class';
import { InvoiceInfo } from '../../../../sales/ui-quick-order/src/lib/quick-order.api';

@Injectable({
    providedIn: 'root',
})
export class SalesOrderLinesService extends TransactionLinesClass {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/detail', '/sales-order');
    }
    getInvoiceInfo(id: string) {
        return this.httpSrv.get<InvoiceInfo[]>('/quick-order/info?id=' + id);
    }
}
