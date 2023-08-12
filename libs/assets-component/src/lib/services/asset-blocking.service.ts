import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ASSETS_URL, Blocking, BLOCKING_URL} from '../assets-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class AssetBlockingService extends BaseEntityService<Blocking>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, BLOCKING_URL, ASSETS_URL);
    }
}
