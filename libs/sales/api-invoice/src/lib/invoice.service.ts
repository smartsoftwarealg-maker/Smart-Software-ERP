import { Injectable } from '@angular/core';
import {BaseEntityService} from "@ss/common/api-base-entity";
import {HttpService} from "@ss/common/api-common";
import {INVOICE_URL} from "./invoice-api";
import {Transaction} from "@ss/logistics/api-transaction";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BaseEntityService<Transaction> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, INVOICE_URL);
    }
}
