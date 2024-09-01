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

export class AssetListInventoryService extends BaseEntityService<InventoryAsset> {
    private _document: AssetInventoryFilter|null = null;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ASSET_INVENTORY_URL);
        this.setParentId(0);
    }

    private setParams(param: HttpParams, params: Map<string, number|null|string>) {
        for (let key of params.keys()) {
            if (params.get(key)) {
                param = param.set(key, params.get(key)!.toString());
            }
        }
        return param;
    }

    override getPage(pageModel: PaginationModel, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<InventoryAsset[]> {
        if (this._document) {
            const values = new Map<string, number|string|null> ([
                ['officeId',    this._document.officeId],
                ['locationId',  this._document.locationId],
                ['buildingId',  this._document.buildingId],
                ['minValue',    this._document.minValue],
                ['maxValue',    this._document.maxValue],
                ['classId',     this._document.classId],
                ['classId',     this._document.classId],
                ['beneficiary', this._document.beneficiary],
                ['receptionNo', this._document.receptionNo],
                ['accountNo',   this._document.accountNo],
            ]);
           extraPrams = this.setParams(extraPrams||new HttpParams(), values);
        }
        return super.getPage(pageModel, filter, sortBy, extraPrams);
    }

    set document(doc: AssetInventoryFilter) {
        this._document = doc;
    }
    get document(): AssetInventoryFilter|null {
        return this._document;
    }
}
