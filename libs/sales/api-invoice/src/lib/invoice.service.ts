import { Injectable } from '@angular/core';
import {BaseEntityService} from "@ss/common/api-base-entity";
import {HttpService} from "@ss/common/api-common";
import {Invoice, INVOICE_URL} from "./invoice-api";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BaseEntityService<Invoice> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, INVOICE_URL);
    }
}
