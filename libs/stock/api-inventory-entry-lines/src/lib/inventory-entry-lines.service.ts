import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {INVENTORY_ENTRY_LINES_URL} from './inventory-entry-lines-api';
import {INVENTORY_ENTRY_URL} from '@ss/stock/api-inventory-entry';
import { TransactionLinesClass } from '@ss/logistics/api-transaction';


@Injectable({
    providedIn: 'root'
})
export class InventoryEntryLinesService extends TransactionLinesClass {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, INVENTORY_ENTRY_LINES_URL,INVENTORY_ENTRY_URL);
    }

}
