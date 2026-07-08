import { Injectable } from '@angular/core';
import { BaseEntityExtendedService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckDeposit, CheckDepositLine, CHECK_DEPOSITS_URL, LINES_URL } from './check-deposit-api';

@Injectable({
    providedIn: 'root'
})
export class CheckDepositService extends BaseEntityExtendedService<CheckDeposit> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CHECK_DEPOSITS_URL);
    }

    override add2(a: CheckDeposit): Observable<number> {
        return this.httpSrv
            .put(this.dateUrl(a), a)
            .pipe(map((res: { id: number }) => res['id']));
    }

    override update(a: CheckDeposit): Observable<number> {
        return this.httpSrv
            .put(this.dateUrl(a), a)
            .pipe(map((res: { count?: number, id?: number }) => res?.count || res?.id || 0));
    }

    private dateUrl(a: CheckDeposit): string {
        return `${this.getUrl()}?date=${encodeURIComponent(a.depositDate)}`;
    }
}

@Injectable({
    providedIn: 'root'
})
export class CheckDepositLineService extends BaseEntityExtendedService<CheckDepositLine> {
    private changedSubject = new Subject<void>();
    public changed$ = this.changedSubject.asObservable();

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LINES_URL, CHECK_DEPOSITS_URL);
    }

    notifyChanged() {
        this.changedSubject.next();
    }
}
