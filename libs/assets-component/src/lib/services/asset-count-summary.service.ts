import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { HttpService, PaginationModel } from '@ss/common/api-common';
import {
    ASSET_INVENTORY_URL,
    ASSET_OFFICE_URL,
    ASSET_YEARS_URL,
    AssetInventory,
    AssetInventoryDoc, AssetInventoryFilter, CountSummary,
    InventoryAsset
} from '../assets-api';
import {Observable} from 'rxjs';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AssetCountSummaryService extends BaseEntityService<CountSummary> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/inventories/summary');
    }
}
