import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Asset, ASSETS_URL} from './assets-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class AssetsService extends BaseEntityService<Asset>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ASSETS_URL);
    }
}
