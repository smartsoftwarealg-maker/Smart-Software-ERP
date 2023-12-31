import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../common/api-common/src';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CMMS_ROUTING } from '@ss/master-data/cmms-routing';
import { Lookup } from '@ss/common/api-lookup';

@Injectable({
    providedIn: 'root'
})
export class CMMSRoutingService extends BaseEntityService<Lookup> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_ROUTING);
    }
}
