import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Store, STORE_URL } from './lookups-api';
import { BaseEntityExtendedService } from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root',
})
export class StoreService extends BaseEntityExtendedService<Store> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, STORE_URL);
    }
}
