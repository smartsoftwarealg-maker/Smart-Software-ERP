import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CLineCost } from '@ss/costing/costing-utils';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class ProductLineCostsService extends BaseEntityService<CLineCost> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/costs', '/costing/products');
    }
}
