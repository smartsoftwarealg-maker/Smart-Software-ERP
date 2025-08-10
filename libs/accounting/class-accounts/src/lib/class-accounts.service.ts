import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import {
    ACCOUNT_CLASSES_URL,
    SodismacSupplierAccount,
} from './class-accounts-api.class';
import { ACCOUNT_URL } from '@ss/accounting/api-accounts';

@Injectable({
    providedIn: 'root',
})
export class ClassAccountsLineService extends BaseEntityService<SodismacSupplierAccount> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACCOUNT_URL, ACCOUNT_CLASSES_URL);
    }
}
