import { Injectable } from '@angular/core';
import { dateToYmdStr, HttpService, PaginationModel } from '@ss/common/api-common';
import { SalesRecord } from '@ss/scheduled-sales/api-scheduled-sales';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class SalesHistoryService extends BaseEntityService<SalesRecord>{
    private _TODAY = new Date();
    private _from = new Date();
    private _to = new Date();
    private _searchStr: string|null = null;

    constructor(protected httpSv: HttpService) {
        super(httpSv, '/sales-history', '/ssales/agents' )
    }

    set from(d: Date) {
        this._from = d;
    }

    set to(d: Date) {
        this._to = d;
    }

    set searchStr(s: string) {
        this._searchStr = s? s : null;
    }

    override getPage(pageModel: PaginationModel, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<SalesRecord[]> {
        const params = (extraPrams || new HttpParams())
            .set('from', dateToYmdStr(this._from||this._TODAY))
            .set('to', dateToYmdStr(this._to||this._TODAY));
        return super.getPage(pageModel, this._searchStr, sortBy, params);
    }
}
