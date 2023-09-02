import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CMMS_ROUTING, CMMSRouting } from '../cmms-routing/routing-api';

@Injectable({
    providedIn: 'root'
})
export class CMMSRoutingService extends BaseEntityService<CMMSRouting> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_ROUTING);
    }
}
