import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {map, Observable, Observer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayrollMonthService {

  constructor(protected httpSrv: HttpService) { }

  maxMonth(): Observable<{ month: number }> {
      return this.httpSrv.get<{ month: number }>('/payroll/max-month');
  }

  minMonth(): Observable<{ month: number }> {
      return this.httpSrv.get<{ month: number }>('/payroll/min-month');
  }

  selectMonth(month: number): Observable<boolean> {
      return this.httpSrv
          .put('/payroll/month', {month: month})
          .pipe(map(_ => true));
  }

  close(): Observable<boolean> {
      return this
          .httpSrv
          .post('/payroll/close')
          .pipe(map(_ => true));
  }
}

