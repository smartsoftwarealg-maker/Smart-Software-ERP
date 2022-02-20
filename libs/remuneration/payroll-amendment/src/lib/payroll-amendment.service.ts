import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Amendment, AMENDMENT_URL, Comparison} from './payroll-amendment.class';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayrollAmendmentService extends BaseEntityService<Amendment> {
    constructor(override httpSrv: HttpService) {
        super(httpSrv, AMENDMENT_URL);
    }

    insertAll(data: Amendment[]): Observable<{ count: number }> {
        return this.httpSrv.put(AMENDMENT_URL+'/insert-many', data);
    }

    deleteAll(): Observable<{ count: number }> {
        return this.httpSrv.remove(AMENDMENT_URL+'/delete-all');
    }

    comprison(id: number): Observable<Comparison[]> {
        return  this.httpSrv.get<Comparison[]>(`/payroll/amendments/comparison?id=${id}`);
    }

    generate(): Observable<{count: number}> {
        return  this.httpSrv.put('/payroll/amendments/generate');
    }
}
