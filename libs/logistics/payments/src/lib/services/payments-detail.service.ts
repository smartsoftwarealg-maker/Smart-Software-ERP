import { Injectable } from '@angular/core';
import {BaseEntityExtendedService, BaseEntityService} from "@ss/common/api-base-entity";
import {HttpService} from "@ss/common/api-common";
import {Payment, PAYMENT_URL} from "@ss/logistics/api-common";

@Injectable({
  providedIn: 'root'
})
export class PaymentsDetailService extends BaseEntityExtendedService<Payment>{

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, PAYMENT_URL);
    }
}
