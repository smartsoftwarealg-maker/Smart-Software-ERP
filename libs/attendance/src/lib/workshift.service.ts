import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {WORK_SHIFT_URL, WorkShift} from './attendance-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class WorkshiftService extends BaseEntityService<WorkShift> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, WORK_SHIFT_URL);
    }
}
