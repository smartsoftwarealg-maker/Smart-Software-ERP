import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CKey } from '@ss/costing/costing-utils';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CostingKeyService extends BaseEntityService<CKey> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/costing/keys');

    }
}
