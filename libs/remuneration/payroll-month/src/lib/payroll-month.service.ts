import {Injectable} from '@angular/core';
import {AppContext, HttpService, LanguageService, LoginInfo, LoginService} from '@ss/common/api-common';
import {catchError, map, Observable, of, tap} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PayrollMonthService {

    constructor(protected httpSrv: HttpService,
                private loginSrv: LoginService,
                private langSrv: LanguageService) {}

    maxMonth(): Observable<{ month: number }> {
        return this.httpSrv.get<{ month: number }>('/payroll/max-month');
    }

    curMonthLabel(): Observable<string> {
        return this.httpSrv
            .get<{ month: number }>('/payroll/max-month')
            .pipe(map(res => {
                    const max = res.month;
                    const cur = this.loginSrv.appCtx.payMonth % 1_000_000;
                    const off = +(this.loginSrv.appCtx.payMonth / 1_000_000).toFixed(0);
                    return `${this.langSrv.translate('PAYROLL_MONTH')}: ${cur % 100}/${(cur / 100).toFixed(0)} ${off > 0 ? '.' + off : ''} / ${max % 100}/${(max / 100).toFixed(0)}`;
                }),
                catchError(err => of('')));
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

    isUpdatableMonth(): Observable<boolean> {
        return this.maxMonth()
            .pipe(map(res => res.month === this.loginSrv.appCtx.payMonth % 1000000))
    }

    ctx(): Observable<AppContext> {
        return this
            .httpSrv
            .get<LoginInfo>('/ctx')
            .pipe(map(res => res.ctx));
    }
}

