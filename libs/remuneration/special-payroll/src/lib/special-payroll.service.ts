import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Special, SPECIAL_PAYROLL_URL} from './special-payroll.class';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class SpecialPayrollService extends BaseEntityService<Special> {

  constructor(override httpSrv: HttpService) {
      super(httpSrv, SPECIAL_PAYROLL_URL);
  }
}
