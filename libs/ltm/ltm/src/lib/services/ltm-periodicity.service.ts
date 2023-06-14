import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Lookup} from '@ss/common/api-lookup';
import {HttpService} from '@ss/common/api-common';
import {LRM_PERIODICITY_URL} from '../ltm-api';

@Injectable({
    providedIn: 'root'
})
export class LtmPeriodicityService extends BaseEntityService<Lookup> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LRM_PERIODICITY_URL);
    }
}

