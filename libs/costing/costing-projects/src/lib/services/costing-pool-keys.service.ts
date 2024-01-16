import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CPoolDetail } from '@ss/costing/costing-utils';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CostingPoolKeysService extends BaseEntityService<CPoolDetail> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/detail', '/costing/pools');
    }
}
