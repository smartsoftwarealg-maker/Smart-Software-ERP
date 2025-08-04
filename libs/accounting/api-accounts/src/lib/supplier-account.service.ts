import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Account, ACCOUNT_URL} from './account-api';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class SupplierAccountService extends BaseEntityService<Account> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACCOUNT_URL);
    }

    override getList(page: number, pageSize: number, filter?: string): Observable<{
        itemCount: number;
        body: Account[]
    }> {
        return this.httpSrv.getData<Account>('/accounts/supplier-accounts', page, pageSize, filter, this.sortColumn);
        // return super.getList(page, pageSize, filter, this.sortColumn);
    }
}
