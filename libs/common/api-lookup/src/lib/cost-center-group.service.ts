import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { CC_GROUP_URL } from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Lookup} from './lookup.class';

@Injectable({
    providedIn: 'root'
})
export class CostCenterGroupService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CC_GROUP_URL);
    }
}
