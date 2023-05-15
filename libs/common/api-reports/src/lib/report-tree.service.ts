import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Observable, tap} from 'rxjs';
import {REPORTS_TREE_URL} from './report-api';
import {HttpParams} from '@angular/common/http';
import {ReportNode} from './report-params-api';


@Injectable({
    providedIn: 'root'
})
export class ReportTreeService {

    constructor(protected httpSrv: HttpService) {
    }

    getReportsTree(app: string, filter?: string): Observable<ReportNode> {
        return this.httpSrv
            .get<ReportNode>(REPORTS_TREE_URL, new HttpParams().set('base', app).set('filter', filter || ''))
            .pipe(tap(res => res.list = res.list.filter(e => e.name != 'forms')));
    }

}
