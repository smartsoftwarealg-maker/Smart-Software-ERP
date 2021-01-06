import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Observable} from "rxjs";
import {REPORTS_LIST_URL} from "./report-api";
import {HttpParams} from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class ReportListService {

    constructor(protected httpSrv: HttpService) {
    }

    getListByApp(app: string): Observable<string[]> {
        return this.httpSrv.get(REPORTS_LIST_URL, new HttpParams().set('base', app));
    }
}
