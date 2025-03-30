import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {ATTENDANCE_MACHINE_URL, AttendanceMachine} from './attendance-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceMachineService extends BaseEntityService<AttendanceMachine> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ATTENDANCE_MACHINE_URL);
    }
}
