import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {DELIVERY_CANCELLATION_URL} from './delivery-cancellation-api';
import {Transaction} from '@ss/logistics/api-transaction';

@Injectable({
  providedIn: 'root'
})
export class DeliveryCancellationService extends BaseEntityService<Transaction> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DELIVERY_CANCELLATION_URL);
    }
}
