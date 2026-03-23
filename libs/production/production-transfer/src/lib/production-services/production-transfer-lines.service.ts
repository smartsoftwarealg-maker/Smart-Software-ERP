import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {TransactionLinesClass} from '@ss/logistics/api-transaction';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductionTransferLinesService extends TransactionLinesClass {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/detail', '/production/transfers');
    }

    transfer(id: number, qty?: number) {
        return this.httpSrv.post(`/production/mrp/transfer`, { transacId: id, qty: qty });
    }

    transferAll(id: number) {
        return this.httpSrv.post(`/production/mrp/transfer-all/${id}`);
    }

    cancelTransfer(id: number): Observable<{ count: number}> {
        return this.httpSrv.post(`/production/mrp/untransfer/${id}`);
    }

    cancelAllTransfers(id: number): Observable<{ count: number}> {
        return this.httpSrv.post(`/production/mrp/untransfer-all/${id}`);
    }
}
