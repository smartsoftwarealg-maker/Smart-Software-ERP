import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Asset, AssetBuilding, ASSETS_BUILDING_URL, ASSETS_URL, Depreciation} from './assets-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AssetsBuildingService extends BaseEntityService<AssetBuilding>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ASSETS_BUILDING_URL);
    }
}
