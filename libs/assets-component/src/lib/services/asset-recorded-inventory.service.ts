import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { HttpService, PaginationModel } from '@ss/common/api-common';
import {
    ASSET_INVENTORY_URL,
    ASSET_OFFICE_URL,
    ASSET_YEARS_URL,
    AssetInventory,
    AssetInventoryDoc, AssetInventoryFilter,
    InventoryAsset
} from '../assets-api';
import {Observable} from 'rxjs';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AssetRecordedInventoryService extends BaseEntityService<InventoryAsset> {

    private _document: AssetInventoryFilter|null = null;
    private _recorded = false;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/inventories/recorded');
        this.setParentId(0);
    }


    override getPage(pageModel: PaginationModel, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<InventoryAsset[]> {
        extraPrams = new HttpParams().set('document', this._document?.id||0)
        return super.getPage(pageModel, filter, sortBy, extraPrams);
    }

    set document(doc: AssetInventoryFilter) {
        this._document = doc;
    }

    set recorded(recorded: boolean) {
        this._recorded = recorded;
    }

    protected override getUrl(): string {
        return this._recorded? '/inventories/recorded' : '/inventories/missing';
    }
}
