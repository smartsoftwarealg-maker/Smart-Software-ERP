import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { InvoiceInfo, QuickOrder } from '@ss/sales/ui-quick-order';

@Injectable({
    providedIn: 'root',
})
export class ScheduledInvoiceService extends BaseEntityService<QuickOrder> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/scheduled-invoice');
    }

    getInvoiceInfo(id: string) {
        return this.httpSrv.get<InvoiceInfo[]>('/quick-order/info?id=' + id);
    }

    generateInvoice(id: number) {
        return this.httpSrv.post(`/quick-order/${id}/invoice`);
    }
}
