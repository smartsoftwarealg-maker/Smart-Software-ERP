import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { AssetReading, CMMS_ASSET5S_URL, CMMS_READINGS_URL } from '../../../cmms-api/cmms-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CMMSAssetReadingService extends BaseEntityService<AssetReading>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_READINGS_URL, CMMS_ASSET5S_URL);
        this.setParentId(0);
    }
}
