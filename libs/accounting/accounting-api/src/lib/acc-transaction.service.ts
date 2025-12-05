import { Injectable, signal } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    ACC_JOURNALS_URL, ACC_PROJECTS_URL,
    ACC_TRANSACTION_URL,
    ACCTransaction, JournalSummary
} from './accounting-api';
import { HttpService, PaginationModel } from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Lookup} from '@ss/common/api-lookup';

@Injectable({
    providedIn: 'root',
})
export class AccTransactionService extends BaseEntityService<ACCTransaction> {
    selectedTransaction = signal<ACCTransaction | null>(null);

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACC_TRANSACTION_URL, ACC_JOURNALS_URL);
    }

    findByJournal(
        journalId: number,
        page: number,
        pageSize: number,
        filter?: string,
    ): Observable<{ body: ACCTransaction[]; itemCount: number }> {
        const params = new HttpParams().set('journal', journalId);
        return this.getList(page - 1, pageSize, filter, null, params);
    }

    getProjects(): Observable<Lookup[]> {
        return this.httpSrv.get<Lookup[]>(ACC_PROJECTS_URL + '?page=0-50');
    }

    journalSummary(): Observable<JournalSummary> {
        return this.httpSrv.get<JournalSummary>(
            '/accounting/journal-summary?id=' + (this.getParentId() || 0),
        );
    }

    select(transaction: ACCTransaction) {
        this.selectedTransaction.set(transaction);
    }

    pack(journalId: number): Observable<{ count: number }> {
        return this.httpSrv.post('/accounting/pack/' + journalId, null);
    }

    override getPage(
        pageModel: PaginationModel,
        filter?: string,
        sortBy?: string,
        extraPrams?: HttpParams,
    ): Observable<ACCTransaction[]> {
        console.log('*******************************************************get page: ', filter);
        return super.getPage(pageModel, filter, sortBy, extraPrams);
    }
}
