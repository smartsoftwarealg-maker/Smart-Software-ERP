import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from "@ss/common/api-common";
import {INVOICE_CANCELLATION_URL} from "./invoice-cancellation-api";
import {Transaction} from "@ss/logistics/api-transaction";

@Injectable({
  providedIn: 'root'
})
export class InvoiceCancellationService extends BaseEntityService<Transaction> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, INVOICE_CANCELLATION_URL);
    }
}
