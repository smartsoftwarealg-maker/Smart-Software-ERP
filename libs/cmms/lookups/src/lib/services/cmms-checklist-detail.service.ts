import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { ChecklistDetail } from '@ss/cmms/cmms-api';

@Injectable({
    providedIn: 'root'
})
export class CMMSChecklistDetailService extends BaseEntityService<ChecklistDetail> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/detail', '/checklist');
    }
}
