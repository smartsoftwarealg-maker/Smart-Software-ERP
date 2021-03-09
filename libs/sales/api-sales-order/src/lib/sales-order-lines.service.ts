import { Injectable } from '@angular/core';
import {BaseEntityExtendedService, BaseEntityService} from "@ss/common/api-base-entity";
import {Delivery, DELIVERY_URL} from "@ss/sales/api-delivery";
import {HttpService} from "@ss/common/api-common";
import {ORDER_URL} from "./sales-order-api";
import {DELIVERY_LINE_URL, DeliveryLine} from "@ss/sales/api-delivery-lines";

@Injectable({
  providedIn: 'root'
})
export class SalesOrderLinesService extends BaseEntityExtendedService<DeliveryLine> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv,  DELIVERY_LINE_URL, ORDER_URL);
    }
}
