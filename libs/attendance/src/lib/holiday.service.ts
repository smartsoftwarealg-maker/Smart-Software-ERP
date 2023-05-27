import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Holiday, HOLIDAY_URL} from './attendance-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class HolidayService extends BaseEntityService<Holiday> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, HOLIDAY_URL);
    }
}
