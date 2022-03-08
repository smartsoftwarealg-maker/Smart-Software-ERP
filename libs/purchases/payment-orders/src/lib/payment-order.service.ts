import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {PAYMENT_ORDER_URL, PaymentOrder} from './payment-order';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class PaymentOrderService extends BaseEntityService<PaymentOrder>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, PAYMENT_ORDER_URL);
    }
}
