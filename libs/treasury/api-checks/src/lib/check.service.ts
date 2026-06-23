import {Injectable} from '@angular/core';
import {Observable, from} from 'rxjs';
import {concatMap, switchMap, toArray} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { BankCheck, Check, CHECKS_URL, UnassignedCheck, UNASSIGNED_CHECKS_URL } from './treasury-api';


@Injectable({
    providedIn: 'root'
})
export class CheckService extends BaseEntityExtendedService<Check> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CHECKS_URL);
    }

    getUnassigned(date?: string): Observable<UnassignedCheck[]> {
        const params = date ? new HttpParams().set('date', date) : undefined;
        return this.httpSrv.get<UnassignedCheck[]>(UNASSIGNED_CHECKS_URL, params);
    }

    getBankChecks(bankId: number): Observable<BankCheck[]> {
        return this.httpSrv.get<BankCheck[]>(`/banks/${bankId}/checks`);
    }

    assignChecks(bankId: number, checkIds: number[]): Observable<number[]> {
        return this.setBankId(checkIds, bankId);
    }

    unassignChecks(checkIds: number[]): Observable<number[]> {
        return this.setBankId(checkIds, null);
    }

    private setBankId(checkIds: number[], bankId: number | null): Observable<number[]> {
        return from(checkIds).pipe(
            concatMap(id => this.get(id).pipe(
                switchMap(check => this.update({ ...check, bankId }))
            )),
            toArray()
        );
    }
}
