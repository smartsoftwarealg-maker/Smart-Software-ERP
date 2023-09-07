import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CMMS_INSPECTION_ORDER_URL, Work } from '@ss/cmms/cmms-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CMMSInspectionOrderService extends BaseEntityService<Work> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_INSPECTION_ORDER_URL);
    }
}
