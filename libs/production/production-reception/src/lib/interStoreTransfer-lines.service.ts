import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import { InterStoreTransferLine } from '@ss/logistics/api-transaction';
import { BaseEntityService } from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class InterStoreTransferLinesService extends BaseEntityService<InterStoreTransferLine>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv,'/detail' ,'/store-transfers' );
    }

    override setParentId(id: number) {
        super.setParentId(id);
    }

}
