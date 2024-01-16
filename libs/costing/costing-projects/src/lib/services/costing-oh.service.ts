import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { OH } from '@ss/costing/costing-utils';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CostingOhService extends BaseEntityService<OH> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/oh', '/costing/projects');
    }
}
