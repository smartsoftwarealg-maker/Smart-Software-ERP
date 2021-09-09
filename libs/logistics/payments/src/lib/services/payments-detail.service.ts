import { Injectable } from '@angular/core';
import {BaseEntityExtendedService, BaseEntityService} from "@ss/common/api-base-entity";
import {Payment, PAYMENT_URL} from "./payment.class";
import {HttpService} from "@ss/common/api-common";
import {BaseEntityDetailComponent} from "@ss/common/ui-base-entity";

@Injectable({
  providedIn: 'root'
})
export class PaymentsDetailService extends BaseEntityExtendedService<Payment>{

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, PAYMENT_URL);
    }
}
