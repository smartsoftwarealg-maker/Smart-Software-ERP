import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import { DETAIL_URL, DELIVERY_URL } from '@ss/sales/api-delivery-lines';
import { TransactionLinesClass } from '@ss/logistics/api-transaction';

@Injectable({
    providedIn: 'root'
})
export class DeliveryLinesService extends TransactionLinesClass {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv,  DETAIL_URL, DELIVERY_URL);
    }
}
