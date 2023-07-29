import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Transaction } from '@ss/logistics/api-transaction';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class PartsRequestService extends BaseEntityService<Transaction> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/part-requests');
    }
}
