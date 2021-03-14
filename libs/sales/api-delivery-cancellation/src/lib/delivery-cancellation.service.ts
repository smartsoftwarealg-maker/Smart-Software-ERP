import { Injectable } from '@angular/core';
import {BaseEntityService} from "@ss/common/api-base-entity";
import {HttpService} from "@ss/common/api-common";
import {CDelivery, DELIVERY_CANCELLATION_URL} from "./delivery-cancellation-api";

@Injectable({
  providedIn: 'root'
})
export class DeliveryCancellationService extends BaseEntityService<CDelivery> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, DELIVERY_CANCELLATION_URL);
    }
}
