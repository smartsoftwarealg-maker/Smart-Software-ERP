import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {INVENTORY_LINES_URL} from './inventory-lines-api';
import {INVENTORY_URL} from '@ss/stock/api-inventory';
import {TransactionLine} from '@ss/logistics/api-transaction';


@Injectable({
    providedIn: 'root'
})
export class InventoryLinesService extends BaseEntityService<TransactionLine> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, INVENTORY_LINES_URL, INVENTORY_URL);
    }

}
