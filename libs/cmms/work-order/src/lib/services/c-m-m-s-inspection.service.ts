import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CMMS_INSPECTION_URL, CMMS_WORKS, Inspection } from '@ss/cmms/cmms-api';
import { HttpService } from '@ss/common/api-common';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CMMSInspectionService extends BaseEntityService<Inspection> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_INSPECTION_URL, CMMS_WORKS);
    }

    loadChecklist(): Observable<{ count: number }> {
        return this.httpSrv.post(`/cmms/${this.getParentId()}/checklist`);
    }
}
