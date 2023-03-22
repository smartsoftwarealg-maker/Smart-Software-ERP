import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ATTENDANCE_PERSONS_URL, ATTENDANCE_SHIFTS_URL, PersonShift, WORK_SHIFT_URL, WorkShift} from './attendance-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonShiftService extends BaseEntityService<PersonShift> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ATTENDANCE_SHIFTS_URL, ATTENDANCE_PERSONS_URL);
        this.setParentId(0);
    }

    getListByService(id: number, page: number, size: number): Observable<{itemCount: number, body: PersonShift[]}> {
        return this.httpSrv.getData(`/attendance/services/${id}/shifts`, page, size);
    }
}
