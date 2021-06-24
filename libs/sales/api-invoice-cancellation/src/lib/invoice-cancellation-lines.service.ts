import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {INVOICE_CANCELLATION_URL} from './invoice-cancellation-api';
import {DELIVERY_LINE_URL, DeliveryLine} from '@ss/sales/api-delivery-lines';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';

@Injectable({
  providedIn: 'root'
})
export class InvoiceCancellationLinesService extends BaseEntityExtendedService<DeliveryLine> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv,  DELIVERY_LINE_URL, INVOICE_CANCELLATION_URL);
    }
}
