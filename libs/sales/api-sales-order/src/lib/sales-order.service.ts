import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from "@ss/common/api-common";
import {ORDER_URL} from "./sales-order-api";
import {Transaction} from "@ss/logistics/api-transaction";

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService extends BaseEntityService<Transaction> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, ORDER_URL);
    }
}
