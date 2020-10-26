
import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { StoreName, STORE_NAMES_URL } from './lookups-api';
import { BaseEntityService } from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class StoreNameService extends BaseEntityService<StoreName> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, STORE_NAMES_URL);
    }
}
