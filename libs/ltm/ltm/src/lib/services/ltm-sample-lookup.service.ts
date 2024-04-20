import { LTM_SAMPLES_URL, LTMLineMatter } from '../ltm-api';
import { Lookup } from '@ss/common/api-lookup';
import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class LtmSampleLookupService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_SAMPLES_URL);
    }
}
