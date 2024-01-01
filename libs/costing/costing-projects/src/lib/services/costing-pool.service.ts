import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CPool } from '@ss/costing/costing-utils';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CostingPoolService extends BaseEntityService<CPool> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/pools', '/costing/projects');
    }
}
