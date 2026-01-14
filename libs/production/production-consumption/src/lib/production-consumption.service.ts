import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Transaction } from '@ss/logistics/api-transaction';

@Injectable({
    providedIn: 'root',
})
export class ProductionConsumptionService extends BaseEntityService<Transaction> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/production/consumptions');
    }
}
