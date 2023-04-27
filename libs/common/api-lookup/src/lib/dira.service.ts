import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import {DAIRA_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Lookup} from '@ss/common/api-lookup';

@Injectable({
    providedIn: 'root'
})
export class DairaService extends BaseEntityService<Lookup> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DAIRA_URL);
    }
}
