import { Injectable } from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {Lookup, SPECIAL_EMPLOYEE_URL} from './special-payroll.class';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLookupService extends BaseEntityExtendedService<Lookup> {

  constructor(override httpSrv: HttpService) {
      super(httpSrv, SPECIAL_EMPLOYEE_URL);
  }
}
