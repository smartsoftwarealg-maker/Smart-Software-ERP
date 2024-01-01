import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CProductLine } from '@ss/costing/costing-utils';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CProductLineService extends BaseEntityService<CProductLine> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/products', '/costing/projects');
    }
}
