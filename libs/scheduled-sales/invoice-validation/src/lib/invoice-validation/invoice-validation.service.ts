import { BaseEntityService } from '@ss/common/api-base-entity';
import { ValidatedSale } from '@ss/scheduled-sales/api-scheduled-sales';
import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { dateToYmdStr } from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class InvoiceValidationService extends BaseEntityService<ValidatedSale> {
    #_date = new Date();

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/ssales/validation');
    }

    validate(id: number): Observable<{ count: number }> {
        return this.httpSrv.post(`/ssales/validation/${id}`)
    }

    set date(d: Date) {
        this.#_date = d;
    }

    get date () {
        return this.#_date;
    }

    override getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{
        itemCount: number;
        body: ValidatedSale[]
    }> {
        const params = (extraPrams || new HttpParams()).set('date', dateToYmdStr(this.#_date));
        return super.getList(page, pageSize, filter, sortBy, params);
    }
}
