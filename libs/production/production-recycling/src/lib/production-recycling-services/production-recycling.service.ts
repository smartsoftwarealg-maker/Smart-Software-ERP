import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Transaction } from '@ss/logistics/api-transaction';
import { PRODUCTION_RECYCLING_URL } from './production-recycling-api';

@Injectable({
    providedIn: 'root',
})
export class ProductionRecyclingService extends BaseEntityService<Transaction> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, PRODUCTION_RECYCLING_URL);
    }
}
