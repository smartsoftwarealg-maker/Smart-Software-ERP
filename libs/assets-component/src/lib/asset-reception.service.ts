import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ASSET_RECEPTIONS_URL, AssetReception} from './assets-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})

export class AssetReceptionService extends BaseEntityService<AssetReception> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ASSET_RECEPTIONS_URL);
    }
}
