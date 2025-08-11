import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import { DETAIL_URL, INTER_STORE_TRANSFER_URL, InterStoreTransferLine } from '@ss/logistics/api-transaction';
import { BaseEntityService } from '@ss/common/api-base-entity';
import {Observable} from 'rxjs';
import {Location} from "@ss/master-data/api-article";

@Injectable({
    providedIn: 'root'
})
export class InterStoreTransferLinesService extends BaseEntityService<InterStoreTransferLine>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv,DETAIL_URL ,INTER_STORE_TRANSFER_URL );
    }

    override setParentId(id: number) {
        super.setParentId(id);
    }

    getStock(reference: string, store: number): Observable<Location> {
        return this.httpSrv.get(`/articles/stock?reference=${reference}&store=${store}`);
    }
}
