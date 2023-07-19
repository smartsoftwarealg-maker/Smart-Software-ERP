import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { AssetTrigger, CMMS_ASSET5S_URL, CMMS_TRIGGERS_URL } from '../../../cmms-api/src/lib/cmms-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CMMSAssetTriggerService extends BaseEntityService<AssetTrigger>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_TRIGGERS_URL, CMMS_ASSET5S_URL);
        this.setParentId(0);
    }
}

