import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {AssetRevaluation, ASSETS_URL, COST_URL, REVALUATION_URL} from '../assets-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class AssetRevaluationService  extends BaseEntityService<AssetRevaluation> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, REVALUATION_URL, ASSETS_URL);
    }
}
