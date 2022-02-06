import { Injectable } from '@angular/core';
import {AppContext, HttpService, LoginInfo, LoginService} from '@ss/common/api-common';
import {catchError, map, Observable, switchMap, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayrollMonthService {

  constructor(protected httpSrv: HttpService,
              private loginSrv: LoginService) { }

  maxMonth(): Observable<{ month: number }> {
      return this.httpSrv.get<{ month: number }>('/payroll/max-month');
  }

  minMonth(): Observable<{ month: number }> {
      return this.httpSrv.get<{ month: number }>('/payroll/min-month');
  }

  selectMonth(month: number): Observable<boolean> {
      return this.httpSrv
          .put('/payroll/month', {month: month})
          .pipe(
              tap(ctx => this.loginSrv.setContext(ctx)),
              map(_ => true));
  }

  close(): Observable<boolean> {
      return this
          .httpSrv
          .post('/payroll/close')
          .pipe(map(_ => true));
  }

  cancel(): Observable<boolean> {
      return this
          .httpSrv
          .post('/payroll/cancel')
          .pipe(map(_ => true));
  }

    ctx(): Observable<AppContext> {
        return this
            .httpSrv
            .get<LoginInfo>('/ctx')
            .pipe(map(res => res.ctx));
    }
}

