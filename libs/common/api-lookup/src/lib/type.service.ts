import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import {Mark, TYPES_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TypeService extends BaseEntityService<Mark> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, TYPES_URL);
    }

    getByIdList(list: string): Observable<Mark[]> {
        return this.httpSrv.get<Mark[]>(`/lookups/types?ids=${list}`);
    }
}
