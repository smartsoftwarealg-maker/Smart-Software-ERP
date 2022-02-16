import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {Bank, BANKS_URL} from './bank-api';

@Injectable({
    providedIn: 'root'
})
export class BankService extends BaseEntityService<Bank>{

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, BANKS_URL);
    }
}
