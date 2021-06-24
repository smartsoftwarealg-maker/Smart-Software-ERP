import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { MARITAL_STATUS_URL, MaritalStatus } from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class MaritalStatusService extends BaseEntityService<MaritalStatus> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, MARITAL_STATUS_URL);
    }

}
