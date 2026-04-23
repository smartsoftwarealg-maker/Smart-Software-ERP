import { inject, Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {TransactionLinesClass} from '@ss/logistics/api-transaction';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductionOrderLinesService extends TransactionLinesClass {

    constructor() {
        super(inject(HttpService), '/detail', '/production/production-orders');
    }

    reserve(id: number){
        return  this.httpSrv.post(`/production/mrp/reserve/${id}`);
    }

    release(id: number){
        return  this.httpSrv.post(`/production/mrp/release/${id}`);
    }

    maxQty(id: number): Observable<{ qty: number }> {
        return this.httpSrv.get(`/production/mrp/max-qty?lineId=${id}`);
    }

}
