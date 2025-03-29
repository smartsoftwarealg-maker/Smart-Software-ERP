import { BaseEntityService } from '@ss/common/api-base-entity';
import { CLONE, Insert, Invoice, LIST } from './services-api';
import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DuplicationService extends BaseEntityService<Invoice> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LIST);
    }

    clone(insert: Insert): Observable<{ count: number}> {
        return insert.numbers.length <1?
            of({ count: 0 }) :
            this.httpSrv.post(CLONE, insert);
    }
}
