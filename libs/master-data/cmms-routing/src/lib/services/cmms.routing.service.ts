import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CMMS_ROUTING } from '@ss/master-data/cmms-routing';
import { CMMSRouting } from '@ss/cmms/cmms-api';

@Injectable({
    providedIn: 'root'
})
export class CMMSRoutingService extends BaseEntityService<CMMSRouting> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_ROUTING);
    }
}
