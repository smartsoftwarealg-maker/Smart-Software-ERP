import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { Lookup } from '@ss/common/api-lookup';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ReportParamLookupService extends BaseEntityService<Lookup> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/reports/lookup');
    }

    getById(iid: number, tableName: string): Observable<Lookup> {
        const id = +iid || 0;
        return this.httpSrv.get<Lookup>('/reports/lookup', new HttpParams().set('table', tableName).set('id', id));
    }

    public getValues(filter: string, tableName: string): Observable<{ itemCount: number, body: Lookup[] }> {
        return this.httpSrv.getData<Lookup>(
            '/reports/lookup',
            0,
            50,
            filter,
            null,
            new HttpParams().set('table', tableName).set('filter', filter));
    }
}
