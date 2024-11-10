import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { LTM_CENTER_MATTER_URL } from '../ltm-api';
import { HttpService } from '@ss/common/api-common';
import { Lookup } from '@ss/common/api-lookup';

@Injectable({
    providedIn: 'root'
})
export class LtmCenterMatterService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_CENTER_MATTER_URL);
    }
}
