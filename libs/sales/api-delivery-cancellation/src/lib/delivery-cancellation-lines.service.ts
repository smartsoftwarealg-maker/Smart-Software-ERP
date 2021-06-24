import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {DELIVERY_CANCELLATION_URL} from './delivery-cancellation-api';
import {DELIVERY_LINE_URL, DeliveryLine} from '@ss/sales/api-delivery-lines';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';

@Injectable({
  providedIn: 'root'
})
export class DeliveryCancellationLinesService extends BaseEntityExtendedService<DeliveryLine> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv,  DELIVERY_LINE_URL, DELIVERY_CANCELLATION_URL);
    }
}
