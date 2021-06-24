import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {INVOICE_URL} from './invoice-api';
import {DELIVERY_LINE_URL, DeliveryLine} from '@ss/sales/api-delivery-lines';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';

@Injectable({
  providedIn: 'root'
})
export class InvoiceLinesService extends BaseEntityExtendedService<DeliveryLine> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv,  DELIVERY_LINE_URL, INVOICE_URL);
    }
}
