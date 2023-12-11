import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Asset, CMMS_ASSETS } from './asset-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CmmsAssetService extends BaseEntityService<Asset> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_ASSETS);
    }
}
