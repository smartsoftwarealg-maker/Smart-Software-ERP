import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { HttpService, PaginationModel } from '@ss/common/api-common';
import {
    ASSET_INVENTORY_URL,
    AssetInventoryDoc, AssetInventoryFilter,
    InventoryAsset
} from '../assets-api';
import {Observable} from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AssetListInventoryService extends BaseEntityService<InventoryAsset> {
    #_document: AssetInventoryFilter|null = null;
    #_lastDoc: AssetInventoryDoc|null = null;


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

    private getParams(): HttpParams {
        let extraPrams: HttpParams|null = null;
        if (this.#_document) {
            const values = new Map<string, number|string|null> ([
                ['officeId',    this.#_document.officeId],
                ['locationId',  this.#_document.locationId],
                ['buildingId',  this.#_document.buildingId],
                ['minValue',    this.#_document.minValue],
                ['maxValue',    this.#_document.maxValue],
                ['classId',     this.#_document.classId],
                ['classId',     this.#_document.classId],
                ['beneficiary', this.#_document.beneficiary],
                ['receptionNo', this.#_document.receptionNo],
                ['accountNo',   this.#_document.accountNo],
                ['documentId', this.document?.documentId]
            ]);
            extraPrams = this.setParams(new HttpParams(), values);
        }
        return extraPrams;
    }
    override getPage(pageModel: PaginationModel, filter?: string, sortBy?: string): Observable<InventoryAsset[]> {
        return super.getPage(pageModel, filter, sortBy, this.getParams());
    }

    set document(doc: AssetInventoryFilter) {
        this.#_document = doc;
    }
    get document(): AssetInventoryFilter|null {
        return this.#_document;
    }

    get lastDoc(): AssetInventoryDoc|null {
        return this.#_lastDoc;
    }

    set lastDoc(doc: AssetInventoryDoc|null) {
        this.#_lastDoc = doc;
    }

    override update(a: InventoryAsset): Observable<number> {
        return a.updateLocation ?
            this.httpSrv
                .put('/inventory-locations', a)
                .pipe(map((res: { count: number }) => res['count'])) :
            super.update(a);
    }

    override excel(): Observable<Blob> {
        return this.httpSrv.getBlob(this.getUrl() + '/excel', this.getParams());
    }
}
