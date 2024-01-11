import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CPoolCost } from '@ss/costing/costing-utils';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CostingPoolsCostsService extends BaseEntityService<CPoolCost> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/costs', '/costing/pools');
    }
}
