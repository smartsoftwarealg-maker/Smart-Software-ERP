import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CMMS_PERSONS, CMMS_WORKS, WorkPerson } from '@ss/cmms/cmms-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CMMSWorkPersonService extends BaseEntityService<WorkPerson> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_PERSONS, CMMS_WORKS);
    }
}
