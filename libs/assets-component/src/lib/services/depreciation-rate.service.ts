import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Lookup} from '@ss/common/api-lookup';
import {HttpService} from '@ss/common/api-common';
import {ASSET_DEPRECIATION_RATES_URL, ASSETS_URL, COST_TYPE_URL, DepreciationRate} from '../assets-api';

@Injectable({
  providedIn: 'root'
})
export class DepreciationRateService extends BaseEntityService<DepreciationRate> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ASSET_DEPRECIATION_RATES_URL, ASSETS_URL);
    }
}
