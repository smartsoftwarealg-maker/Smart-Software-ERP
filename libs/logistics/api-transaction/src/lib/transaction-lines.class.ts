import {HttpService} from '@ss/common/api-common';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {Observable} from 'rxjs';
import {TransactionLine} from './transaction-line';
import {Transaction} from './transaction';
import {HttpParams} from '@angular/common/http';

export class TransactionLinesClass extends BaseEntityExtendedService<TransactionLine> {
    private _editable = true;

    constructor(protected override httpSrv: HttpService, baseUrl: string, parentUrl: string) {
        super(httpSrv,  baseUrl, parentUrl);
    }

    getTransaction(id: number): Observable<Transaction> {
        return this.httpSrv.get(`/inventory/${id}`);
    }

    override getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{ itemCount: number; body: TransactionLine[] }> {
        return super.getList(page, pageSize, filter, sortBy, extraPrams);
    }

    get editable() {
        return this._editable;
    }

    set editable(v: boolean) {
        this._editable = v;
    }
}
