import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { HttpService, PaginationModel } from '@ss/common/api-common';
import { ASSET_INVENTORY_URL, ASSET_OFFICE_URL, ASSET_YEARS_URL, AssetInventory, InventoryAsset } from '../assets-api';
import {Observable} from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AssetListInventoryService extends BaseEntityService<InventoryAsset> {
    private _document = 0;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ASSET_INVENTORY_URL, ASSET_OFFICE_URL);
        this.setParentId(0);
    }

    override getPage(pageModel: PaginationModel, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<InventoryAsset[]> {
        const strFilter = (filter||'') + (this._document > 0? '//' + this._document : '');
        return super.getPage(pageModel, strFilter, sortBy, extraPrams);
    }

    set document(d: number) {
        this._document = d;
    }
}
