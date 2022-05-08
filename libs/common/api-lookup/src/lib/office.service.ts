import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { OFFICES_URL, Office } from './lookups-api';
import { BaseEntityService } from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class OfficeService extends BaseEntityService<Office> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, OFFICES_URL);
    }

}
