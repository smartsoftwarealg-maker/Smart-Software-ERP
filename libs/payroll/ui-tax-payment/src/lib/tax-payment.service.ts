import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { PERIODS_URL, TAX_PAYMENT_URL, TaxPayment } from './tax-payment.api';

@Injectable({
    providedIn: 'root',
})
export class TaxPaymentService extends BaseEntityService<TaxPayment> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, TAX_PAYMENT_URL, PERIODS_URL);
    }
}
