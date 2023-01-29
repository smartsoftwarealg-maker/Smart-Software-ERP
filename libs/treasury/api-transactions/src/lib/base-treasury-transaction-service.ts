import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {Summary, TTransaction} from '@ss/treasury/api-transactions';
import {BANK_JOURNAL, Journal} from '@ss/treasury/api-journal';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

export class BaseTreasuryTransactionService extends BaseEntityExtendedService<TTransaction> {
    private _period  = 0;
    private _journal: Journal = null;
    private _bankExpenses = false;
    private _date: Date = new Date();

    constructor(protected override httpSrv: HttpService, protected url_: string) {
        super(httpSrv, url_);
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

    set bankExpenses(be: boolean) {
        this._bankExpenses = be;
    }

    summary(): Observable<Summary[]> {
        const id = this._journal?.id || 0;
        const extraPrams = new HttpParams()
            .set('bankExpenses', this._bankExpenses);
        return this.httpSrv.get<Summary[]>(`/treasury/transactions/journals/${id}/summary`, extraPrams);
    }

    override getList(page: number,
                     pageSize: number,
                     filter?: string,
                     sortBy?: string,
                     extraPrams?: HttpParams): Observable<{ itemCount: number; body: TTransaction[] }> {
        extraPrams = new HttpParams()
            .set('journal', this._journal?.id || 0)
            .set('bankExpenses', this._bankExpenses)
            .set('period', this._period);
        return super.getList(page, pageSize, filter, sortBy, extraPrams);
    }

    isBank() {
        return this._journal?.jType === BANK_JOURNAL;
    }
}
