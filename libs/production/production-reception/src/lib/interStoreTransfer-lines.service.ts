import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import { DETAIL_URL, INTER_STORE_TRANSFER_URL, InterStoreTransferLine } from '@ss/logistics/api-transaction';
import { BaseEntityService } from '@ss/common/api-base-entity';

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

}
