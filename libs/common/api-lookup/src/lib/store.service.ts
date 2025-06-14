import { Injectable } from '@angular/core';
import { HttpService, PaginationModel } from '@ss/common/api-common';
import { LOTS_URL, Lot, Store, STORE_URL } from './lookups-api';
import { BaseEntityExtendedService } from '@ss/common/api-base-entity';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class StoreService extends BaseEntityExtendedService<Store> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, STORE_URL);
    }
}
