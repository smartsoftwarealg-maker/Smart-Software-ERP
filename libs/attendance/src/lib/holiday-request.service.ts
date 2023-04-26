import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    HOLIDAY_REQUEST_URL
} from './attendance-api';
import {HttpService} from '@ss/common/api-common';
import {HolidayRequest} from '@ss/payroll/api-employee';

@Injectable({
    providedIn: 'root'
})
export class HolidayRequestService extends BaseEntityService<HolidayRequest> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, HOLIDAY_REQUEST_URL);
    }
}
