import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import { Transaction } from '@ss/logistics/api-transaction';
import { CONSUMPTION_CANCELLATION_URL } from './consumption.service';
import { BaseEntityService } from '@ss/common/api-base-entity';
@Injectable({
    providedIn: 'root'
})
export class ConsumptionCancellationService extends BaseEntityService<Transaction> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CONSUMPTION_CANCELLATION_URL);
    }
}
