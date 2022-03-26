import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Lookup} from '@ss/common/api-lookup';
import {HttpService} from '@ss/common/api-common';
import {COST_TYPE_URL} from './assets-api';

@Injectable({
  providedIn: 'root'
})
export class AssetCostsTypeService extends BaseEntityService<Lookup>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, COST_TYPE_URL);
    }
}
