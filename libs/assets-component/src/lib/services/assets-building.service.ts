import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { AssetBuilding, ASSETS_BUILDING_URL, LOCATIONS_URL } from "../assets-api";
import {HttpService} from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class AssetsBuildingService extends BaseEntityService<AssetBuilding> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ASSETS_BUILDING_URL, LOCATIONS_URL);
    }
}
