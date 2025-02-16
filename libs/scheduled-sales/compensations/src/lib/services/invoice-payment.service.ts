import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { DEBTS_URL, InvoicePayment, PAYMENTS_URL } from './compensation-api';

@Injectable({
    providedIn: 'root'
})
export class InvoicePaymentService extends BaseEntityService<InvoicePayment>{
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, PAYMENTS_URL, DEBTS_URL);
    }
}
