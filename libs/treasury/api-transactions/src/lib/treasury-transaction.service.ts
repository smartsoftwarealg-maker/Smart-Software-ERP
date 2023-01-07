import { Injectable } from '@angular/core';
import { BaseEntityExtendedService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import {TTransaction, TTransactionLine, TRANSACTIONS_URL, PERIOD_URL} from './models';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Journal} from '@ss/treasury/api-journal';

@Injectable({
    providedIn: 'root'
})
export class TreasuryTransactionService extends BaseEntityExtendedService<TTransaction> {
    private _period  = 0;
    private _journal: Journal = null;
    private _date: Date = new Date();

    public readonly BANK = 1;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, TRANSACTIONS_URL);
        this.period = new Date();
    }

    set period(date: Date) {
        const d = this._date = date || new Date();
        this._period = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    }

    set journal(j: Journal) {
        this._journal = j;
    }

    get journalId() {
        return this._journal?.id;
    }

    get journalDescription() {
        return this._journal?.description || '';
    }
    get date() {
        return this._date;
    }

    override getList(page: number,
                     pageSize: number,
                     filter?: string,
                     sortBy?: string,
                     extraPrams?: HttpParams): Observable<{ itemCount: number; body: TTransaction[] }> {
        extraPrams = new HttpParams()
            .set('journal', this._journal?.id || 0)
            .set('period', this._period);
        return super.getList(page, pageSize, filter, sortBy, extraPrams);
    }

    isBank() {
        return this._journal?.jType === this.BANK;
    }
}

@Injectable({
    providedIn: 'root'
})
export class TransactionLineService extends BaseEntityExtendedService<TTransactionLine> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, TRANSACTIONS_URL);
    }
}

