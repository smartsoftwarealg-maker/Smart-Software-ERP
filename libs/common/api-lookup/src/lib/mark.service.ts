import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Mark, MARKS_URL } from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MarkService extends BaseEntityService<Mark> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, MARKS_URL);
    }

    getByIdList(list: string): Observable<Mark[]> {
        return this.httpSrv.get<Mark[]>(`/lookups/marks?ids=${list}`);
    }
}
