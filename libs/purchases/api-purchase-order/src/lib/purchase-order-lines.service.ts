import { Injectable } from '@angular/core';
import {BaseEntityExtendedService} from "@ss/common/api-base-entity";
import {HttpService} from "@ss/common/api-common";
import {PURCHASE_DETAIL, PURCHASE_ORDER_URL} from "./purchase-order-api";
import {TransactionLine} from "@ss/logistics/api-transaction";

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderLinesService extends BaseEntityExtendedService<TransactionLine> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv,  PURCHASE_DETAIL, PURCHASE_ORDER_URL);
    }
}
