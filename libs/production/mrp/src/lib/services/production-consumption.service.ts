import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityExtendedService } from '@ss/common/api-base-entity';
import { ProductionConsumption } from '../api/mrp-api';

@Injectable({
    providedIn: 'root'
})
export class ProductionConsumptionService extends BaseEntityExtendedService<ProductionConsumption> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/production/mrp-consumptions');
    }
}
