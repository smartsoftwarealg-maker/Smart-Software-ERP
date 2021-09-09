import { Injectable } from '@angular/core';
import {BaseEntityService} from "@ss/common/api-base-entity";
import {Payment, PAYMENT_URL} from "./payment.class";
import {HttpService} from "@ss/common/api-common";

@Injectable({
  providedIn: 'root'
})
export class PaymentsListService extends BaseEntityService<Payment>{

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, PAYMENT_URL);
    }
}
