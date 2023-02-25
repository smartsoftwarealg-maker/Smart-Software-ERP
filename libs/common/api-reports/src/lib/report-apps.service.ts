import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {REPORTS_APPS_URL} from './report-api';


@Injectable({
    providedIn: 'root'
})
export class ReportAppsService {

    constructor(protected httpSrv: HttpService) {}

    getApps(): Observable<string[]> {
        return this.httpSrv.get(REPORTS_APPS_URL);
    }
}
