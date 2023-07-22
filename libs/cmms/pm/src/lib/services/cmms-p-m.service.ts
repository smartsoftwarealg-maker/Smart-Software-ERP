import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CMMS_PM_URL, PM } from '@ss/cmms/cmms-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CMMSPMService extends BaseEntityService<PM> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_PM_URL);
    }
}
