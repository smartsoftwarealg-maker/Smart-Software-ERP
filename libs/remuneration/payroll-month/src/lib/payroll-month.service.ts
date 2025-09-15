import {Injectable} from '@angular/core';
import {AppContext, HttpService, LanguageService, LoginInfo, LoginService} from '@ss/common/api-common';
import { catchError, map, Observable, of, switchMap, tap } from "rxjs";
import { ShellService, ToolbarLabel } from "@ss/common/ui-shell";
import {HttpParams, HttpResponse} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PayrollMonthService {
    private _maxMonth = 0;

    constructor(protected httpSrv: HttpService,
                private loginSrv: LoginService,
                private langSrv: LanguageService,
                private shellSrv: ShellService) {}

    maxMonth(): Observable<{ month: number }> {
        return this.httpSrv.get<{ month: number }>('/payroll/max-month');
    }

    curMonthLabel(): Observable<ToolbarLabel> {
        return this.httpSrv
            .get<{ month: number }>('/payroll/max-month')
            .pipe(map(res => {
                    this._maxMonth = res.month;
                    return this.getLabel();
                }),
                catchError(err => of({ title: '', text: '' })));
    }

    getLabel() {
        const cur = this.loginSrv.appCtx.payMonth % 1_000_000;
        const off = +(this.loginSrv.appCtx.payMonth / 1_000_000).toFixed(0);
        return {
            title: `${this.langSrv.translate('PAYROLL_MONTH')} :`,
            text: `${cur % 100}/${(cur / 100).toFixed(0)} ${off > 0 ? '.' + off : ''} / ${this._maxMonth % 100}/${(this._maxMonth / 100).toFixed(0)}`
        };
    }

    minMonth(): Observable<{ month: number }> {
        return this.httpSrv.get<{ month: number }>('/payroll/min-month');
    }

    selectMonth(month: number): Observable<boolean> {
        return this.httpSrv
            .put('/payroll/month', { month: month })
            .pipe(
                tap(ctx => this.loginSrv.setContext(ctx)),
                switchMap(_ => this.curMonthLabel()),
                tap(title => this.shellSrv.setLabels([title])),
                map(_ => true));
    }

    close(): Observable<string> {
        return this
            .httpSrv
            .post('/payroll/close');
    }

    cancel(): Observable<boolean> {
        return this
            .httpSrv
            .post('/payroll/cancel')
            .pipe(map(_ => true));
    }

    isUpdatableMonth(): Observable<boolean> {
        return this.maxMonth().pipe(map(res => res.month === this.loginSrv.appCtx.payMonth % 1000000))
    }

    ctx(): Observable<AppContext> {
        return this
            .httpSrv
            .get<LoginInfo>('/ctx')
            .pipe(map(res => res.ctx));
    }

    public getStatus(uuid: string): Observable<HttpResponse<Object>> {
        return this.httpSrv.getFullResponse(`/payroll/close?uuid=${uuid}`);
    }
}

