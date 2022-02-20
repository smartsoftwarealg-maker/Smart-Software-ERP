import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {Lookup, SPECIAL_EMPLOYEE_URL} from '@ss/remuneration/special-payroll-common';

@Injectable({
    providedIn: 'root'
})
export class EmployeeLookupService extends BaseEntityExtendedService<Lookup> {

    constructor(override httpSrv: HttpService) {
        super(httpSrv, SPECIAL_EMPLOYEE_URL);
    }
}
