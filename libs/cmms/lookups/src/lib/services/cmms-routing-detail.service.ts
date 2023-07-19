import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { RoutingDetail } from '@ss/cmms/cmms-api';

@Injectable({
    providedIn: 'root'
})
export class CMMSRoutingDetailService extends BaseEntityService<RoutingDetail> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/detail', '/routing');
    }
}
