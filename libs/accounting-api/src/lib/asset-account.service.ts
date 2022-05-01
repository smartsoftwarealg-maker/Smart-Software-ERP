import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Account, ASSET_ACCOUNT_URL} from '../../../accounting/api-accounts/src';

@Injectable({
    providedIn: 'root'
})
export class AssetAccountService extends BaseEntityService<Account> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ASSET_ACCOUNT_URL);
    }
}
