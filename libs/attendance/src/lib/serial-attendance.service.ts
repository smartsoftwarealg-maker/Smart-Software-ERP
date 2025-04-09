import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { SERIAL_ATTENDANCE_URL, SSignature } from './attendance-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root',
})
export class SerialAttendanceService extends BaseEntityService<SSignature> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SERIAL_ATTENDANCE_URL);
    }
}
