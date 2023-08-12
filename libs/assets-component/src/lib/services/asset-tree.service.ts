import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { ASSET_INVENTORY_URL, ASSET_YEARS_URL, AssetInventory, ASSTree, TAsset } from "../assets-api";
import {Observable} from 'rxjs';
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class AssetInventoryService extends BaseEntityService<TAsset> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/tassets');
        this.setParentId(0);
    }

    tree(page: number, limit: number, filter?: string): Observable<{itemCount: number, body: ASSTree[]}> {
        return this.httpSrv.getData('/assets/tree', page, limit, filter);
    }
}
