import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Match, MBalanace } from './matching.api';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TransactionMatchingService extends BaseEntityService<MBalanace> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/accounting/matching');
    }

    debits(pae: number, size: number, filter?: string, sort?: string): Observable<{itemCount: number, body: MBalanace[]}> {
        return this.httpSrv.getData(`/accounting/matching/debits`, pae, size, filter, sort);
    }

    debtorMatches(pae: number, size: number, filter?: string, sort?: string): Observable<{itemCount: number, body: MBalanace[]}> {
        return this.httpSrv.getData(`/accounting/matching/debit-matches`, pae, size, filter, sort);
    }

    creditorMatches(pae: number, size: number, customer?: string, filter?: string, sort?: string): Observable<{itemCount: number, body: MBalanace[]}> {
        const params = customer? new HttpParams().set('customer', customer) : null;
        return this.httpSrv.getData(`/accounting/matching/credit-matches`, pae, size, filter, sort, params);
    }

    credits(pae: number, size: number, customer?: string, filter?: string, sort?: string): Observable<{itemCount: number, body: MBalanace[]}> {
        const params = customer? new HttpParams().set('customer', customer) : null;
        return this.httpSrv.getData(`/accounting/matching/credits`, pae, size, filter, sort, params);
    }

    join(match: Match): Observable<{ count: number}> {
        return this.httpSrv.post(`/accounting/matching/join`, match);
    }
    free(match: Match): Observable<{ count: number}> {
        return this.httpSrv.post(`/accounting/matching/free`, match);
    }
}
