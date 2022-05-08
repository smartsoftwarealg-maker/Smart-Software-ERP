import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {AssetCost, AssetLocation, ASSETS_URL, COST_URL, LOCATIONS_URL} from './assets-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class AssetLocationService extends BaseEntityService<AssetLocation> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LOCATIONS_URL);
    }
}
