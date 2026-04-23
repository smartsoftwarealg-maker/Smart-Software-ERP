import { Injectable, inject } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { WORK_CENTER_URL, WorkCenter } from './work-center-api';

@Injectable({
    providedIn: 'root',
})
export class WorkCenterService extends BaseEntityService<WorkCenter> {
    protected override httpSrv = inject(HttpService);

    constructor() {
        super(inject(HttpService), WORK_CENTER_URL);
    }
}
