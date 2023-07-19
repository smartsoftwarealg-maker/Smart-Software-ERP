import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { RoutingPart } from '@ss/cmms/cmms-api';

@Injectable({
    providedIn: 'root'
})
export class CMMSRoutingPartService extends BaseEntityService<RoutingPart> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/parts', '/routing');
    }
}
