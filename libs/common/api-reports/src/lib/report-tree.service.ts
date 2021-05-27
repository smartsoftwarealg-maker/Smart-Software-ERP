import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {REPORTS_TREE_URL} from './report-api';
import {HttpParams} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ReportTreeService {

    constructor(protected httpSrv: HttpService) {
    }

    getReportsTree(app: string): Observable<string[]> {
        return this.httpSrv.get(REPORTS_TREE_URL, new HttpParams().set('base', app));
    }
}
