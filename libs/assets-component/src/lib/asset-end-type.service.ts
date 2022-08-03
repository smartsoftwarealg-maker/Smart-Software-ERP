import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Lookup} from '@ss/common/api-lookup';
import {HttpService} from '@ss/common/api-common';
import {BLOCKING_TYPE_URL, COST_TYPE_URL, END_TYPE_URL} from './assets-api';

@Injectable({
  providedIn: 'root'
})
export class AssetEndTypeService extends BaseEntityService<Lookup> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, END_TYPE_URL);
    }
}
