import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { SalesCategory } from './category-accounts.api';

@Injectable({
    providedIn: 'root',
})
export class CategoryAccountsService extends BaseEntityService<SalesCategory> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/sales-categories');
    }
}
