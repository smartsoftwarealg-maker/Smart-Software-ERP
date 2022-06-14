import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {ASSET_INVENTORY_URL, ASSET_YEARS_URL, AssetInventory} from './assets-api';

@Injectable({
  providedIn: 'root'
})

export class AssetInventoryService extends BaseEntityService<AssetInventory> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ASSET_INVENTORY_URL, ASSET_YEARS_URL);
        this.setParentId(0);
    }
}
