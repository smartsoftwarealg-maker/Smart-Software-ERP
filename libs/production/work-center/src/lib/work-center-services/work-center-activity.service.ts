import { Injectable, inject } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {WORK_CENTER_URL, WorkCenterActivity} from './work-center-api';


@Injectable({
    providedIn: 'root',
})
export class WorkCenterActivityService extends BaseEntityService<WorkCenterActivity> {
    protected override httpSrv = inject(HttpService);

    constructor() {
        super(inject(HttpService), '/activities',WORK_CENTER_URL );
    }

}
