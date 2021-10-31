import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {INVENTORY_ENTRY_URL} from './inventory-entry-api';
import {Transaction} from '@ss/logistics/api-transaction';


@Injectable({
    providedIn: 'root'
})
export class InventoryEntryService extends BaseEntityService<Transaction> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, INVENTORY_ENTRY_URL);
    }

}
