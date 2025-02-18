import { Injectable, signal } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { Compensation, COMPENSATIONS_URL, DEBTS_URL, InvoicePayment, PAYMENTS_URL } from './compensation-api';

@Injectable({
    providedIn: 'root'
})
export class CompensationDetailService extends BaseEntityService<Compensation> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DEBTS_URL);
    }
}
