import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ACC_ASSET_END_URL} from './accounting-api';
import {HttpService} from '@ss/common/api-common';
import {Lookup} from '@ss/common/api-lookup';

@Injectable({
    providedIn: 'root'
})
export class AssetEndsService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACC_ASSET_END_URL);
    }
}
