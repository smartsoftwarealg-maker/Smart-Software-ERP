import { Injectable } from '@angular/core';
import { CReport } from '@ss/costing/costing-utils';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CostingReportService {
    private _parentId = 0;
    constructor(private httpSrv: HttpService) {}

    getReport(): Observable<CReport> {
        const params = new HttpParams().set('project', this._parentId);
        return this.httpSrv.get<CReport>('/costing/report', params);
    }

    set parentId(id: number) {
        this._parentId = id;
    }
}
