import { Injectable } from '@angular/core';
import {BaseEntityService} from "@ss/common/api-base-entity";
import {HttpService} from "@ss/common/api-common";
import {CInvoice, INVOICE_CANCELLATION_URL} from "./invoice-cancellation-api";

@Injectable({
  providedIn: 'root'
})
export class InvoiceCancellationService extends BaseEntityService<CInvoice> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, INVOICE_CANCELLATION_URL);
    }
}
