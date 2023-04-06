import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ATTENDANCE_TYPE_URL, AttendanceType} from './attendance-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class AttendanceTypeService extends BaseEntityService<AttendanceType> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ATTENDANCE_TYPE_URL);
    }
}
