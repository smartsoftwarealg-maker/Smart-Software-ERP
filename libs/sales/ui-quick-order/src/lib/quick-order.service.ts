import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { QUICK_ORDER_URL, QuickOrder } from './quick-order.api';

@Injectable({
    providedIn: 'root',
})
export class QuickOrderService extends BaseEntityService<QuickOrder> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, QUICK_ORDER_URL);
    }

    // consumeContract(id: number): Observable<any> {
    //     return this.httpSrv.post(`/projects/${id}/get-articles`);
    // }
}
