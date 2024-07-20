import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { ASSET_INVENTORY_URL, ASSET_OFFICE_URL, ASSET_YEARS_URL, AssetInventory, InventoryAsset } from '../assets-api';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AssetListInventoryService extends BaseEntityService<InventoryAsset> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ASSET_INVENTORY_URL, ASSET_OFFICE_URL);
        this.setParentId(0);
    }
}
