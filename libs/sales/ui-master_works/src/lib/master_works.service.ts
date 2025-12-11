import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import {masterWork} from './master_works-api.class';


export const MASTERWORKS_URL = '/lookups/master_works';

@Injectable({
    providedIn: 'root',
})
export class MasterWorksService extends BaseEntityService<masterWork> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, MASTERWORKS_URL);
    }
}
