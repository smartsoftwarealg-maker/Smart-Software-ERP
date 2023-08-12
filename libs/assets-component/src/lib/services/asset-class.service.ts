import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Asset, ASSET_CLASS_URL, AssetClass, ASSETS_URL, Depreciation} from '../assets-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AssetClassService extends BaseEntityService<AssetClass>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ASSET_CLASS_URL);
    }
}
