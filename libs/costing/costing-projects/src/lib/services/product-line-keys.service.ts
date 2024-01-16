import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CLineKey } from '@ss/costing/costing-utils';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class ProductLineKeysService extends BaseEntityService<CLineKey> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/keys', '/costing/products');
    }
}
