import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {INVENTORY_ENTRY_LINES_URL, InventoryEntryLine} from "./inventory-entry-lines-api";
import {INVENTORY_ENTRY_URL} from "@ss/stock/api-inventory-entry";


@Injectable({
    providedIn: 'root'
})
export class InventoryEntryLinesService extends BaseEntityService<InventoryEntryLine> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, INVENTORY_ENTRY_LINES_URL,INVENTORY_ENTRY_URL);
    }

}
