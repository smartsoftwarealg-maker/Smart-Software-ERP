import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Transaction} from '@ss/logistics/api-transaction';

export const CONSUMPTION_URL = '/consumption';
export const CONSUMPTION_LINES_URL = '/detail';

@Injectable({
    providedIn: 'root'
})
export class ConsumptionService extends BaseEntityService<Transaction> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, CONSUMPTION_URL);
    }

}
