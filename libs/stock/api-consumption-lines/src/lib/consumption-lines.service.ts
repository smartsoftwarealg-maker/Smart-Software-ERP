import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {CONSUMPTION_LINES_URL, CONSUMPTION_URL} from '@ss/stock/api-consumption';
import { TransactionLinesClass } from '@ss/logistics/api-transaction';


@Injectable({
    providedIn: 'root'
})
export class ConsumptionLinesService extends TransactionLinesClass {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CONSUMPTION_LINES_URL, CONSUMPTION_URL);
    }
}
