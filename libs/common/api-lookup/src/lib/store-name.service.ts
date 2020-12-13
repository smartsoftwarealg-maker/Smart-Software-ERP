import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {STORE_NAMES_URL, StoreName} from './lookups-api';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class StoreNameService extends BaseEntityExtendedService<StoreName> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, STORE_NAMES_URL);
    }
}
