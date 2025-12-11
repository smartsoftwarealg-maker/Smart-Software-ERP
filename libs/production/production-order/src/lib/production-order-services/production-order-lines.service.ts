import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {TransactionLinesClass} from '@ss/logistics/api-transaction';

@Injectable({
    providedIn: 'root'
})
export class ProductionOrderLinesService extends TransactionLinesClass {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv,  '/detail', '/production/production-orders');
    }

    reserve(id: number){
        return  this.httpSrv.post(`/production/mrp/reserve/${id}`)
    }

    release(id: number){
        return  this.httpSrv.post(`/production/mrp/release/${id}`)
    }

    transfer(id: number){
        return  this.httpSrv.post(`/production/mrp/transfer/${id}`)
    }

    cancelTransfer(id: number){
        return  this.httpSrv.post(`/production/mrp/untransfer/${id}`)
    }

}
