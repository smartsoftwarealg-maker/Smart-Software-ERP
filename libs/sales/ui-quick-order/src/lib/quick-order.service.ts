import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { InvoiceInfo, QUICK_ORDER_URL, QuickOrder } from './quick-order.api';

@Injectable({
    providedIn: 'root',
})
export class QuickOrderService extends BaseEntityService<QuickOrder> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, QUICK_ORDER_URL);
    }

    quickOrders(id: string) {
        return this.httpSrv.get<InvoiceInfo[]>('/quick-order/info?id=' + id);
    }

    invoice(id: number) {
        return this.httpSrv.post(`/quick-order/${id}/invoice`);
    }
}
