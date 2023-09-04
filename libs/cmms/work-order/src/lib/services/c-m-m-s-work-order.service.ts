import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CMMS_CUR_WORK_ORDER_URL, Work } from '@ss/cmms/cmms-api';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CMMSWorkOrderService extends BaseEntityService<Work> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_CUR_WORK_ORDER_URL);
    }

    generateRequest(routingId: number): Observable<{id: number}> {
        return this.httpSrv.post('/parts-request/' + routingId);
    }
}
