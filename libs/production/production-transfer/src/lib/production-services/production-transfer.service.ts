
import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { PRODUCTION_URL } from './production-api';
import {Transaction} from '@ss/logistics/api-transaction';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductionTransferService extends BaseEntityService<Transaction> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/production/transfers');
    }
}
