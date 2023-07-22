import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CMMS_PREV_WORK_ORDER_URL, Work } from '@ss/cmms/cmms-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CMMSPrevWorkOrderService extends BaseEntityService<Work> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_PREV_WORK_ORDER_URL);
    }
}
