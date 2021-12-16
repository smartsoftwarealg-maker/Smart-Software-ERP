import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityExtendedService, BaseEntityService} from '@ss/common/api-base-entity';
import {INVENTORY_ENTRY_LINES_URL} from './inventory-entry-lines-api';
import {INVENTORY_ENTRY_URL} from '@ss/stock/api-inventory-entry';
import {TransactionLine} from '@ss/logistics/api-transaction';


@Injectable({
    providedIn: 'root'
})
export class InventoryEntryLinesService extends BaseEntityExtendedService<TransactionLine> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, INVENTORY_ENTRY_LINES_URL,INVENTORY_ENTRY_URL);
    }

}
