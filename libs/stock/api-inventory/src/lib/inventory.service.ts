import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {INVENTORY_URL} from './inventory-api';
import {Transaction} from '@ss/logistics/api-transaction';


@Injectable({
    providedIn: 'root'
})
export class InventoryService extends BaseEntityService<Transaction> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, INVENTORY_URL);
    }

}
