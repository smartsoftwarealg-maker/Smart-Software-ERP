import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Transaction } from '@ss/logistics/api-transaction';
import { Observable } from 'rxjs';
import { FREE_INVOICE_URL } from './free-invoice-api';

@Injectable({
    providedIn: 'root',
})
export class FreeInvoiceService extends BaseEntityService<Transaction> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, FREE_INVOICE_URL);
    }

    consumeContract(id: number): Observable<any> {
        return this.httpSrv.post(`/projects/${id}/get-articles`);
    }
}
