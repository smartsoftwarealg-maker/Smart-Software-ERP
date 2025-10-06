import {BaseEntityService} from "@ss/common/api-base-entity";
import {Injectable} from "@angular/core";
import {PAYROLL_MONTH_LOCK_URL, PayrollMonth} from "./month-lock.api";
import {HttpService} from "@ss/common/api-common";
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class MonthLockService extends BaseEntityService<PayrollMonth> {
    constructor(httpSrv: HttpService) {
        super(httpSrv, PAYROLL_MONTH_LOCK_URL);
    }

    lock(center: number): Observable<{ count: number }> {
        return this.httpSrv.put(PAYROLL_MONTH_LOCK_URL, {id: center, monthValidated: true}) as Observable<{count: number}>;
    }

}
