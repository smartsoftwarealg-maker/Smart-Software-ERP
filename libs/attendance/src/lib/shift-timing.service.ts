import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    ATTENDANCE_PERSONS_URL,
    ATTENDANCE_SHIFTS_URL,
    PersonShift, SHIFT_TIMING_URL,
    Timing,
    WORK_SHIFT_URL,
    WorkShift
} from './attendance-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class ShiftTimingService extends BaseEntityService<Timing> {
    private _startDate: Date = null;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SHIFT_TIMING_URL, WORK_SHIFT_URL);
        this.setParentId(0);
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(d: Date) {
        this._startDate = d;
    }
}
