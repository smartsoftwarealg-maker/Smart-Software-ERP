import { Injectable } from '@angular/core';
import { CACCReport } from '@ss/costing/costing-utils';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CostingAccountingService {
    constructor(private httpSrv: HttpService) {}

    getReport(projectId: number, qty: number): Observable<CACCReport> {
        const params = new HttpParams()
            .set('project', projectId)
            .set('qty', qty);
        return this.httpSrv.get<CACCReport>('/costing/acctransactions', params);
    }
}
