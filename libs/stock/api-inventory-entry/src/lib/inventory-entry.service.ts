import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {INVENTORY_ENTRY_URL, InventoryEntry} from "./inventory-entry-api";


@Injectable({
    providedIn: 'root'
})
export class InventoryEntryService extends BaseEntityService<InventoryEntry> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, INVENTORY_ENTRY_URL);
    }

}
