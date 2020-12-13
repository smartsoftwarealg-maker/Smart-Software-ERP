import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {INVENTORY_EXIT_URL, InventoryExit} from "./inventory-exit-api";


@Injectable({
    providedIn: 'root'
})
export class InventoryExitService extends BaseEntityService<InventoryExit> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, INVENTORY_EXIT_URL);
    }

}
