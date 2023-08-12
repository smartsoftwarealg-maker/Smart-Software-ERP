import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Lookup} from '@ss/common/api-lookup';
import {HttpService} from '@ss/common/api-common';
import {REVALUATION_TYPE_URL} from '../assets-api';

@Injectable({
  providedIn: 'root'
})
export class AssetRevaluationTypeService extends BaseEntityService<Lookup>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, REVALUATION_TYPE_URL);
    }
}
