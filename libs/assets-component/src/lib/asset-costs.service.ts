import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {AssetCost, ASSETS_URL, COST_URL} from './assets-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class AssetCostsService extends BaseEntityService<AssetCost> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, COST_URL, ASSETS_URL);
    }
}
