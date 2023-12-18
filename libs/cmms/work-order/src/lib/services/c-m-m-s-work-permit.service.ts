import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import {
    CMMS_PERMITS,
    CMMS_WORKS,
    WorkPermit
} from '@ss/cmms/cmms-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CMMSWorkPermitService extends BaseEntityService<WorkPermit> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_PERMITS, CMMS_WORKS);
    }
}
