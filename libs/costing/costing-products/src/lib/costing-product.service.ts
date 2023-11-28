import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CProduct } from '@ss/costing/costing-utils';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CostingProductService extends BaseEntityService<CProduct> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/costing/products');

    }
}
