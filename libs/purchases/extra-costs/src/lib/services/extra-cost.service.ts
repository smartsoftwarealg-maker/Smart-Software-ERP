import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { COSTS_URL, ExtraCost, TRANSACTIONS_URL } from '@ss/logistics/api-transaction';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class ExtraCostService extends BaseEntityService<ExtraCost> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, COSTS_URL, TRANSACTIONS_URL);
    }
}
