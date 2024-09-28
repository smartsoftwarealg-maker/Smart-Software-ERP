import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { AssetInventoryDoc, INVENTORY_DOC_URL } from '../assets-api';
import {HttpService} from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetOpenInventoryDocService extends BaseEntityService<AssetInventoryDoc>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, INVENTORY_DOC_URL);
    }

    override getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{
        itemCount: number;
        body: AssetInventoryDoc[]
    }> {
        return super.getList(page, pageSize, (filter||'')+'_0_', sortBy, extraPrams);
    }
}
