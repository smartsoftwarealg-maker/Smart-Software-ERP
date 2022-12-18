import { Injectable } from '@angular/core';
import {BaseEntityService} from "@ss/common/api-base-entity";
import {HttpService} from "@ss/common/api-common";
import {Payment, PAYMENT_URL} from "@ss/logistics/api-common";

@Injectable({
  providedIn: 'root'
})
export class PaymentsListService extends BaseEntityService<Payment>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, PAYMENT_URL);
    }

    getURL() {
        return super.getUrl();
    }
}
