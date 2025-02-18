import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { HttpService, PaginationModel } from '@ss/common/api-common';
import { DEBTS_URL, Debt } from './compensation-api';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DebtService extends BaseEntityService<Debt> {
    #_selectionMode:1|2|3 = 2;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DEBTS_URL);
    }

    set selectionMode(mode:1|2|3) {
        this.#_selectionMode = mode;
    }

    override getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{
        itemCount: number;
        body: Debt[]
    }> {
        const params = (extraPrams||new HttpParams()).set('mode', this.#_selectionMode);
        return super.getList(page, pageSize, filter, sortBy, params);
    }

}
