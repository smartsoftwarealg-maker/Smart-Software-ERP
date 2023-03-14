import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Mark, MARKS_URL } from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Observable} from 'rxjs';
import {Lookup} from './lookup.class';

@Injectable({
    providedIn: 'root'
})
export class MarkService extends BaseEntityService<Lookup> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, MARKS_URL);
    }

    getByIdList(list: string): Observable<Lookup[]> {
        return this.httpSrv.get<Lookup[]>(`/lookups/marks?ids=${list}`);
    }
}
