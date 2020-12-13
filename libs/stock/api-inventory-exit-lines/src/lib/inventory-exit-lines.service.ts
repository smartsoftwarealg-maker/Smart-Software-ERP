import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {INVENTORY_EXIT_LINES_URL, InventoryExitLines} from "./inventory-exit-lines-api";
import {INVENTORY_EXIT_URL} from "@ss/stock/api-inventory-exit";


@Injectable({
    providedIn: 'root'
})
export class InventoryExitLinesService extends BaseEntityService<InventoryExitLines> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, INVENTORY_EXIT_LINES_URL,INVENTORY_EXIT_URL);
    }

}
