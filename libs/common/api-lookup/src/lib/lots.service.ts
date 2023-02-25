import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {LOTS_URL, Store} from './lookups-api';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class LotsService extends BaseEntityExtendedService<Store> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LOTS_URL);
    }
}
