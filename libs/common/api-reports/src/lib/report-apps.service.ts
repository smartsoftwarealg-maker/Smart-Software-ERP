import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {REPORTS_APPS_URL} from './report-api';


@Injectable({
    providedIn: 'root'
})
export class ReportAppsService {
    private _base: string = null;
    constructor(protected httpSrv: HttpService) {}

    getApps(): Observable<string[]> {
        return this.httpSrv.get(REPORTS_APPS_URL);
    }
    get base() {
        return this._base;
    }

    set base(b: string) {
        this._base = b;
    }
}
