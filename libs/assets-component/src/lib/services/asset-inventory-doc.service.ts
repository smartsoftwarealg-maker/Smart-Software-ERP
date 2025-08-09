import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { AssetInventoryDoc, INVENTORY_DOC_URL } from '../assets-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AssetInventoryDocService extends BaseEntityService<AssetInventoryDoc>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, INVENTORY_DOC_URL);
    }

    generateLines(documentId: number): Observable<{ count: number}> {
        return this.httpSrv.post(`/inventories/${documentId}/generate`);
    }
}
