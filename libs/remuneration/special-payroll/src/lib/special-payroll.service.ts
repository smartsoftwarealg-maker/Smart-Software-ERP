import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Special, SPECIAL_PAYROLL_URL} from './special-payroll.class';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialPayrollService extends BaseEntityService<Special> {

  constructor(override httpSrv: HttpService) {
      super(httpSrv, SPECIAL_PAYROLL_URL);
  }


  generateAll(): Observable<{ count: number }> {
      return this.httpSrv.put('/payroll/special-payrolls/insert-all');
  }

  deleteAll(): Observable<{ count: number }> {
      return this.httpSrv.remove('/payroll/special-payrolls/delete-all');
  }

  deleteOne(id: number): Observable<{ count: number }> {
      return this.httpSrv.remove(`/payroll/special-payrolls/${id}/delete-one`);
  }

  generateOne(id: number): Observable<{ count: number }> {
      const emp = id || 0;
      return this.httpSrv.put(`/payroll/special-payrolls/${emp}/insert`);
  }
}
