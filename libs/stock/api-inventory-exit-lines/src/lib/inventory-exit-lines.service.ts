import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {INVENTORY_EXIT_LINES_URL} from './inventory-exit-lines-api';
import {INVENTORY_EXIT_URL} from '@ss/stock/api-inventory-exit';
import { TransactionLinesClass } from '@ss/logistics/api-transaction';


@Injectable({
    providedIn: 'root'
})
export class InventoryExitLinesService extends TransactionLinesClass {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, INVENTORY_EXIT_LINES_URL,INVENTORY_EXIT_URL);
    }

}
