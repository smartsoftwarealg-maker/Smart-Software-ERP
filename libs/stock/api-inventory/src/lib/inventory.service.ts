import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {INVENTORY_URL, Inventory} from "./inventory-api";


@Injectable({
    providedIn: 'root'
})
export class InventoryService extends BaseEntityService<Inventory> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, INVENTORY_URL);
    }

}
