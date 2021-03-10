import { Injectable } from '@angular/core';
import {BaseEntityService} from "@ss/common/api-base-entity";
import {Delivery, DELIVERY_URL} from "@ss/sales/api-delivery";
import {HttpService} from "@ss/common/api-common";
import {ORDER_URL} from "./invoice-api";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BaseEntityService<Delivery> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, ORDER_URL);
    }
}
