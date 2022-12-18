import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {CONSUMPTION_LINES_URL, CONSUMPTION_URL} from '@ss/stock/api-consumption';
import {TransactionLine} from '@ss/logistics/api-transaction';


@Injectable({
    providedIn: 'root'
})
export class ConsumptionLinesService extends BaseEntityExtendedService<TransactionLine> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CONSUMPTION_LINES_URL, CONSUMPTION_URL);
    }
}
