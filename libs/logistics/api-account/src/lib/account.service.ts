import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Account, ACCOUNT_URL} from './account-api';


@Injectable({
    providedIn: 'root'
})
export class AccountService extends BaseEntityService<Account> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, ACCOUNT_URL);
    }

}
