import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {TRANSAC_ACCOUNT_URL, TransacAccount} from './accounting-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class TransacAccountService extends BaseEntityService<TransacAccount>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, TRANSAC_ACCOUNT_URL);
    }
}
