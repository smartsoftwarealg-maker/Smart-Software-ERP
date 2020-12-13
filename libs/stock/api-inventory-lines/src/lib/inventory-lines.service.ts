import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {INVENTORY_LINES_URL, InventoryLines} from "./inventory-lines-api";
import {INVENTORY_URL} from "@ss/stock/api-inventory";


@Injectable({
    providedIn: 'root'
})
export class InventoryLinesService extends BaseEntityService<InventoryLines> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, INVENTORY_LINES_URL,INVENTORY_URL);
    }

}
